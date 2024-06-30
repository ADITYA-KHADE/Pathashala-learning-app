const mongoose=require('mongoose');

const fileschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mimetype:{
        type:String,
        required:true,
        default:'application/pdf',
    },
    size:{
        type:Number,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    sender:{
        type:String,
        required:true,
    },
    senderid:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false,
    },
    checkedby:{
        type:String,
        default:""
    },
    checkedbyid:{
        type:String,
        default:""
    },
    marks:{
        type:Number,
        default:0,
    }
},{
    timestamps: true,
});

const filemodel=mongoose.model('File',fileschema);

module.exports=filemodel;