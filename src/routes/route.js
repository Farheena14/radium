const express = require('express');
const router = express.Router();


const accountcontroller = require('../controllers/authorController')
const middle = require('../middleware/middleware');


// FIRST API
router.post('/createauthor', accountcontroller.getcreateauthor)

// SECOND API
router.post('/createblog', middle.middleware, accountcontroller.getcreateblog)

// THIRD API
router.get('/blogs', accountcontroller.getBlog)

//FOURTH API
router.put('/blogs/:blogId', accountcontroller.updateBlog)

//FIFTH API
router.delete('/blogs/:blogId', middle.middleware, accountcontroller.deleteblog)

//SIXTH API

router.delete('/blogs', middle.middleware, accountcontroller.deleteupdateblog)

//Phase 2
router.post('/login', accountcontroller.userlogin)

//second 2

router.get('/userdetail/:userid', middle.middleware, accountcontroller.getuserdetail)

module.exports = router