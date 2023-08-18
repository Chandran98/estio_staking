const {node,xrp}= require("../controller/coinController")
const  express = require('express');


const router = express.Router();







router.route("/node").post(node);
router.route("/xrp").post(xrp);


module.exports = router;