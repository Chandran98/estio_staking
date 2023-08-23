const {node,node2,createBTCWallet}= require("../controller/coinController")
const  express = require('express');


const router = express.Router();







router.route("/node").post(node);
router.route("/xrp").post(node2);
router.route("/createBTCWallet").post(createBTCWallet);


module.exports = router;