# Apartment Finder

## About 

This is a NYC based apartment and roommate seeking app. The purpose of this app is to connect renters and rentees. This app will allow people to post their apartments online with hopes of finding a roommate or someone to take over there apartment via rent or sublease. Apartment seekers will be able to view all apartment listings, search for apartments by location, and use tags (keywords) to find apartment listings

## How To Use App
**Sign Up**
* Add first name
* Add last name
* Add age
* Add email
* Create password
* Hit Submit

**Logged into profile**
**Home Page**
* The Home page consist of a search bar that finds listings by location
    * Please use neighborhood, borough to search
        *Example: Williamsburg, Brooklyn or Chelsea, Manhattan*
**All Listings Page**
* The All Listings page renders all active listings by all users.
    * Click any listing to view all the details related to that particular listing
        *Note: you will be take to the view page for that listing. The creator of this listing will be able to delete from this view*
**Create Listing Page**
* The Create Listing page will allow you to create an apartment listing using the specified fields below
    * Title
        * Add a title for the apartment listing
            *The title will be what is seen in the All Listings page*
    





    

## Tech Stack

Postgres, JS, EJS, CSS, RESTful API, npm install --save multer, npm install Cloudinary, npm i method override

## Wireframe

Please reference Mind Map-Roommate pdf

## Live Link

## MVP Goals

* MVP Goals
    * Put canvas on screen
    * Put spaceship (Player) on canvas
    * Get the spaceship (Player) to move around
    * Put asteroid on canvas
    * Get the asteroid to move from one direction of the screen to the other side
    * Put UFO's on the canvas
    * Get the UFO's to move from one direction of the screen to the other side
    * Bad guys (UFO's) make me lose a life/lose game
    * Crashing into asteroids to add to the score       

* Functional game breakdown
    * Start, Restart, and Instructions buttons functionally working
    * Instructions button takes you to a page that explains the object of the game, how to play the game, and how to win
    * Game is logging score
    * Background image remains the same
    * Lives render on screen 
        * They decrease by one every time you die 
        * If you die with no lives left the game ends
    * Objects 
        * Asteroids and UFO’s are moving across the screen in a straight line
        * Player movement is with arrow keys/w,a,s,d and space bar is used to shoot
    * You win by lasting the entire time of the game. You accumalete points during the game
    * When you lose
        * Game Over flashes on the screen
        * You must hit restart to continue
