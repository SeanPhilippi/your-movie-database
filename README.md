# YMDB - Your Movie Database

**YMDB** is a cinephile hobbyist site for people that love making lists, film discussion, and film exploration.

This site aims to be a minimalist competitor to sites like Mubi and Letterboxd with a higher focus on community, list-making, and film discussion. The purpose is to allow people to state their movie preferences through their Top Movie List while giving them a view of other members of the YMDb community with similar taste in movies. The site incentivizes list-making and film discussion by utilizing well-thought out limitations that make users more deliberate in how they chose films for their one and only Top Movie List. Users also have a personal statement section where they can say whatever they like. There will be a YMDb Top Movies List that aggragates film rankings from all user lists to make an overall YMDb community ranking. The average ranking, along with reviews, discussion, and rank position on individual user lists will also be viewable on each movie's page.

## Build Tools

YMDb is a full stack website built with React and Redux on the front-end, MongoDB and Express for the back-end.  Authentication is done using Bcrypt, JSON web tokens, and Passport.js.  All passwords are hashed before being saved to the database, and user sessions last 3 hours.

## Project Links

Heroku deployment: https://yourmoviedatabase.herokuapp.com

Github repo: https://github.com/SeanPhilippi/your-movie-database

Project/Issue tracker: https://github.com/SeanPhilippi/your-movie-database/issues

## Project Start Commands

Front-end: ```npm start```

Server: ```npm run server```

Concurrently: ```npm run both```

## Current State

Authentication is fully functional with login and register errors.  Users can add, remove, and reorder movies, as well as write a list statement and everything persists for the user session and can be saved which posts it to a database. User data is cleared upon log out.  Movie pages, user affinity stats, and the Top Movie List aggregating rankings from all lists is currently in the works.  Comments will come after.

## Future Goals

* Have more movie data visible like director in the search results
* Make a button that allows switching between a more polished/published list view and an edit view
* Make site mobile-friendly and fully responsive
* Have movie pages fetch poster image, imdb link, reviews, other data, and have add movie to list button.
* implement comment section for user lists and movie pages.
* implement user visits and movie ranking data for display on home page preview windows.
* Add pictures of website to this repo README.md.

<!-- ## Heroku DB Commands

Heroku db migration: ```heroku run knex migrate:latest```

Heroku db seed: ```heroku run knex seed:run``` -->

<!-- ## Website Screenshots

Home Page

<img src="/public/" alt="alt text" width="75%" height="75%">

Profile Page

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%">

Movie Page

<img src="/public/" alt="alt text" width="75%" height="75%">

Log in/Register Pages

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%"> -->
