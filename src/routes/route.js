const express = require('express');
const router = express.Router();
const accountcontroller = require('../controllers/authorController')
const middle = require('../middleware/middleware');


//  PHASE 1   FIRST API
router.post('/createauthor', accountcontroller.getcreateauthor)

// PHASE 1   SECOND API
router.post('/createblog', accountcontroller.getcreateblog)

// PHASE 1    THIRD API
router.get('/blogs',accountcontroller.getBlog)

//  PHASE 1 FOURTH API
router.put('/blogs/:blogId', middle.middleware, accountcontroller.updateBlog)

//  PHASE 1 FIFTH API
router.delete('/blogs/:blogId',middle.middleware, accountcontroller.deleteblog)

// PHASE 1 SIXTH API

router.delete('/blogs',middle.middleware, accountcontroller.deleteupdateblog)

//  PHASE  FIRST API
router.post('/login', accountcontroller.userlogin)

// PHASE 2 SECOND API

//router.get('/userdetail/:userid', middle.middleware, accountcontroller.getuserdetail)

module.exports = router
