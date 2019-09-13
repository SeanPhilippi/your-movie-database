# YMDB - Your Movie Database

**YMDB** is a cinephile hobbyist site for people that love making lists, film discussion, and film exploration.

This site aims to be a minimalist competitor to sites like Mubi and Letterboxd with a higher focus on community, list-making/viewing, and film discussion. The purpose is to allow people to state their movie preferences through their Top Movie List while giving them a view of other members of the YMDb community with similar taste in movies. The site incentivizes list-making and film discussion by utilizing well-thought out limitations that make users more deliberate in how they chose films for their one and only Top Movie List. Users also have a personal statement section where they can say whatever they like. There will be a YMDb Top Movies List that aggragates film rankings from all user lists to make an overall YMDb community ranking. The average ranking, along with reviews, discussion, and rank position on individual user lists will also be viewable on each movie's page. Most similar lists will also be displayed so users can easily find people with highly compatible taste. 

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

* Authentication is fully functional with login and register errors.  Users can login using either their email or username.  * Users can add, remove, and reorder movies, as well as write a profile statement and everything persists for the user session and can be saved which posts it to a database. 
* Saving transitions to a presentation view smoothly, and clicking the edit button transitions back to an edit view. 
* User data is cleared upon log out and log out happens automatically after a certain amount of time due to an expiring session.  
* Member lists can be visited, pages populate with their saved data.
* Newly registered users populate a dedicated component, that also has its own page.
* Comments are currently in the works. Comments are posting and successfully being fetched for the correct profiles, but there are some bugs still being worked out.  
* Site is mostly responsive, some minor bugs to work out. 

## Future Goals (truncated)
* User affinity stats: Users will be able to see the top 5 best list matches towards the bottom of their profile.
* Top Movie List aggregating rankings from all member lists.
* Commenting system expanded to Movie Pages and the Top Movies Page.
* Users Index page with a search bar. This is partially done.
* Flesh out movie pages: There will be an ability to add a movie to your list from the movie's page, as well as on the most recent lists the movie was added to and what rank it has in that list. Points and position in the Top Movies List will also be displayed. 
* IMDB links on Movie Pages. 
* Implement user visits and movie ranking data for display on home page preview windows.
* Add pictures of website to this repo README.md.

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
