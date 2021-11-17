let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')


// GET /tags/new - display form for creating new tags
router.get('/', (req, res) => {
  db.tag.findAll()
  .then((tags) => {
    res.render('tags/index', { tags })
  })
  .catch((error) => {
    res.status(200).send('new tags')
  })
})


// POST /tags - create a new post
router.post('/new', (req, res) => {
  db.tag.create({
    name: req.body.name,
    tagId: req.body.tagId
  })
  .then((tag) => {
    res.redirect('/tag')
  })
  .catch((error) => {
    res.status(200).send('post tags')
  })
})



// GET /tags/:id - display a specific post and its tag
router.get('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id },
  })
  .then((tag) => {
    // if (!tag) throw Error()
    console.log('these are the tags', tag)
    res.render('tags/show', { tag: tag })
  })
  .catch((error) => {
    console.log(error)
    res.status(200).send('find tag')
  })
})

//POST ==> /tags/:id:comments --> this willl add a new comment
// req.body is coming from the form in show.ejs
// req.params is referring the url
router.post('/:id/comments', (req,res) => {
  db.comment.create({
    name: req.body.name,
    tagId: req.params.id
  })
  .then(resPost => {
    console.log('created tag', resPost)
    res.redirect(`/tags/${req.params.id}`)
  })
  .catch(err => {
    res.status(200).render
  })
})

module.exports = router