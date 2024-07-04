const mongoose= require("mongoose")


const code = new mongoose.Schema({
    otp:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
});


const Code = mongoose.model('code',code);

module.exports = Code;
