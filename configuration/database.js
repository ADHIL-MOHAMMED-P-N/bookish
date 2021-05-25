const mongoose = require("mongoose");

const connnectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(
            `mongodb is connected,  hostname : ${connection.connection.host}`
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
module.exports = connnectDB;