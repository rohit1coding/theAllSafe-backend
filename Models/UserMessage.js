const mongoose=require('mongoose')
const clientSchema=mongoose.Schema({
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
    country:{
        type:String,
        required:true
    },
    interest:{type:String},
    findus:{type:String},
    getstarted:{type:String},
    message:{type:String},
    docs:{type:String}
});
mongoose.model("UserMessage",clientSchema);