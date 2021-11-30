const express = require('express');
const router = express.Router();


const authorController = require('../controllers/authorController')



// FIRST API
router.post('/createauthor', authorController.getcreateauthor)

// SECOND API
router.post('/createblog', authorController.getcreateblog)

// THIRD API
router.get('/blogs', authorController.getblogs)


//FOURTH API
router.put('/blogs/:blogId', authorController.updateblog)
module.exports = router