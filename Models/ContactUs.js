const mongoose=require('mongoose')
const ContactUs=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
mongoose.model("ContactUs",ContactUs);