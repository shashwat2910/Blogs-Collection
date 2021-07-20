const express = require('express')
const router = express.Router()
const  { ensureAuth, ensureGuest } = require('../middleware/auth')
const Blog = require('../models/Blogs')


// login/Landing
router.get('/', ensureGuest , (req, res) => {
    
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard
router.get('/dashboard', ensureAuth ,async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id}).lean()
        res.render('Dashboard', {
            name: req.user.firstName,
            blogs
        })
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
     
})


module.exports = router