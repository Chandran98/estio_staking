const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    transactionType: {
        type: String,

        enum: ["Deposit", "Withdraw"],
        required: true,
    },

    asset: {
        type: String,
    }, amount: {
        type: String,
    },
    amount: {
        type: String,
    },
    status: { type: String }



}, { timestamp: true })

module.exports = mongoose.model("EST_Transaction", transactionSchema);