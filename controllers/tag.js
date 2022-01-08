let express = require('express')
let db = require('../models')
const router = express.Router()
const sequelize = require('sequelize')
const tag = require('../models/tag')
const apartment = require('../models/apartment')
const { HasMany } = require('sequelize')


// GET ALL APARTMENTS BY userId
router.get('/new', (req, res) => {
  // console.log('GET ALL USER APARTMENTS')
  const userId = req.user.dataValues.id
  // console.log('CHECK FOR USER', userId)
  db.apartment.findAll({
    where: { userId: userId },
    include: [db.user]
  })
    .then((apartments) => {
      // console.log('IS THIS WORKING', apartments)
      res.render('tags/new', { apartments })
    })
    .catch((error) => {
      res.status(200).send('Not Working')
    })
})

// POST ADD TAG
router.post('/new', (req, res) => {
  console.log('happy', req.body.apartmentId)
  db.apartment.findByPk(req.body.apartmentId)
    .then((foundApartment) => {
      console.log(req.body.name)
      db.tag.findOrCreate({ where: { name: req.body.name } })
        .then(([tag, created]) => {
          foundApartment.addTag(tag).then(apartmentTag => {
            console.log(``)
           
              res.render('tags/update', {apartment: foundApartment, tag: tag})
              console.log('TAGGEDDD APTMNT', tag)
          })
        })
    })
})

// GET - VIEW ALL TAGS
router.get('/', (req, res) => {
  console.log('TAG PAGE')
  db.tag.findAll()
    .then((tags) => {
      res.render('tags/index', { tags })
    })
    .catch(err => console.log(err))
})

// Get all Apartments that use a Tag
router.get('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id }
  }).then(tag => {
    console.log('TAGSSSS APTMNT', tag)
    console.log('FIND TAG NAEM', tag.name)
    tag.getApartments().then(apartments => {
      console.log('NEXT LEVEL', tag.name)
      res.render('tags/show', { apartments: apartments, tag: tag })
    })
      .catch((error) => {
        console.log(error)
        res.send('NO APARTMENTS FOUND')
      })
  })
})


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