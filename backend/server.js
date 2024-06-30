const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const path = require('path');
const checkToken=require('./middleware/checkToken')

const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000;

const connectdb =require("./config/connectdb");
connectdb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",async(req,res)=>{
    res.send("Welcome to my server")
})

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/file',checkToken, require('./routes/fileRoute'));

app.listen(PORT, () => {
    console.log(`Server is Listening on http://localhost:${PORT}`)
})