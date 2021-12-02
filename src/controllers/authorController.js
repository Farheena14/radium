const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");
const jwt = require('jsonwebtoken')


// ------------FIRST API CREATE AUTHOR
const getcreateauthor = async function (req, res) {

    let data = req.body;
    let savedData = await authorModel.create(data);
    res.status(200).send({ status: true, msg: savedData });

    res.status(400).send({
        status: false,
        msg: "BAD REQUEST",
    });

};

module.exports.getcreateauthor = getcreateauthor;


// --------SECOND API BLOG MODEL CREATE
const getcreateblog = async function (req, res) {
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
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "AUTHOR ID IS NOT VALID",
        });
    }
};
module.exports.getcreateblog = getcreateblog;


//  -------THIRD API
const getBlog = async function (req, res) {
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

        res.send(err);
    }
};
module.exports.getBlog = getBlog;



// ----------FOURTH API
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let newTitle = req.body.title;
        let newBody = req.body.body;
        let newtags = req.body.tags;
        let newSubcategory = req.body.subcategory;
        let today = Date();
        let data = await blogModel.findById(blogId);
        if (req.validToken._id == data.authorId) {
            let updatetag = data["tags"].concat(newtags)
            let updatesubcategory = data["subcategory"].concat(newSubcategory)
            if (data.isDeleted == false && data) {
                //console.log(data);
                let dataUpdate = await blogModel.findOneAndUpdate({ _id: blogId }, {
                    title: newTitle,
                    body: newBody,
                    
                    tags: updatetag,
                    subcategory: updatesubcategory,

                    publishedAt: new Date(),
                    isPublished: true

                }, { new: true });
                console.log(dataUpdate);
                res.status(200).send({ msg: "updated successfully", data: dataUpdate });
            }
        } else {
            res.status(404).send({ status: false, msg: "AUTHENTICATION FAILED" });
        }

    } catch (error) {
        console.log(error);
        res.status(404).send({ status: false, msg: "error-response-status" });
    }
};

module.exports.updateBlog = updateBlog




//--------------FIFTH API FIND AND UPDATE
const deleteblog = async function (req, res) {
    let Bid = req.params.blogId;
    console.log(Bid);
    let checkid = await blogModel.findById(Bid);
    console.log(checkid);
    if (req.validToken._id == checkid.authorId) {
        if (checkid) {
            let z = await blogModel.findOneAndUpdate({ _id: Bid }, { $set: { isDeleted: true } });
            let a = await blogModel.findById(Bid);
            console.log(a, "my name is ashutosh");
            res.status(200).send();
            console.log(z, "good name")
        } else {
            res.status(404).send({ status: false, msg: "blogId doesn't exist" });
        }
    } else {

        res.status(404).send({ status: false, msg: "AUTHENTICATION FAILED" });
    }
};
module.exports.deleteblog = deleteblog;




//-----------------SIXTH API FIND AND DELETE DATA
const deleteupdateblog = async function (req, res) {
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
        }

        else {
            res.ststus(400).send({ status: false, msg: "!No blog found" });
        }
    }

    catch (error) {
        res.status(400).send({ status: false, msg: error });
    }
}
    ;


module.exports.deleteupdateblog = deleteupdateblog;







// PHASE 2--------FIRST API------FOR LOGIN 
//Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId
//If the credentials are incorrect return a suitable error message with a valid HTTP status code


const userlogin = async function (req, res) {
    try {
        if (req.body && req.body.email && req.body.password) {
            let user = await authorModel.findOne({ email: req.body.email, password: req.body.password, isdeleted: false })
            if (user) {

                let payload = { _id: user._id }
                let token = jwt.sign(payload, 'my secret key')
                res.header('x-api-key', token)
                res.send({ status: true, data: user._id, token: token })
            }
        }
    } catch (error) {

        res.send({ msg: "user name and password not found" })
    }



}

module.exports.userlogin = userlogin


// PHASE 2--------SECOND API------FOR LOGIN VERIFY 
const getuserdetail = async function (req, res) {
    try {
        let identity = req.params.userid
        let detail = await authorModel.findOne({ _id: identity, isdeleted: false })
        if (detail) {
            res.send({ status: true, data: detail })
        }
    } catch (error) {

        res.send({ status: false, data: "user not found" })
    }
}


module.exports.getuserdetail = getuserdetail
















