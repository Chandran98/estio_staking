
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const connectDb = await mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,
            useUnifiedTopology: true,
           });
        // console.log(connectDb.connection.host, connectDb.connection.name);
        console.log(`${connectDb.connection.name} DB `)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

module.exports = connectDB;