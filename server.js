const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const connetDb = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const socket = require('socket.io');
const errorHandler = require("./middleware/error")


connetDb();
const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
    res.status(200).json({ status: 'true', message: "api is working properly" })
})

app.use("/api/v0/auth", require("./routers/authRouter"));
app.use("/api/v0/users", require("./routers/userRouter"));
app.use("/api/v0/stake", require("./routers/stakeRouter"));
app.use("/api/v0/transaction", require("./routers/transactionRouter"));

app.all("*", (req, res) => {
    res.status(404).json({ status: 'false', message: "route not found" });
})

app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server on ${process.env.PORT} `)
})

