const axios = require('axios');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const socketioJwt = require('socketio-jwt');
const fetchRandomRestaurant = require("./routes/api/yelp");
const User = require('./models/User');

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: require('./config/keys').secretOrKey
  }))
  .on('authenticated', async (socket) => {
    const fetch = fetchRandomRestaurant(socket, io);
    const user = User.findById(socket.decoded_token.id);

    socket.on('fetchRestaurant', fetch);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
    socket.on('join', (roomId) => {
      if (roomId) {
        Object.keys(socket.rooms).forEach(r => socket.leave(r));
        socket.join(roomId);
      }
      user.then(user => {
        socket.emit("joined", {
          roomId: Object.keys(socket.rooms)[0],
          username: user.username
        });
        console.log(`${user.username} joined ${Object.keys(socket.rooms)[0]}`);
      });
    });
    socket.on('message', async (message) => {
      const { username } = await user;
      io.to(Object.keys(socket.rooms)[0]).emit('chat', { message, username })
    });
  });

const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require("./routes/api/users");
const categories = require("./routes/api/categories");
const history = require("./routes/api/history");
const yelp = require("./routes/api/yelp");
const acceptRestaurant = require("./routes/api/acceptRestaurant");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/history", history);
app.use("/api/fetchYelpRestaurant", yelp);

app.use("/api/acceptRestaurant", acceptRestaurant);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${ port }`));
