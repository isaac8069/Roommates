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
  console.log('happy', req.body.apartmentId)
  db.apartment.findByPk(req.body.apartmentId)
    .then(foundApartment => {
      foundApartment.createTag({
        name: req.body.name
      })
        .then(createTag => {
          res.redirect('/apartment')
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

// First, get a reference to an apartment
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


// // Get ALL APARTMENTS BY TAG
// router.get('/:id', (req, res)=>{
// console.log('WHERE ARE MY APTTAGS')
//   db.apartment.findAll({
//     where: { tag: { [Op.like]: req.query.name}},
//     include: [db.apartmentTag]
//   })
//   .then(apartmentTagFound)
//   res.render('tags/show', {apartmentTagFound})
// })
// .catch((error)=>{
//   res.status(200).send('no ApartmentTags found', error)
// }) 
// => {
//   db.apartment.findAll({
//     where: { tag: req.body.name },
//   })
//     .then((apartment) => {
//       console.log('Found tagged apartments', apartment)
//       res.render('tags/show', { apartment })
//     })
//     .cathch((err) => {
//       console.log('Error! No AptTags!', err)
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