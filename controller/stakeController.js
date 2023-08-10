const stakingPlan = require("../models/stakingPlanModel");
const asyncHandler = require("express-async-handler");


const createStakingPlan = async (req, res) => {
    console.log(req.user.id);
    const user = req.user.id;
    const { name, asset, stakingPeriod, amount, apr } = req.body;

    if (!user || user === undefined || user === null) {
        res.status(400);
        throw new Error("Invalid User");
    }

    const plan = await stakingPlan.create({ userId: user, name: name, asset: asset, stakingPeriod: stakingPeriod, amount: amount, apr: apr })
    console.log(plan)
    if (plan) {
        res.status(200).json({ status: true, details: plan })
    } else {

        res.status(400);
        throw new Error(" Failed to create a plan")
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


module.exports = {
    createStakingPlan,
    deleteStakingPlan, getStakingPlan, getSingleStakingPlan
}