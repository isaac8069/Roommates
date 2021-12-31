let express = require('express')
let db = require('../models')
const router = express.Router()
const apartment = require('../models/apartment')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const methodOverride = require('method-override')
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
  console.log('ROUTE')
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
    userId: res.locals.currentUser.id
  })
    .then((apartment) => {
      res.render('apartments/image', { apartment: apartment })
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

// POST - CLOUDINARY  UPLOAD
router.post('/image', upload.single('myFile'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    // console.log('image page works')
    // console.log(result)
    // console.log('This should be the image', result.url)
  })
    .then(image => {
      const apartment = req.body
      // console.log('This should be the apartment body', apartment)
      // console.log('This should be apartment and image', image)
      res.render('apartments/update', { apartment: apartment, image: image.url })
    })
})

// PUT - CONFIRM FINAL IMAGE
router.put('/:id/update', (req, res) => {
  console.log('Should be whole apartment', req.body)
  db.apartment.update({
    title: req.body.title,
    rent: req.body.rent,
    description: req.body.description,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    amenities: req.body.amenities,
    roommates: req.body.roommates,
    image: req.body.image
  }, { where: { id: req.params.id } })
    .then(updatedApartment => {
      console.log(`new apartment UPDATED: ${updatedApartment}`)
      res.redirect(`/apartment/${req.params.id}`)
    })
    .catch(error => console.error)
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
    where: { location: { [Op.like]: req.query.location } }
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
    console.log('apartment', apartment)
  }).catch((error) => {
    console.log(error)
    res.send('APARTMENT ID NOT FOUND')
  })
})

module.exports = router