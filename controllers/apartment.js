let express = require('express')
const router = express.Router()
const fs = require('fs')
let db = require('../models')
const axios = require('axios')
const apartment = require('../models/apartment')
const sequelize = require('sequelize')
const Op = sequelize.Op
const methodOverride = require('method-override');
let cloudinary = require('cloudinary').v2

// this is our results route aka controller
// router.get('/apartment/new', function (req, res) {
//     cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
// })



// GET ALL APARTMENTS
router.get('/', (req, res) => {
  db.apartment.findAll()
    .then((apartments) => {
      res.render('apartments/index', { apartments })
    })
    .catch(err => console.log(err))
  // res.status(200).send('route successful')
})


//POST AN APARTMENT
router.post('/new', (req, res) => {
  db.apartment.create({
    title: req.body.title,
    rent: req.body.rent,
    description: req.body.description,
    location: req.body.location,
    bedrooms: req.body.bedroom,
    bathrooms: req.body.bathroom,
    amenities: req.body.amenity,
    roommates: req.body.roommate,
    userId: req.body.userId
  })
    .then((apartment) => {
      res.redirect('/apartment')
    })
    .catch((error) => {
      // res.status(200).send('Post an apartment')
    })
})

// UPDATE AN APARTMENT LISTING
router.put('/edit/:id', isLoggedIn, (req, res) => {
  db.apartment.findOne({
    where: { id: req.params.id },
  })
    .then((apartment) => {
      apartment.update({
        title: req.body.title,
        rent: req.body.rent,
        description: req.body.description,
        amenities: req.body.amenity,
        roommates: req.body.roommate,
        userId: res.locals.currentUser.id
      })
    })
  res.redirect('/apartment')
})

// DELETE AN APARTMENT LISTING
router.delete('/:id', (req, res) => {
  db.apartment.findOne({
    where: { id: req.params.id },
  })
    .then((apartment) => {
      apartment.destroy({
        title: req.body.title,
        rent: req.body.rent,
        description: req.body.description,
        amenities: req.body.amenity,
        roommates: req.body.roommate,
        userId: res.locals.currentUser.id
      })
    })
  res.redirect('/apartment')
})

// GET: /apartments/new - display form for creating a new apartment listing
router.get('/new', (req, res) => {
  db.apartment.findAll()
    .then((apartment) => {
      res.render('apartments/new', { apartment: apartment })
    })
    .catch((error) => {
      res.status(200).send('new apartments')
    })
})

// GET AN APARTMENT USING ID - display a specific apartment and their tags
router.get('/:id', (req, res) => {
  db.apartment.findOne({
    include: [db.tag],
    where: { id: req.params.id }
  }).then((apartment) => {
    res.render('apartments/show', { apartment: apartment })
  }).catch((error) => {
    console.log(error)
    res.send('display apartments')
  })
})

// SEARCH FOR AN APARTMENT USING LOCATION
router.get('/search', (req, res) => {
  //   let {term} = req.query
  //Make lowerCase
  //   term = term.toLowerCase()
  console.log(req.query)
  db.apartment.findAll({ where: { location: req.query.location } })
    .then(apartment => res.render('apartments', { apartment }))
    .catch(error => console.log(error))
})

// FAVORITE APARTMENTS
// router.get('/:id', (req, res) => {
//   console.log('this is the fave id\n', req.params.id)
//   db.apartment.findOne({
//       where: { id: req.params.id }
//   })
//       .then(foundFave => {
//           res.render('faveDetail', { title: foundFave.title, imdbId: foundFave.imdbId, date: foundFave.createdAt })
//       })
//       .catch(error => {
//           console.error
//       })
// })
module.exports = router