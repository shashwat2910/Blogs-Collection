const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')

// Load config
dotenv.config({path : './config/config.env'})

connectDB()

// Passport config
require('./config/passport')(passport)

const app = express()
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// HandleBars
app.engine('.hbs', exphbs({defaultLayout: 'main',extname:'.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))