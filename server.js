const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const connetDb = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const socket = require('socket.io');
const errorHandler = require("./middleware/error");
// const { testCode } = require('./middleware/testMiddleware');
const encrypt = require("./helpers/crypto")

connetDb();
const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// U2FsdGVkX1%2FafzF7H8gcmmWnTnZj3uZ%2F6WDh2Ad3vLyGlUcbPZy55SEhgqvhwf%2B0E4a5mL%2FOONnLo3PgcXoKYw%3D%3D



app.get("/", (req, res) => {
    console.log("started");
    res.status(200).json({ status: 'true', message: "api is working properly" })
    console.log("api is working properly");
const jk= encrypt._decrypt("U2FsdGVkX1%2FafzF7H8gcmmWnTnZj3uZ%2F6WDh2Ad3vLyGlUcbPZy55SEhgqvhwf%2B0E4a5mL%2FOONnLo3PgcXoKYw%3D%3D");
    console.log(`sdafasf${jk}`)
})
app.get("/api/aws", (req, res) => {
    res.status(200).json({ status: 'true', message: "api is working properly" })
})

app.use("/api/v0/auth", require("./routers/authRouter"));
app.use("/api/v0/coin", require("./routers/coinRouter"));
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

