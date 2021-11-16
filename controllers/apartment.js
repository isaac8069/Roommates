let express = require('express')
const router = express.Router()
const fs = require('fs')
let db = require('../models')
const axios = require('axios')
const apartment = require('../models/apartment')
const sequelize = require('sequelize')
const Op = sequelize.Op
let cloudinary = require('cloudinary').v2

// this is our results route aka controller
// router.get('/apartment/new', function (req, res) {
//     cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
// })



// Get apartment - display all apartments
router.get('/', (req, res)=> {
    db.apartment.findAll()
    .then((apartments) => {
        res.render('apartments/index', { apartments })
    })
    .catch(err => console.log(err))
    // res.status(200).send('route successful')
})


//POST an apartment
router.post('/new', (req, res) => {
    console.log('where are my apartments')
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
        res.status(200).send('Post an apartment')
        })
})    

// GET: /apartments/new - display form for creating a new apartment listing
router.get('/new', (req, res) => {
    db.apartment.findAll()
    .then((apartment) => {
        res.render('apartments/new', {apartment: apartment})
    })
    .catch((error) => {
        res.status(200).send('new apartments')
    })
})

// GET /apartments/:id - display a specific apartment and their tags
router.get('/:id', (req, res) => {
    db.apartment.findOne({
      include: [db.tag],
      where: {id: req.params.id}
    }).then((apartment) => {
      res.render('apartments/show', { apartment: apartment })
    }).catch((error) => {
      console.log(error)
      res.send('display apartments')
    })
  })

  // Search for apartments
  router.get('/search', (req, res) => {
    //   let {term} = req.query
      //Make lowerCase
    //   term = term.toLowerCase()
    console.log(req.query)
    db.apartment.findAll({ where: { location: req.query.location}})
    .then(apartment => res.render('apartments', { apartment }))
    .catch(error => console.log(error))
  })

// Get apartment - display all favorited apartments
// router.get('/', (req, res)=> {
//     db.apartment.findAll()
//     .then((apartment) => {
//         res.render('apartment/faves', { apartment })
//     })
//     .catch(err => console.log(err))
//     res.status(200).send('favorite apartment')
// })
module.exports = router