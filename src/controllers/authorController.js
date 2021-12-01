const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

const jwt = require("jsonwebtoken");
// FIRST API CREATE AUTHOR
const getcreateauthor = async function(req, res) {
    try {
        let data = req.body;
        let savedData = await authorModel.create(data);
        res.status(200).send({ status: true, msg: savedData });
    } catch {
        res.status(400).send({
            status: false,
            msg: "BAD REQUEST",
        });
    }
};



// SECOND API BLOG MODEL CREATE
const getcreateblog = async function(req, res) {
    try {
        const blog = req.body;
        const authorId = req.body.authorId;
        const abc = await authorModel.findById(authorId);

        if (abc) {
            let savedBlog = await blogModel.create(blog);
            res.status(200).send({
                status: true,
                data: { savedBlog },
            });
        } else {
            res.status(400).send({
                status: false,
                msg: "AUTHOR ID IS NOT VALID",
            });
        }
    } catch (err) {
        res.status(400).send({ status: false, msg: "No author found" });
    }
};


/*
// THIRD API
const getblogs = async function(req, res) {
    try {
        const blogs = await blogModel.find({ isDeleted: false }, { isPublished: true });
        if (blogs) {
            res.status(200).send({ status: true, data: { blogs } });
        }

        let authorId = req.query.authorId;
        let category = req.query.category;
        let tag = req.query.tag;
        let subcategory = req.query.subcategory;
        let emparr = [];
        let emparrsh = [];
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].authorId == authorId && blogs[i].category == category) {
                emparr.push(blogs[i]);
            } else if (blogs[i].tags == tags && blogs[i].subcategory == subcategory) {
                emparrsh.push(blogs[i]);
            }
        }
        res.status(200).send({ data: emparrsh });
    } catch (err) {
        res.status(404).send({ status: false, msg: "No blogs found" });
    }
}; */
const getBlog = async function(req, res) {
    try {
        let emparr = [];
        let authorId = req.query.authorId;
        let tags = req.query.tags;
        let category = req.query.category;
        let subcategory = req.query.subcategory;
        let blog = await blogModel.find({
            $or: [
                { authorId: authorId },
                { category: category },
                { tags: tags },
                { subcategory: subcategory },
            ],
        });

        if (blog) {
            for (let i of blog) {
                if (i.isDeleted === false && i.isPublished === true) {
                    emparr.push(i);
                }
            }

            res.status(200).send({
                status: true,
                data: emparr,
            });
        } else {
            res.status(404).send({
                status: false,
                msg: "No blog exists",
            });
        }
    } catch (err) {
        // console.log(err)
        res.send(err);
    }
};


//4th solution
const updateBlog = async function(req, res) {
    try {
        let authorId = req.params.authorId;
        if (req.validToken == authorId) {
            let blogId = req.params.blogId;
            let newTitle = req.body.title;
            let newBody = req.body.body;
            let newTags = req.body.tags;
            let newSubcategory = req.body.subcategory;
            let today = Date();
            let data = await blogModel.findById({ _id: blogId });
            if (data.isDeleted == false && data) {

                let dataUpdate = await blogModel.findOneAndUpdate({ _id: blogId }, {
                    title: newTitle,
                    body: newBody,
                    $push: { tags: newTags },
                    $push: { subcategory: newSubcategory },
                    publishedAt: new Date(),
                    isPublished: true,

                }, { new: true });
                console.log(data);
                res.status(200).send({ msg: "updated successfully", data: dataUpdate });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ status: false, msg: "error-response-status" });
    }
};

//FIFTH API FIND AND UPDATE

const deleteblog = async function(req, res) {
    try {
        let authorId = req.params.authorId;
        if (req.validToken == authorId) {
            let Bid = req.params.blogId;
            console.log(Bid);
            let checkid = await blogModel.findById(Bid);
            console.log(checkid);
            if (checkid) {
                let z = await blogModel.findOneAndUpdate({ _id: Bid }, { $set: { isDeleted: true } });
                let a = await blogModel.findById(Bid);
                console.log(a);
                res.status(200).send();

            }
        }
    } catch (err) {
        res.status(404).send({ status: false, msg: "blogId doesn't exist" });
    }

}

//
/*
    // DELETE / blogs /: blogId
    const deleteblog = async function(req, res) {
        try {
            let Bid = req.params.Bid;
            let checkid = await blogModel.findById({
                _id: Bid,
                isDeleted: false
            });
            // console.log(checkid);
            if (checkid) {
                let z = blogModel.findOneandUpdate({ _id: Bid }, { isDeleted: true });
                res.status(200).send({ status: true, data: {} });
            }
        } catch (err) {
            res.status(404).send({ status: false, msg: "" });
    }
}; 
*/

//SIXTH API FIND AND DELETE DATA
const deleteupdateblog = async function(req, res) {
    try {
        // DELETE BY DETAIL
        let authorid = req.query.authorid;
        let tag = req.query.tag;
        let subcategory = req.query.subcategory;
        let isPublished = req.query.isPublished;

        // BLOG ID
        let aaa = req.query.blogId;
        console.log(aaa);
        let check = await blogModel.findById(aaa);
        console.log(check);
        if (check) {
            let detail = await blogModel.findOneAndUpdate({
                $or: [
                    { authorId: authorid },
                    { tags: [tag] },
                    { subcategory: [subcategory] },
                    { isPublished: isPublished },
                ],
            }, { isDeleted: true }, { new: true });
            console.log(detail);
            res.status(200).send({ status: true, msg: "sucessfully deleted" });
        } else {
            res.ststus(400).send({ status: false, msg: "!No blog found" });
        }
    } catch (error) {
        res.status(400).send({ status: false, msg: error });
    }
};
module.exports.getcreateauthor = getcreateauthor;
module.exports.getcreateblog = getcreateblog;
module.exports.getBlog = getBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteblog = deleteblog;
module.exports.deleteupdateblog = deleteupdateblog;

// PHASE 2--------FIRST API------FOR LOGIN
//Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId
//If the credentials are incorrect return a suitable error message with a valid HTTP status code

const userlogin = async function(req, res) {
    try {
        if (req.body && req.body.email && req.body.password) {
            let user = await authorModel.findOne({
                email: req.body.email,
                password: req.body.password,
                isdeleted: false,
            });
            if (user) {
                let payload = { _id: user._id };
                let token = jwt.sign(payload, "my secret key");
                res.header("x-api-key", token);
                res.send({ status: true, data: user._id, token: token });
            }
        }
    } catch (error) {
        res.send({ msg: "user name and password not found" });
    }
};

module.exports.userlogin = userlogin;

// PHASE 2--------SECOND API------FOR LOGIN VERIFY
const getuserdetail = async function(req, res) {
    let identity = req.params.userid;
    let detail = await authorModel.findOne({ _id: identity, isdeleted: false });
    if (detail) {
        res.send({ status: true, data: detail });
    } else {
        res.send({ status: false, data: "user not found" });
    }
};

module.exports.getuserdetail = getuserdetail