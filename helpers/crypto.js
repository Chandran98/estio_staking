

"use strict";

const { ethers, utils, BigNumber } = require("ethers");
const CryptoJS = require("crypto-js");

let key = CryptoJS.SHA256("#AyIruSmKYtAdrEEK845845JGJk854284457#");
let iv = CryptoJS.SHA256("#AyIruSmKYdfgdgtAdrEEEncDddfdgfgdfgdgdfgeciV#");
const validator = require('multicoin-address-validator');


// var key_data = "##DISGHDIYSGIYgidfi8ygo##",
//   iv_data = "##DISGHDIYSGIojfng##";
function aesEncrypt(content) {
    const parsedkey = CryptoJS.enc.Utf8.parse("secret_key");
    const iv = CryptoJS.enc.Utf8.parse("your_secret_iv");
    const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
}

function aesDecrypt(word) {
    var keys = CryptoJS.enc.Utf8.parse("secret_key");
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    var decrypt = CryptoJS.AES.decrypt(src, keys, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

//////////////////////////////////////////////////////////////////

function encrypt(value) {
    let cipher = CryptoJS.AES.encrypt(value, key, { iv: iv }).toString();
    return cipher;
}

//////////////////////////////////////////////////////////////////

function _decrypt(data) {
    // var decoURL, bytes;
    // decoURL = decodeURIComponent(data);
    let bytes = CryptoJS.AES.decrypt(data, key, { iv: iv }).toString(
        CryptoJS.enc.Utf8
    );
    return bytes;
}


const getBalance = async (contractAddress, abi, provider, userAddress) => {

    const address = new ethers.Contract(contractAddress, abi, provider)
    console.log(address);
    const data = await address.balanceOf(userAddress);
    const decimals = await address.decimals();
    const name = await address.symbol();
    const da = ethers.formatUnits(data, decimals);
    console.log(`sdafsaf${da}`);
    return { da, name };
}


module.exports = {
    getBalance,
    aesEncrypt: aesEncrypt,
    aesDecrypt: aesDecrypt,
    _decrypt: _decrypt,
    encrypt: encrypt,
};



