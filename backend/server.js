const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");

const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000;

const connectdb =require("./config/connectdb");
connectdb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/file', require('./routes/fileRoute'));

app.listen(PORT, () => {
    console.log(`Server is Listening on http://localhost:${PORT}`)
})