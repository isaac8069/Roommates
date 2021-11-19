let express = require('express')
const router = express.Router()
let db = require('../models')
const axios = require('axios')
const apartment = require('../models/apartment')
const sequelize = require('sequelize')
const Op = sequelize.Op
const methodOverride = require('method-override');
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


// GET ALL APARTMENTS - ALL LISTINGS
router.get('/', (req, res) => {
  db.apartment.findAll()
    .then((apartments) => {
      res.render('apartments/index', { apartments })
    })
    .catch(err => console.log(err))
  // res.status(200).send('route successful')
})

// GET FORM to CREATE APARTMENT LISTING
router.get('/new', (req, res) => {
  db.apartment.findAll()
    .then((apartment) => {
      res.render('apartments/new', { apartment: apartment })
    })
    .catch((error) => {
      res.status(200).send('new apartments')
    })
})

//POST AN APARTMENT TO ALL LISTINGS
router.post('/new', (req, res) => {
  db.apartment.create({
    title: req.body.title,
    rent: req.body.rent,
    description: req.body.description,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    amenities: req.body.amenities,
    roommates: req.body.roommates,
    userId: req.body.userId
  })
    .then((apartment) => {
      res.render('apartments/image', { apartment: apartment})
    })
    .catch((error) => {
      console.log(error)
    })
})


// GET THE NEWLY CREATED APARTMENT
router.get('/image', (req, res) => {
  db.apartment.findOne()
    .then((apartment) => {
      res.render('apartments/image', { apartment: apartment, title: title })
    })
    .catch((error) => {
      res.status(200).send('new apartment')
    })
})

// PUT - CLOUDINARY  UPLOAD
router.post('/image', upload.single('myFile'), function(req, res) {
  console.log(req.body)
  cloudinary.uploader.upload(req.file.path, function(result) {
    console.log('image page works')
    console.log(result)
    console.log(result.url)
    res.send(result);
  })
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

// SEARCH FOR AN APARTMENT USING LOCATION
router.get('/search', (req, res) => {
  console.log('result route')
  //   let {term} = req.query
  //Make lowerCase
  //   term = term.toLowerCase()
  console.log(req.query)
  db.apartment.findAll({
    where: { location: req.query.location }
  }).then((apartments) => {
    console.log('found one')
    res.render('apartments/result', { apartments: apartments })
  }).catch((error) => {
    console.log(error)
    res.send('RESULTS NOT RENDERING')
  })
})

// GET AN APARTMENT USING ID - display a specific apartment and their tags
router.get('/:id', (req, res) => {
  db.apartment.findOne({
    // include: [db.tag],
    where: { id: req.params.id }
  }).then((apartment) => {
    res.render('apartments/show', { apartment: apartment })
  }).catch((error) => {
    console.log(error)
    res.send('APARTMENT ID NOT FOUND')
  })
})

// UPDATE AN APARTMENT LISTING
// router.put('/edit/:id', isLoggedIn, (req, res) => {
//   db.apartment.findOne({
//     where: { id: req.params.id },
//   })
//     .then((apartment) => {
//       apartment.update({
//         title: req.body.title,
//         rent: req.body.rent,
//         description: req.body.description,
//         amenities: req.body.amenity,
//         roommates: req.body.roommate,
//         userId: res.locals.currentUser.id
//       })
//     })
//   res.redirect('/apartment')
// })

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