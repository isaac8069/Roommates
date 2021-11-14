require('dotenv').config()
let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
let db = require('./models')

// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//
app.use(express.static(__dirname + '/public/'))

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

//GET - display all apartments
app.get('/', (req,res) => {
    db.apartment.findAll({

    }).then((apartments) => {
        res.render('', { apartments: apartments})
    }).catch((error) => {
        console.log(error)
        res.status(200).render
    })
})
// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/apartments', require('./controllers/apartments'))
app.use('/users', require('./controllers/users'))
app.use('/tags', require('./controllers/tags'))


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})

module.exports = server