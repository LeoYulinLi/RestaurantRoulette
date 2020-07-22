# RestaurantRoulette

A web application is here solving for "what should we eat for today?", is allowing login user to choose of different prefence criteria, returning a list of potenital local food restaurnts that best matches user input and current location, and saving user's accepted restaurant history to the profile.    

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
* User can sign up an account and login, and the Demo login is allowing user to browse through the site and visited some preset restaurants history wihout creating an account. 
* Using passport and JWT for authentication and validator for input validation.

### Randomized Selection 
User has option to accept or reroll the restaurant based on user's input preference, using Yelp API to search for nearby restaurants. Restaurnt Roulette will randomly 

<img style="max-width: 100%;" height="500" src="https://restaurant-roulette-seeds.s3-us-west-1.amazonaws.com/accept-reroll.png">
