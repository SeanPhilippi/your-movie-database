# YMDB - Your Movie Database

**YMDB** is a cinephile hobbyist site for people that love making lists, film discussion, and film exploration.

This site aims to be a minimalist competitor to sites like Mubi and Letterboxd with a higher focus on community, list-making/viewing, and film discussion. The purpose is to allow people to state their movie preferences through their Top Movie List while giving them a view of other members of the YMDb community with similar taste in movies. The site incentivizes list-making and film discussion by utilizing well-thought out limitations that make users more deliberate in how they chose films for their one and only Top Movie List. Users also have a personal statement section where they can say whatever they like. The Top Movies List aggragates film rankings from all user lists to make an overall YMDb community ranking. The average ranking, along with reviews, discussion, and rank position on individual user lists are also viewable on each movie's page. Most similar lists are displayed at the bottom of profiles so users can easily find people with highly compatible taste.

## Build Tools

YMDb is a full stack website built with React and Redux on the front-end, MongoDb and Express for the back-end.  Authentication is done using Bcrypt, JSON web tokens, and Passport.js.  All passwords are hashed before being saved to the database, and user sessions last 3 hours.

## Project Links

Heroku deployment: https://yourmoviedatabase.herokuapp.com

Github repo: https://github.com/SeanPhilippi/your-movie-database

Project/Issue tracker: https://github.com/SeanPhilippi/your-movie-database/issues

## Project Start Commands

Front-end: ```npm start```

Server: ```npm run server```

Concurrently: ```npm run both```

## Current State

* Authentication is fully functional with login and register errors.  Users can login using either their email or username.
* Users can add, remove, and reorder movies, as well as write a user statement and everything persists for the user session and can be saved which posts it to a database.
* Saving transitions to a presentation view smoothly, and clicking the edit button transitions back to an edit view.
* User data is cleared upon log out and log out happens automatically after a certain amount of time due to an expiring session token.
* Member lists can be visited, pages populate with their saved data.
* Newly registered users populate a dedicated component, that also has its own page.
* Comment system is working smoothly on user profiles, top movies list, and movie pages.  Comments render smoothly, post to database, author of comment is a link that navigates to their profile, and correct comments are fetched depending on the page.
* Site is mostly responsive, some minor bugs to work out.
* Affinities stats now populate, showing the top 5 most similar user lists.
* MoviePages have stats for overall ranking, average ranking, # of voters, and number of points.
* Voters and their rank for the movie can be viewed on the movie's page.
* Top Movies List aggregating rankings from all member lists.

## Future Goals
* Users Index page with a search bar. This is partially done.
* Track user list visits and display on home page.
* Ability to post reviews to movie pages.
* Easy inclusion of emojis in comments.
* Add pictures of website to this repo README.md.
* Password reset.

<!--
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

<img src="/public/" alt="alt text" width="75%" height="75%">
-->
