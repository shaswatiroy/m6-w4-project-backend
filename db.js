const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then((connection)=> {
        console.log("Connected to MongoDB successfully:", connection.connection.name, "at", connection.connection.host, "on port", connection.connection.port);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToMongo;