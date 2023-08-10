const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a username"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: [true, "Please add a valid email"],
        },
        profilePhoto: {
            type: String,
        },
        lastLogin: {
            type: Date,
        },
        wallet:  {
            publicAddress: { type: String },
            privateAddress: { type: String },
        },

        phone: {
            type: String,

            required: [true, "Please add a phone"],
            default: "",
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },

        active: {
            type: Boolean,
            default: true,
        },
        contract:[{
            type:mongoose.Types.ObjectId,
            ref:"StakingContract"
        }],
        level: [{
            type: String,
            enum: ["Beginner", "Intermediate", "Pro"],
            default: "Beginner",
        }],
    },
    { timestamp: true, toJSON: { virtuals: true } }
);
// authSchema.virtual("blockedUsers").get(function () {
//   return this.blockList.length;
// });

module.exports = mongoose.model("Users", userSchema);

