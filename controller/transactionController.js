const transactionModel = require("../models/transcationModel");
const User = require("../models/userModel");

const crypto = require("../helpers/crypto");
const asyncHandler = require("express-async-handler");

// const polygonABI = require("../utils/polygonABI")
const { ethers, utils, BigNumber } = require("ethers");
const Razorpay = require('razorpay');
const userModel = require("../models/userModel");
const razorpay = new Razorpay({
    key_id: 'rzp_test_HjGAinZNMpVBaE',
    key_secret: 'nAffDZ365JRyOoI9yR0OOd2t',
});


const testNetRPC = "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78";
const mainnetRPC = "https://polygon-rpc.com/";
const polAddress = "0x0000000000000000000000000000000000001010"
const depositINR = async (req, res) => {
    const amount = req.body.amount;
    const userId = req.user.id;
    try {

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'order_receipt23',
        };
        await razorpay.orders.create(options, async (err, result) => {
            if (err) res.status(201).json({ status: false, message: err });

            if (result) {
                console.log(result);
                const user = await userModel.findById({ _id: userId });
                const updatedBalance = +user.balanceINR + +result.amount;

                await userModel.findByIdAndUpdate({ _id: userId }, { balanceINR: updatedBalance })
                await transactionModel.create({ userId, transactionType: "Deposit", asset: result.currency, amount: result.amount, hash: result.id })
                res.status(200).json({ status: true, message: result })
            };
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error })
    }
}
const withdrawINR = async (req, res) => {
    console.log(req.body);
}

const convertINR2Crypto = async (req, res) => {
    const userId = req.user.id;
    const inrAmount = req.body.amount;

    const user = await userModel.findById(userId);

    if (!user || user === undefined || user == null) {
        res.status(404);
        throw new Error("User not found");
    }
    if (parseInt(user.balanceINR) >= parseInt(inrAmount)) {
        const cryptValue = 56;
        const cryptBalance = (inrAmount / cryptValue).toFixed(2)
        const cryptoBalance =  +user.balance + +cryptBalance ;


        const inrBalance = user.balanceINR - inrAmount;
        console.log(`convert ${cryptoBalance}`)

        await userModel.findByIdAndUpdate({ _id: userId }, { balanceINR: inrBalance, balance: cryptoBalance })

        res.status(201).json({ status: true, message: `You have convert ${inrAmount} INR into ${cryptBalance} MATIC complete` },
        );
    } else {
        res.status(201).json({ status: false, message: "You don't have sufficient balance to complete" });
    }

}


const getBalance = async (req, res) => {
    const address = req.body.address;

    // const addres1s = "0x09385a960a2e0b6b4516d3ds41534da92cb2a50085"
    const userAddress = "0x1Fce5b0263048Daab52D49b6c7151a0ddB606fBe"
    try {

        const provider = new ethers.JsonRpcProvider(testNetRPC)

        const getAddress = new ethers.Contract(polAddress, polygonABI, provider)

        // const balance = await getAddress.balanceOf("0xB96EBb2B4E9f13099097221C9E7172389d55A6A5");

        const balance = await getAddress.balanceOf(userAddress);
        const bal = ethers.formatEther(balance)

        res.status(200).json({ status: true, details: `My ${userAddress} balance ${bal}` })
    } catch (error) {


        res.status(404).json({ status: true, details: `My balance ${error}` })
    }
}

const sendToken = async (req, res) => {
    const userId = req.user.id;
    const { address, amount, asset } = req.body;
    const amountToSend = ethers.parseEther(amount);

    const transactionType = "withdraw";
    try {

        const user = await User.findById({ _id: userId });
        const pvtAddress = crypto._decrypt(user.wallet.privateAddress)
        const publicAddress = crypto._decrypt(user.wallet.publicAddress)
        console.log(publicAddress);
        console.log(`Private Address ${pvtAddress}`);

        if (!user || user === undefined || user == null) {
            res.status(400);
            throw new Error("Invalid user")
        }
        const provider = new ethers.JsonRpcProvider(testNetRPC)
        const signer = new ethers.Wallet(pvtAddress, provider)
        console.log(signer)
        const tx = await signer.sendTransaction({ to: address, value: amountToSend });
        if (tx) {
            const hash = tx.hash;
            const trx = await transactionModel.create({ userId, transactionType, asset, amount, hash })


            res.status(200).json({ status: true, details: { from: publicAddress, to: address, tx: tx }, })

        }


    }
    catch (error) {

        res.status(404).json({ status: true, details: `My balance ${error}` })

    }
}

const getTransactionHistory = async (req, res) => {


    try {
        const history = await transactionModel.find({});
        console.log(history);
        res.status(200).json({ status: true, details: history });


    } catch (error) {
        res.status(400);
        throw new Error(error)

    }
}

const getSingleUserTransactionHistory = async (req, res) => {
    const userId = req.user.id;
    if (!userId || userId === undefined || userId == null) {
        res.status(400);
        throw new Error(error);
    }
    try {
        const history = await transactionModel.find({
            userId: userId
        })
        console.log(history);
        res.status(200).json({ status: true, details: history })


    } catch (error) {
        res.status(400).json({ status: false, details: `${error.message}` });

    }
}


let polygonABI =
    [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "setParent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "sig", "type": "bytes" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "transferWithSig", "outputs": [{ "internalType": "address", "name": "from", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "deposit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_childChain", "type": "address" }, { "internalType": "address", "name": "_token", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "parent", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "currentSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "ecrecovery", "outputs": [{ "internalType": "address", "name": "result", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "networkId", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_TOKEN_TRANSFER_ORDER_SCHEMA_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "disabledHashes", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "tokenIdOrAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }], "name": "getTokenTransferOrderHash", "outputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "CHAINID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_DOMAIN_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_DOMAIN_SCHEMA_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input2", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output2", "type": "uint256" }], "name": "LogTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input2", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output2", "type": "uint256" }], "name": "LogFeeTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]


module.exports = { getBalance, sendToken, getTransactionHistory, getSingleUserTransactionHistory, depositINR, withdrawINR, convertINR2Crypto }
