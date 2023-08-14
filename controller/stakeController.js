const stakingPlan = require("../models/stakingPlanModel");
const stakingContract = require("../models/stakingContractModel");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const nodemailer = require("nodemailer");


const createStakingPlan = async (req, res) => {

    const user = req.user.id;
    const { name, asset, stakingPeriod, amount, apr } = req.body;
    try {

        if (!user || user === undefined || user === null) {
            res.status(201).json("Invalid User");
        }
        const planExist = await stakingPlan.findOne({ name });


        if (planExist) {
            res.status(400).json("Plan already exists");
        } else {
            const newPlan = await stakingPlan.create({ userId: user, name: name, asset: asset, stakingPeriod: stakingPeriod, amount: amount, apr: apr })
            console.log(newPlan)
            if (newPlan) {
                res.status(200).json({ status: true, details: newPlan })
            }
            if (!newPlan) {
                res.status(400).json(" Failed to create a plan")
            }
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);

    }

}
const getStakingPlan = async (req, res) => {
    console.log(req.user.id);
    const user = req.user.id;
    // const {asset,stakingPeriod,amount,apr}=req.body;

    if (!user || user === undefined || user === null) {
        res.status(400);
        throw new Error("Invalid User");
    }

    const plan = await stakingPlan.find({})
    console.log(plan)
    if (plan) {
        res.status(200).json({ status: true, details: plan })
    } else {

        res.status(400);
        throw new Error(" Failed to fetch plans")
    }

}
const getSingleStakingPlan = async (req, res) => {
    console.log(req.user.id);
    const user = req.user.id;
    const { asset } = req.body;

    if (!user || user === undefined || user === null) {
        res.status(400);
        throw new Error("Invalid User");
    }

    const plan = await stakingPlan.find({ asset: asset })
    console.log(plan)
    if (plan) {
        res.status(200).json({ status: true, details: plan })
    } else {
        res.status(400);
        throw new Error(" Failed to fetch plans")
    }

}
const deleteStakingPlan = async (req, res) => {
    // console.log(`request${req.body}`);
    console.log("sdd")
    console.log(req.body)

    const plan = await stakingPlan.findOne(req.body.id)
    console.log(`My plan${plan}`);
    if (!plan || plan === undefined || plan == null) {
        res.status(400);
        throw new Error("Invalid plan");
    }
    console.log("plan");
    const deletePlan = await stakingPlan.findByIdAndDelete(plan.id)
    if (deletePlan) {
        res.status(200).json({ status: true, message: `${plan.name} has been deleted` })
    } else {
        res.status(400);
        throw new Error(" Failed to delete a plan")
    }


}

const stakeMyToken = async (req, res) => {
    const { planName } = req.body;
    const userId = req.user.id;
    try {

        const availablePlan = await stakingPlan.findOne({ name: planName });

        if (!availablePlan || availablePlan == null || availablePlan === undefined) {
            res.status(200).json({ status: false, message: "Plan not found" })
        }
        const user = await userModel.findById({ _id: userId });
        console.log(user);
        if (!user || user == null || user === undefined) {
            res.status(400).json({ status: false, message: "User not found" })
        }

        if (user.balance < availablePlan.amount) {
            res.status(400);
            throw new Error("User has low balance")
        } else {
            const deductedBalance = user.balance - availablePlan.amount;
            const stakedBalance = +user.stakedAmount + +availablePlan.amount;
            const myPlan = await stakingContract.create({ userId, asset: availablePlan.asset, stakingPeriod: availablePlan.stakingPeriod, amount: availablePlan.amount, apr: availablePlan.apr, createdAt: Date.now() })
            myPlan.save();
            await userModel.findByIdAndUpdate({ _id: userId }, { balance: deductedBalance, $push: { contract: myPlan.id }, stakedAmount: stakedBalance },)
            // const dataPopulate = await user.populate("StakingContract");
            // console.log(dataPopulate);
            if (myPlan) {
                res.status(200).json({ success: true, message: "Your plan has been created", details: myPlan });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

const rewardToken = async (req, res) => {
    const userId = req.user.id;

    // res.status(200).json({ userId });
    const user = await userModel.findById({ _id: userId })

    const userContract = user.contract;
    //    userContract.forEach(element => {
    //        (element)
    //     });
    //       console.log(`adfasfa ${data}`)
    // const uC=userContract.map((e)=>e.apr);
    res.status(200).json({ contract: (user.contract) });
}



const fetchMyContract = async (req, res) => {
    const userID = req.user.id;

    try {
        const myPlan = await stakingContract.find({ userId: userID });
        console.log(myPlan);
        if (myPlan) {

            res.status(200).json({ success: true, details: myPlan });
        } else {
            res.status(400).json({ success: false, details: "You don't have any contract right now" });
        }
    } catch (error) {
        res.status(500).json(error);

    }


}


const sendMailer = async (req, res) => {
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp-relay.brevo.com",
        // service: "SendinBlue",
        auth: {
            user: 'chandran18@gmail.com',
            pass: '161198@Jc',
        }, tls: {
            ciphers: 'SSLv3' // You can try other versions like 'TLSv1.2' or 'TLSv1.3'
        }, secureConnection: false,
        secure: true,
    });
    const mailData = {
        from: 'chandran18@gmail.com',
        to: 'chandran16@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b>                     <br> This is our first message sent with Nodemailer<br/>',
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        res.status(200).json({ status: true, message: info });
    });


}


module.exports = {
    createStakingPlan,
    deleteStakingPlan,
    getStakingPlan,
    getSingleStakingPlan,
    stakeMyToken,
    fetchMyContract, rewardToken,sendMailer
}