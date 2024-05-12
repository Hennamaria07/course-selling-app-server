import mongoose from "mongoose";

export const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then((res) => console.log(`DATABASE IS SUCCESSFULLY CONNECTED WITH ${res.connection.host}`))
    .catch((err) => {
        console.log(`DATABASE CONNECTION ERROR---> ${err.message}`);
        process.exit(1);
    })
}