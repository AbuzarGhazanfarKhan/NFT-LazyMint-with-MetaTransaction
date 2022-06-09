const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.bgvdz.mongodb.net/?retryWrites=true&w=majority";

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};
