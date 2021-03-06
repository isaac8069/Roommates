require('dotenv').config()
let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
let db = require('./models')
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const methodOverride = require('method-override')
const { Op } = require('sequelize')

// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//
app.use(express.static(__dirname + '/public/'))

// body parser middelware
app.use(express.urlencoded({ extended: false }))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// methodOverride uses _method to override post or get from forms
app.use(methodOverride('_method'))

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/apartment', require('./controllers/apartment'))
app.use('/tag', require('./controllers/tag'))


// home route
app.get('/', (req, res) => {
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})