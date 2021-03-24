const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const ContactUs=mongoose.model("ContactUs");
// const router=require('./Authentication')


router.post('/contactus',async(req,res)=>{
    const {name,email,mobile,message}=req.body;
    if(!name || !email || !mobile || !message)
        return res.status(422).json({error:"Please add all the fields!"});
        const contactUs=new ContactUs({name,email,mobile,message});
        contactUs.save()
            .then((message)=>{
                console.log(message);
                res.json({message:message})})
            .catch((err)=>{console.log(err)});
})
module.exports=router;