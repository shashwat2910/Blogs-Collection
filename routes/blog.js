const express = require('express')
const router = express.Router()
const  { ensureAuth } = require('../middleware/auth')
const Blog = require('../models/Blogs')


// show add blogs /blogs/add
router.get('/add', ensureAuth , (req, res) => {
    res.render('blogs/add', {
        layout: 'login'
    })
})

module.exports = router