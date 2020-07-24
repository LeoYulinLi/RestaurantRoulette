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

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: require('./config/keys').secretOrKey
  }))
  .on('authenticate', (data) => {
    console.log(data);
  })
  .on('authenticated', (socket) => {
    // console.log(socket.decoded_token);
    console.log("HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const fetch = fetchRandomRestaurant(socket);

    socket.on('fetchRestaurant', fetch);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
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
