const axios = require('axios');
const yelp = require('./config/keys').yelp;
const config = {
  headers: { Authorization: `Bearer ${yelp}` }
};

const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require("./routes/api/users");

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

app.post("/api/fetchYelpRestaurant", (req, res) => {
  const { categories, latitude, longitude } = req.body;
  axios.get( 
    `https://api.yelp.com/v3/businesses/search?categories=${categories}&latitude=${latitude}&longitude=${longitude}`,
    // {params: categories, latitude, longitude },
    config
  ).then(result => {
    res.json(result.data);
  }).catch(err=> res.json(err));
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));