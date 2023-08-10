const asyncHandler = require("express-async-handler");

const crypto = require("../helpers/crypto");

const { generateToken } = require("../helpers/validateToken");
const { ethers, makeError } = require("ethers");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Register handlers
const signUpRequest = asyncHandler(async (req, res) => {
    console.log("sdf");
    const { name, email, phone, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    console.log("dssasad");
    const userAvailable = await User.findOne({ email });
    console.log("dsd");

    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    console.log("ddsdssd");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const wallet = ethers.Wallet.createRandom();
    const publicAddress = crypto.encrypt(wallet.address);
    const privateAddress = crypto.encrypt(wallet.privateKey);

    console.log(`${publicAddress} ${privateAddress}`);
    const user = await User.create({
        name,
        email,
        wallet: {
            publicAddress,
            privateAddress,
        },
        phone,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invlaid user already");
    }
});

// Login handlers
const signInRequest = asyncHandler(async (req, res) => {
    console.log(req.headers);
    console.log(req.header);

    const { email, password } = req.body;
    console.log(req.body);
    console.log(email, password);

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    const userAvailable = await bcrypt.compare(password, user.password);
    if (!userAvailable) {
        res.status(400);
        throw new Error("Invalid password");
    }
    console.log("approved");

    user.lastLogin = new Date();
    await user.save();
    const accessToken = generateToken({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },

    });


    res.status(200).json({
        status: "success",
        token: accessToken,
    });
});



// const sendLoginOtp = asyncHandler(async (req, res) => {
//     console.log(req.body);
//     const mobile = req.body.mobile;
//     console.log(req.body);
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     let otpEntry = await OtpModel.findOne({ mobile });
//     // console.log(Date());

//     // console.log(Date().setMinutes(expirationTime.getMinutes() + 5));

//     otpEntry
//       ? ((otpEntry.otp = otp), otpEntry.save())
//       : OtpModel.create({ mobile, otp });

//     await client.messages.create(
//       {
//         body: `Your Otp is ${otp}`,
//         from: process.env.PHONE_NO,
//         to: `+91${mobile}`,
//       },
//       (err, message) => {
//         if (err) {
//           res
//             .status(400)
//             .json({ error: err, message: "Failed to Send Otp please try again" });
//         }
//         if (message) {
//           res
//             .status(200)
//             .json({ message: `OTP sent successfully${message.accountSid}` });
//         }
//       }
//     );
//   });

//   const verifyOtp = asyncHandler(async (req, res) => {
//     const { mobile, otp } = req.body;

//     const userMobile = await OtpModel.findOne({ mobile });
//     if (otp === userMobile.otp) {
//       await userMobile.deleteOne();

//       res.status(200).json({ message: "Verified successfully" });
//     }
//     if (otp !== userMobile.otp) {
//       res.status(200).json({ message: "Invalid otp or expired" });
//     }
//   });



module.exports = { signUpRequest, signInRequest,  }