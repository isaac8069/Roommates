let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')
const tag = require('../models/tag')


// ADD A UNIGUE TAG TO AN APARTMENT
// First, get a reference to a apartment.
db.apartment.findOrCreate({
  where: {
    name: "Silly May",
    userId: apartment.id
  }
}).then(([apartment, created]) => {
  // Second, get a reference to a tag.
  db.tag.findOrCreate({
    where: {name: "stinky bear"}
  }).then(([tag, created]) => {
    // Finally, use the "addModel" method to attach one model to another model.
    pet.addTag(tag).then(relationInfo => {
      console.log(`${tag.name} added to ${apartment.name}.`)
    })
  })
})

// ADD MORE TAGS AND MORE APARTMENTS
app.post('/apartmentsTags', (req, res) => {
  // First get a reference to the apartment
  db.apartment.findByPk(req.body.apartmentId)
  .then(apartment => {
    db.tag.findByPk(req.body.apartmentId)
    .then(tag => {
      pet.addTag(tag);
      res.redirect(`/apartments/${req.body.apartmentId}`)
    })
  })
})

// Get ALL APARTMENTS THAT USE A TAG
db.tag.findOne({
  where: {name: "stinky bear"}
}).then(tag => {
  toy.getApartments().then(apartments => {
    console.log(`${apartments.length} apartment(s) loves the ${tag.name}.`)
  })
})

//  ADD AN APARTMENT ASSOCIATION ON A TAG IF THERE ARE NO APARTMENT ASSOCIATIONS YET
db.tag.findOrCreate({
  where: {name: "ball"}
}).then(([tag, created]) => {
  tag.getApartments().then(apartments => {
    // Check if their are any apartments associated with this tag
    if (apartments.length > 0) {
      apartments.forEach(apartment => {
        console.log(`${apartment.name} loves their ${tag.name}.`)
      });
    } else {
      // findOrCreate a Apartment and add it to the tag
      db.apartment.findOrCreate({
        where: {
          name: "Ruby Tuesday",
        }
      }).then(([apartment, created]) => {
        toy.addApartment(apartment).then(relationInfo => {
          console.log(`${apartment.name} has faved the ${tag.name}tag.`);
        })
      })
    } // end of if statement
  })
})

// FIND ALL DATA
db.apartment.findOne({
  where: {
    userId: "Silly May"
  },
  include: [db.user, db.tag]
}).then(apartment => {
  aprtment.tags.forEach(tag => {
    console.log(`${apartment.user.firstName}'s apartment ${apartment.name} loves their ${tag.name}.`)
  })
})

module.exports = router