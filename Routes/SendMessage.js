const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const UserMessage=mongoose.model("UserMessage");
// const router=require('./Authentication')


router.post('/sendmessage',async(req,res)=>{
    const {name,email,mobile,country,interest,findus,getstarted,message,docs}=req.body;
    if(!name || !email || !mobile || !country)
        return res.status(422).json({error:"Please add all the fields!"});
        const userMessage=new UserMessage({name,email,mobile,country,interest,findus,getstarted,message,docs});
        userMessage.save()
            .then((message)=>{
                console.log(message);
                res.json({message:message});})
            .catch((err)=>{console.log(err)});
})
module.exports=router;