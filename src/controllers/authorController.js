const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')


// FIRST API CREATE AUTHOR
const getcreateauthor = async function(req, res) {
    try {
        let data = req.body
        let savedData = await authorModel.create(data)
        res.status(200).send({ status: true, msg: savedData })
    } catch {
        res.status(400).send({
            status: false,
            msg: "BAD REQUEST"
        });
    }
}

module.exports.getcreateauthor = getcreateauthor


// SECOND API BLOG MODEL CREATE
const getcreateblog = async function(req, res) {
    const blog = req.body;
    const authorId = req.body.authorId
    const abc = await authorModel.findById(authorId)


    if (abc) {
        let savedBlog = await blogModel.create(blog);
        res.status(200).send({
            status: true,
            data: { savedBlog }
        });

    } else {
        res.status(400).send({
            status: false,
            msg: "AUTHOR ID IS NOT VALID"
        });
    }
};
module.exports.getcreateblog = getcreateblog

// THIRD API 
const getblogs = async function(req, res) {

    try {
        const blogs = await blogModel.find({ isDeleted: false }, { isPublished: true })
        if (blogs) {
            res.status(200).send({ status: true, data: { blogs } })
        }

        let authorId = req.query.authorId
        let category = req.query.category
        let tag = req.query.tag
        let subcategory = req.query.subcategory
        let emparr = []
        let emparrsh = []
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].authorId == authorId && blogs[i].category == category) {
                emparr.push(blogs[i])

            } else if (blogs[i].tags == tags && blogs[i].subcategory == subcategory) {

                emparrsh.push(blogs[i])

            }
        }
        res.status(200).send({ data: emparrsh })



    } catch (err) {
        res.status(404).send({ status: false, msg: "No blogs found" })
    }
}

module.exports.getblogs = getblogs



// FOURTH API 
const updateBlog = async function(req, res) {

    let pid = await blogModel.findById(req.query.id)
    if (pid) {
        const blogger = await blogModel.findOneAndUpdate({
                subcategory: "developer"
            }, {
                $set: {
                    title: "changetitle",
                    body: "namastey",
                    tags: ["sukhriya"],
                    subcategory: ["nawab"]
                }
            }, { new: true }

        )
    }
}

module.exports.updateBlog = updateBlog