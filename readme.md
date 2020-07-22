# RestaurantRoulette

A web application is here solving for "what should we eat for today?" base on login user's current location and different preference criteria, returning a list of potenital local food restaurnts that best matches user input, and saving user's accepted restaurant to the profile.    

[Wiki](https://github.com/LeoYulinLi/RestaurantRoulette/wiki) | [Live Demo](https://rrc-app.herokuapp.com/) 

## Technologies
* MongoDB
* Mongoose 
* Express.js
* React
* Node.js 
* SCSS 
* Yelp API 
* Google Map API
* Heroku deployment 

## Features 
* User Authentication 
* Yelp API integration 
* Randomized Selection 
* Restaurant History 
* Google Map API

### User Authentication 
* User can sign up an account and login, and the Demo login is allowing user to browse through the site and visited the list of past visited restaurants history wihout creating an account. 
* Using passport and JWT for authentication and validator for input validation.

### Randomized Selection 
User has option to accept or reroll the restaurant based on user's input preference, using Yelp API to search for nearby restaurants. Restaurnt Roulette will randomly 

<img style="max-width: 100%;" height="460" src="https://restaurant-roulette-seeds.s3-us-west-1.amazonaws.com/accept-reroll.png">

### Restaurant History

<img style="max-width: 100%;" height="460" src="https://restaurant-roulette-seeds.s3-us-west-1.amazonaws.com/history.png">

## Coming Soon 
* Group feature 
* Live chat
