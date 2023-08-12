const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    transactionType: {
        type: String,
    },

    asset: {
        type: String,
    },
    amount: {
        type: String,
    },
    hash: { type: String }
}, { timestamp: true })

module.exports = mongoose.model("EST_Transaction", transactionSchema);