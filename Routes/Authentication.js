const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Client=mongoose.model("Client");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require("../Config/Keys");
const RequireLogin=require("../Middleware/RequireLogin");
router.get('/',RequireLogin,(req,res)=>{
    res.send("Hello World!");
});
// Client Registration
router.post('/client/signup',async(req,res)=>{
    const {name,email,mobile,password}=req.body;
    if(!name || !mobile || !password)
        return res.status(422).json({error:"Please add the the fields!"});
    Client.findOne({mobile:mobile})
        .then((clientExists)=>{
            if(clientExists){
                return res.status(422).json({error:"mobile already exists!"}); 
            }
            bcrypt.hash(password,12)
                .then((hashedPassword)=>{
                    const client=new Client({name,email,mobile,password:hashedPassword});
                    client.save()
                        .then((client)=>{
                            res.json({message:"SignUp Successfully!"});
                            console.log(client);
                        }) 
                        .catch((err)=>{console.log(err)});
                    }) 
                .catch((err)=>{console.log(err)});
                })
            
        .catch((err)=>{console.log(err)});

})
// Client Login
router.post('/client/login',(req,res)=>{
    const {mobile,password}=req.body;
    if(!mobile || !password){
        return res.status(422).json({error:"Please add mobile number and password!"});
    }
    Client.findOne({mobile:mobile})
        .then((clientExists)=>{
            if(!clientExists){
                return res.status(422).json({error:"Incorrect mobile number or password!"});
            }
            bcrypt.compare(password,clientExists.password)
                .then((passwordMatch)=>{
                    if(!passwordMatch){
                        return res.status(422).json({error:"Incorrect mobile number or password!"});
                    }
                    const token=jwt.sign({_id:clientExists._id},JWT_SECRET)
                    res.json({token});
                    console.log(clientExists);
                })
                .catch((err)=>{console.log(err)});
        })
        .catch((err)=>{console.log(err)});

})

module.exports=router;