const mongoose = require('mongoose');

const stakingPlan = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    name: { type: String },
    asset: { type: String },
    stakingPeriod: { type: String },
    // ReleasePeriod: { type: String },
    amount: { type: String },
    apr: { type: String },
    createdAt: { type: Date }
})

module.exports = mongoose.model("StakingPlan", stakingPlan);