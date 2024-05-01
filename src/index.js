const app = require("./app");
const dbConnect = require("./dbConfig");
require('dotenv').config({path: "./.env"});

dbConnect();
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})