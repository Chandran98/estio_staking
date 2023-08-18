const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: "us-east-1"
})

const s3 = new AWS.S3();

const getAllUser = asyncHandler(async (req, res) => {
    const user = await User.find({});
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user) {
        res.status(200).json({ status: true, details: user });
    }
});
const getuserById = asyncHandler(async (req, res) => {
    console.log(req.body.id);
    try {
        const user = await User.findById(req.body.id);
        console.log(user);
        if (!user || user === null || user === undefined) {
            // res.status(404).json({ message: "Not found", details: user });
            res.status(404);
            throw new Error("Not found ");
        }

        // To populate contract

        // const dataSave = await user.populate("contract");
        // console.log(dataSave);


        res.status(200).json({ message: "success", details: user });
    } catch (error) {

        res.status(500).json(error);
    }
});

const updateuserById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user || user === undefined || user === null) {
        res.status(404);
        throw new Error("Not found ");
    }
    console.log("sdsd");
    // if (user.user_id !== req.user.id) {
    //   res.status(403);
    //   throw new Error("Not valid");
    // }
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.status(200).json({ message: "success", details: userData });
});

const deleteuserById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user || user === undefined || user === null) {
        res.status(404);
        throw new Error("Not found ");
    }
    console.log("sdsd");
    // if (user.user_id !== req.user.id) {
    //   res.status(403);
    //   throw new Error("Not valid");
    // }
    const userData = await User.findByIdAndDelete(req.params.id);


    res.status(200).json({ message: "success", details: `${user.name} profile has been deleted` });
});



const uploadImage = async (req, res) => {
    if (!req.file) {
        res.status(200).json({ message: "No file was uploaded" });
    }
    const params = {
        Bucket: "estiostaking",
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read'
    }
    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading to S3.');
        }
        res.send({ status: true, data: data.Location, message: 'File uploaded successfully', type: data.key.split('.')[1] })

    })
}




module.exports = { updateuserById, getuserById, getAllUser, deleteuserById, uploadImage }