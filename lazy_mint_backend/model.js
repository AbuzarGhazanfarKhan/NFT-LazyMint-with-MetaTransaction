const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
    Signature: {
        type: String,
        required: true,
    },
    Executed: {
        type: Boolean,
        default: false,
    },
    Name:{
        type:String,
        required:true,
        unique:true
    }
    
}, {timestamps: true});

module.exports = mongoose.model("Signature", SignatureSchema);