const transactionModel = require("../models/transcationModel");
const User = require("../models/userModel");

const crypto = require("../helpers/crypto");
const asyncHandler = require("express-async-handler");

// const polygonABI = require("../utils/polygonABI")
const { ethers, utils, BigNumber } = require("ethers");



const deposit = async (req, res) => {
    console.log(req.body);
}
const withdraw = async (req, res) => {
    console.log(req.body);
}


const getBalance = async (req, res) => {
    const address = req.body.address;

    // const addres1s = "0x09385a960a2e0b6b4516d3ds41534da92cb2a50085"
    try {
        const polAddress = "0x0000000000000000000000000000000000001010"
        const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/")

        const getAddress = new ethers.Contract(polAddress, polygonABI, provider)

        const balance = await getAddress.balanceOf(address);
        const bal = ethers.formatEther(balance)

        res.status(200).json({ status: true, details: `My balance ${bal}` })
    } catch (error) {


        res.status(404).json({ status: true, details: `My balance ${error}` })
    }
}

const sendToken = async (req, res) => {
    const userId = req.user.id;
    const { address, amount } = req.body;

    console.log(userId);
    console.log("dsfa");
    const amountToSend = ethers.parseUnits("100", 18);
    console.log("dsfassa");
    try {

        const user = await User.findById({ _id: userId });
        console.log("dsfa");
        const pvtAddress= crypto._decrypt(user.privateAddress)
        console.log("dsfa");
        console.log(`Private Address ${pvtAddress}`);

        if (!user || user === undefined || user == null) {
            res.status(400);
            throw new Error("Invalid user")
        }
        const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/")
        const signer = new ethers.Wallet(user.privateAddress, provider)

        const tx = await signer.sendTransaction({ to: address, value: amountToSend });
        console.log(tx);

        res.status(200).json({ status: true, details: `${tx}` })
    }
    catch (error) {

        res.status(404).json({ status: true, details: `My balance ${error}` })
    
    }
}


let polygonABI =
    [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "setParent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "sig", "type": "bytes" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "transferWithSig", "outputs": [{ "internalType": "address", "name": "from", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "deposit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_childChain", "type": "address" }, { "internalType": "address", "name": "_token", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "parent", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "currentSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "ecrecovery", "outputs": [{ "internalType": "address", "name": "result", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "networkId", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_TOKEN_TRANSFER_ORDER_SCHEMA_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "disabledHashes", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "tokenIdOrAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "data", "type": "bytes32" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }], "name": "getTokenTransferOrderHash", "outputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "CHAINID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_DOMAIN_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_DOMAIN_SCHEMA_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input2", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output2", "type": "uint256" }], "name": "LogTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "input2", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output1", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "output2", "type": "uint256" }], "name": "LogFeeTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]


module.exports = { deposit, withdraw, getBalance, sendToken }
