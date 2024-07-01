const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "student",
    },
    subject:{
        type: String,
        required:true,
        default: '',
    },
    totalpoints:{
        type: Number,
        default: 0,
    },
},{
    timestamps: true,
});

const UserModel = mongoose.model('User', UserModelSchema)

module.exports = UserModel