const express = require("express");
const app = express();

require('dotenv').config();
const {readdirSync} = require("fs");
require("./DB/db")
app.use(express.json())
const PORT = process.env.PORT;
var cookieParser = require('cookie-parser')
app.use(cookieParser());



 readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


app.listen(PORT,()=>{
    console.log(`Server Run on ${PORT}`);
})



