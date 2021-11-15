let express = require('express')
const router = express.Router()
let db = require('../models')
const apartment = require('../models/apartment')
const sequelize = require('sequelize')
const Op = sequelize.Op

// Get apartment - display all apartments
router.get('/', (req, res)=> {
    db.apartment.findAll()
    .then((apartments) => {
        res.render('apartments', { apartments })
    })
    .catch(err => console.log(err))
})


//POST an apartment
router.post('/', (req, res) => {
    db.apartment.create({
        title: req.body.title,
        rent: req.body.rent,
        description: req.body.description,
        location: req.body.location,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        amenity: req.body.amenity,
        roommate: req.body.roommate
        })
        .then((apartment) => {
            res.redirect('/apartments')
        })
        .catch((error) => {
            res.status(200).render
        })
    })    

// GET: /apartments/new - display form for creating a new apartment listing
router.get('/new', (req, res) => {
    res.render('apartmets/new')
})

// GET /apartments/:id - display a specific author and their posts
router.get('/:id', (req, res) => {
    db.apartment.findOne({
      include: [db.tag],
      where: {id: req.params.id}
    }).then((apartment) => {
      res.render('apartments/show', { apartment: apartment })
    }).catch((error) => {
      console.log(error)
      res.status(200).render
    })
  })

  // Search for apartments
  router.get('/search', (req, res) => {
      let {term} = req.query
      //Make lowerCase
      term = term.toLowerCase()

    apartment.findAll({ where: { location: { [Op.like]: '%' + term + '%' }}})
    .then(apartments => res.render('apartments', { apartments }))
    .catch(error => console.log(error))
  })
module.exports = router