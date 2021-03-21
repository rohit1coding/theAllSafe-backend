const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../Config/Keys');
const mongoose=require('mongoose');
const Client=mongoose.model("Client");
module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"You have to logged In!"})
    } 
    const token =authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You have to logged In!"});
        }
        const{_id}=payload;
        Client.findById(_id)
            .then(clientExists=>{
                req.client=clientExists;
            })
            .catch((err)=>{console.log(err)});
        next();
    })
}