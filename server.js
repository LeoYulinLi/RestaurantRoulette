const path = require('path');

const http = require("http");

const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require("./routes/api/users");
const categories = require("./routes/api/categories");
const history = require("./routes/api/history");
const { fetchRandomRestaurant } = require("./routes/api/yelp");
const acceptRestaurant = require("./routes/api/acceptRestaurant");
const { fetchRestaurant } = require("./utils/restaurant_api_util");

const Socket = require("./models/Socket");

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
// app.use("/api/fetchYelpRestaurant", yelp);

app.use("/api/acceptRestaurant", acceptRestaurant);

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on("connection", async function (socket) {

  const socketModel = new Socket({ socket_id: socket.id });
  await socketModel.save();

  const fetch = fetchRandomRestaurant(socket);

  socket.on("fetchRestaurant", fetch);
  socket.on("disconnect", () => {
    socketModel.delete();
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${ port }`));
