let experess = require('express')
let router = express.Router()
let db = require('../models')
const apartment = require('../models/apartment')

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
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        amenities: req.body.amenities,
        roommates: req.body.roomates,
        aboutLister: req.body.aboutLister
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

module.exports = router