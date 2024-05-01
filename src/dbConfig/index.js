const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then((res) => console.log(`DATABASE CONNECTED SUCCESSFULLY WITH ${res.connection.host}`))
    .catch((error) => console.log(`DATABASE CONNECTION ERROR----> ${error.message}`))
}

module.exports = dbConnect;