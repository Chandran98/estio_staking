const asyncHandler = require("express-async-handler");
const { getBalance } = require("../helpers/crypto")
const { ethers, utils, BigNumber } = require("ethers");
const arbRpc = "https://arb-mainnet.g.alchemy.com/v2/9tb00M7M0DowCxiyLeWHKeyoPvFIs3c_";
const ethRPC = "https://eth-mainnet.g.alchemy.com/v2/MofBdtWIKY6Wm6s0dTlTmjz0rOdzREkf";
const bnbRpc = "https://bsc-dataseed.binance.org/";
const kaitRPC = "https://polygon-rpc.com/"
const kairaaRpc = "https://kairaachain.com/";
const arbContract = "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1"
const trxErc20 = "0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5"
const kait = "0x1F52BfDa68375f84Ea3BbeF3B0450AF6853EDcF6"
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
const RippleAPI = require('ripple-lib').RippleAPI;
const Web3 = require("web3");
const axios = require("axios");
const bitcore = require('bitcore-lib');
const validator = require('multicoin-address-validator');


const node = async (req, res) => {
    console.log("Node");
    const provider = new ethers.JsonRpcProvider(bnbRpc)

    //     const ethProvider = new ethers.EtherscanProvider();
    // const his = provider.getHistory("0x388C818CA8B9251b393131C08a736A67ccB19297")
    // console.log(`History Data ${his}`)
    // const provider =new ethers
    const address = new ethers.Contract(WBNB, bnbabi, provider)
    console.log(address);
    let userdata = "0xa4Dc3DA527F8bF5e3908f3C5895c311FC2eD41b3";
    const data = await address.balanceOf(userdata);
    const decimals = await address.decimals();
    const name = await address.symbol();
    const da = ethers.formatUnits(data, decimals)
    console.log(` Balance ${da} ${name} `);
    // const history = await provider.getTransaction("0x37b86887daf07970876cc816f21f98b9edd27d05407b360fc8d18da0a46be1c3");
    // console.log(`history${history.from}`)
    const sd = await provider.getBalance("0xa4Dc3DA527F8bF5e3908f3C5895c311FC2eD41b3");
    const bal = ethers.formatUnits(sd);
    console.log(bal)
    res.status(200).json({ message: bal.toString() })


}


const node2 = async (req, res) => {
    const { contractAddress, network, userAddress } = req.body;
    const isValid = validator.validate(userAddress, network);

    if (!isValid) return res.status(404).json({ message: "Invalid address" })
    console.log("sddsd");

    if (network === "erc") {

        const provider = new ethers.JsonRpcProvider(ethRPC)
        url =
            `http://api.etherscan.io/api?module=contract&action=getabi&address=` +
            contractAddress +
            `&format=raw`;

        let resData = await axios.get(url);
        const bal = await getBalance(contractAddress, resData.data, provider, userAddress)
        console.log(bal.da);
        res.status(200).json({ balance: bal.da, symbol: bal.name });

    } else if (network === "bnb") {
        const provider = new ethers.JsonRpcProvider(bnbRpc)
        url =
            `https://api.bscscan.com/api?module=contract&action=getabi&address=` + contractAddress;


        let resData = await axios.get(url);
        const bal = await getBalance(contractAddress, resData.data.result, provider, userAddress)
        console.log(bal.da);
        res.status(200).json({ balance: bal.da, symbol: bal.name });
    } else {
        res.status(200).json({ message: "trx" });
    }


}

const createBTCWallet = async (req, res) => {

    const privateKey = new bitcore.PrivateKey();
    const address = privateKey.toAddress();

    console.log('BTC Address:', address.toString());
    console.log('Private Key:', privateKey.toString());
    res.status(200).json({ public: address, privateKey: privateKey });

}


// const api = new RippleAPI();
// const api = new RippleAPI({
//     server: 'wss://s1.ripple.com' // Use a public server or your own server
//   });
// const xrp= async(req,res)=>{
//     console.log("xrp");


//     // // Generate a new XRP key pair
//     // const keyPair = keypairs.generateSeed();

//     // // Extract the address and secret key from the key pair
//     // const address = keypairs.deriveAddress(keyPair.seed);
//     // const secretKey = keyPair.seed;

//     // console.log('XRP Address:', address);
//     // console.log('Secret Key:', secretKey);


//     // try {
//     //     await api.connect();

//     //     // Generate a new XRP wallet (address and secret key)
//     //     const wallet = api.generateAddress();

//     //     console.log('XRP Address:', wallet.address);
//     //     console.log('Secret Key:', wallet.secret);
//     //   } catch (error) {
//     //     console.error('Error generating wallet:', error);
//     //   } 

// }



module.exports = { node, node2, createBTCWallet };