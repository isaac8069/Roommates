let experess = require('express')
let router = express.Router()
let db = require('../config/database')
const apartment = require('../models/apartments')

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
            res.status(400).render('......')
        })
    })

// GET: /apartments/new - display form for creating a new apartment listing
router.get('/new', (req, res) => {
    res.render('apartmets/new')
})


module.exports = router