const mongoose = require('mongoose');

const stakingContract = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    asset: { type: String },
    stakingPeriod: { type: String },
    // ReleasePeriod: { type: String },
    amount: { type: String },
    apr: { type: String },
    createdAt: { type:  Date }
})

module.exports = mongoose.model("StakingContract", stakingContract);