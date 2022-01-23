# Apartment Buddy

## About 

This is a NYC based apartment app. The purpose of this app is to connect users through the creation of an apartment listing. The users of this app consist of renters and rentees.  

Apartment Renters will be able to create an apartment listing, add an image to the apartment, and add tags to the apartment listing. Apartment seekers will be able to view all apartment listings, search for apartments by location, and use tags (keywords) to find any apartment listing with the associated tag. **Both apartment renter and seeker will need to create an account to access the full app.**

## Tech Stack

PostgreSQL, NodeJS, Express, JavaScript, EJS, Bootstrap, CSS, REST API, Cloudinary API to upload images to apartment listings, passport, passport-local, Sequalize, Sequalize-cli, and bcrypt. 

## Wireframe

Please reference Mind Map-Roommate pdf

## ERD Model

Please reference NYC ERD Roommates pdf

## Live Link

https://roommates85.herokuapp.com/

## How To Use The App
**Sign Up**
* Add first name
* Add last name
* Add age
* Add email
* Create password
* Hit Submit

### Logged in user
**Home Page**
* The Home page consist of a search bar that finds listings by location
    * Please use neighborhood, borough to search
        * *Example: Williamsburg, Brooklyn or Chelsea, Manhattan*

**All Listings Page**
* The All Listings page renders all active listings by all users.
    * The layout of the listings is title and rent only
        * *Example: 3 Bedroom with beautiful view of the city $3800/month*
    * Click any listing to view all the details related to that particular listing
        * *Note: you will be taken to the view page for that listing. The creator of this listing will be able to delete the listing from this view*

**Create Listing Page**
* The Create Listing page will allow you to create an apartment listing using the specified fields below
    * **Title**
        * Add a title for the apartment listing
            * *The title will be what is seen in the All Listings page*
    * **Rent**
        * Add numeric value only. Please do not add a currency sign
            * *Example: add only 5500. Do not use $.*
            * Rent will be posted in USD
    * **About Listing**
        * Add a brief description describing the best qualities about the listing and any other detail you feel is necessary
    * **Location**
        * Add a location to the listing
            * Please use the format of neighborhood, borough
            * *Example: Williamsburg, Brooklyn or Chelsea, Manhattan*
    * **Bedrooms**
        * Add number of bedrooms
            * *Example: 1 = 1 bedroom, 3 = 3 bedrooms, studio*
                * **Please only add number or studio in this field**
    * **Bathrooms**
        * Add number of bathrooms
            * *Example: 1 = 1 bathroom, 1.5 = 1.5 bathrooms, 2 = 2 bathrooms*
                * **Please only add number in this field**
    * **Amenities**
        * Add all amenities that you feel are necessary
            * *Example: washer-dryer in unit, doorman, roof deck, private backyard, pool, patio off bedroom*
            * **Please seperate amenities with a comma and space as seen above in the example**
    * **Number of Current Roommates**
        * Add number of roommates that currently live there
            * *Example: 0 = no roommtes, 1 = 1 roommate, 2 = 2 roommates, 3 = 3 roommates*
            * **Please only add a number to this field. Add 0 if renting/subleasing the entire apartment**

* Hit submit after all information is added. 
**Please note that all fields are required except for amenities**

* You will then be redirected to a page to add an image. 
    * Click choose file
        * Add the image you wish to associate with your apartment listing
    * Then hit submit
**Please note: You must add an image to create listing**

* After image is added you will have one more opportunity to update any information from the create a listing page. 
**Please do not edit the image field**

* After reviewing your listing hit submit. This will take you directely to a page to view the listing you just created with all the information and image rendered.

**View All Tags Page**
* This page will show every tag created by all users
    * You will be able to click on a tag and be taken to a page that has every listing associated to that tag
        * From that page you can click any listing and be taken to another page to view all details

**Add Tag Page**
* This page will render every listing created by the logged in user. Here you will be able to add a tag to any of the listings that you have created. To complete the tag creation hit the submit button.
    **Please note: tags should be one to three words only**
    * *Example: pet friendly or great for plants or spacious*
* You will then be taken to a page to see all your apartments created with the newly added tag.
    * *Note: you will not be able to see the image on this page*

**Logout**
* If you are done using the app click logout
                   
## MVP Goals

* RESTful code
* Used a 3rd party API called Cloudinary
* Made the appropiate assoctations between tables in my database
* Able to create user
* Able to create listing
* Able to create tag
* Has CRUD within the app
    * CREATE an apartment listing
    * POST apartment to be viewed
    * UPDATE apartment with image
    * UPDATE apartment creation fields
    * DELETE an apartment
    * UPDATE apartment with CREATED tag

## Stretch Goals

* Style with Bootstrap and CSS
* Create a profile view
    * The ability to update profile information
    * The ability to delete profile
* Add a comments section for apartment seekers to express interest in listing
* Add a favorites for apartment seekers

## Any Potential Roadblocks
* Finding an apartment and creating a tag to be added to that apartment via the association models
    * The cotroller/routes for this functionality
* Finding all apartments associated to a tag
    * The cotroller/routes for this functionality
