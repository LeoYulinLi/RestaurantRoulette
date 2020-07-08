const axios = require('axios');
const path = require('path');
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
const categories = require("./routes/api/categories");

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


app.post("/api/fetchYelpRestaurant", async (req, res) => {
  const { categories, latitude, longitude } = req.body;
  const initialOffset = Math.floor(Math.random() * 1000);
  const result1 = await axios.get( 
    `https://api.yelp.com/v3/businesses/search?categories=${categories}&latitude=${latitude}&longitude=${longitude}&open_now=true&offset=${initialOffset}&limit=1`,
    // {params: categories, latitude, longitude },
    config
  )

  if (result1.data.businesses.length === 0) {
    const total = result1.data.total;
    const offset = Math.floor(Math.random() * total);
    const result2 = await axios.get( 
      `https://api.yelp.com/v3/businesses/search?categories=${categories}&latitude=${latitude}&longitude=${longitude}&open_now=true&offset=${offset}&limit=1`,
      // {params: categories, latitude, longitude },
      config
    )
    res.json(result2.data);
  } else {
    res.json(result1.data);
  }

});


// app.post("/api/fetchYelpAutoCompletion", async (req, res) => {
//   const { text } = req.body;
//   const thing = await axios.get(
//     `https://api.yelp.com/v3/autocomplete?text=${text}`,
//     config
//   );
//   res.json(thing.data.categories);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
