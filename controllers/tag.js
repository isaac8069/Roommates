let express = require('express')
let db = require('../models')
const router = express.Router()
const sequelize = require('sequelize')
const tag = require('../models/tag')
const apartment = require('../models/apartment')

// GET ALL APARTMENTS BY userId
router.get('/new', (req, res) => {
  console.log('GET ALL USER APARTMENTS')
  const userId = req.user.dataValues.id
  console.log('CHECK FOR USER', userId)
  db.apartment.findAll({
    where: { userId: userId },
    include: [db.user]
  })
    .then((apartments) => {
      console.log('IS THIS WORKING', apartments)
      res.render('tags/new', { apartments })
    })
    .catch((error) => {
      res.status(200).send('Not Working')
    })
})

// POST ADD TAG
router.post('/new', (req, res) => {
  db.tag.create({
    name: req.body.name
  })
    .then((apartment) => {
      res.redirect('/tags/show')
    })
    .catch((error) => {
      console.log(error)
    })
})

// GET - VIEW ALL TAGS
router.get('/', (req, res) => {
  db.tag.findAll()
    .then((tags) => {
      res.render('tags/index', { tags })
    })
    .catch(err => console.log(err))
  res.status(200).send('Route successful. This is where all tags will go')
})

// First, get a reference to a apartment.
// router.post('apartments/tags', (req, res) => {
//   db.apartment.findByPk(req.body.apartmentId)
//   .then(apartment => {
//     db.tag.findByPk(req.body.apartmentId)
//     .then(tag => {
//       apartment.addTag(tag)
//       res.redirect(/tags/show)
//     })
//   })
// })


// // Get ALL APARTMENTS THAT USE A TAG
// db.tag.findAll({
//   where: {name: "stinky bear"}
// }).then(tag => {
//   toy.getApartments().then(apartments => {
//     console.log(`${apartments.length} apartment(s) loves the ${tag.name}.`)
//   })
// })

// // FIND ALL DATA
// db.apartment.findAll({
//   where: {
//     userId: currentUser.id
//   },
//   include: [db.user, db.tag]
// }).then(apartment => {
//   aprtment.tags.forEach(tag => {
//     console.log(`${apartment.user.firstName}'s apartment ${apartment.name} loves their ${tag.name}.`)
//   })
// })

module.exports = router