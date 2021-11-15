// let express = require('express')
// const router = express.Router()
// let db = require('../models')
// const apartment = require('../models/apartment')
// const sequelize = require('sequelize')
// const Op = sequelize.Op

// // Get apartment - display all apartments
// router.get('/', (req, res)=> {
//     // db.apartment.findAll()
//     // .then((apartments) => {
//     //     res.render('apartments', { apartments })
//     // })
//     // .catch(err => console.log(err))
//     res.status(200).send('route successful')
// })


// //POST an apartment
// router.post('/', (req, res) => {
//     db.apartment.create({
//         title: req.body.title,
//         rent: req.body.rent,
//         description: req.body.description,
//         location: req.body.location,
//         bedroom: req.body.bedroom,
//         bathroom: req.body.bathroom,
//         amenity: req.body.amenity,
//         roommate: req.body.roommate
//         })
//         .then((apartment) => {
//             res.redirect('/apartments')
//         })
//         .catch((error) => {
//             res.status(200).send('Post an apartment')
//         })
//     })    

// // GET: /apartments/new - display form for creating a new apartment listing
// router.get('/new', (req, res) => {
//     res.render('apartments/new')
// })

// // GET /apartments/:id - display a specific apartment and their tags
// router.get('/:id', (req, res) => {
//     db.apartment.findOne({
//       include: [db.tag],
//       where: {id: req.params.id}
//     }).then((apartment) => {
//       res.render('apartments/show', { apartment: apartment })
//     }).catch((error) => {
//       console.log(error)
//       res.send('display apartment')
//     })
//   })

//   // Search for apartments
//   router.get('/search', (req, res) => {
//     //   let {term} = req.query
//       //Make lowerCase
//     //   term = term.toLowerCase()
//     console.log(req.query)
//     db.apartment.findAll({ where: { location: req.query.location}})
//     .then(apartments => res.render('apartments', { apartments }))
//     .catch(error => console.log(error))
//   })
// module.exports = router