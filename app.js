const express =require('express');
const app=express();
const mongoose=require('mongoose');
const {database}=require('./Config/Keys');
mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("connected to MOngodb")})
    .catch((err)=>{console.log("Error to Connect MOngodb"+err)});

app.get('/',(req,res)=>{
    res.send("Hello World!");
});
const PORT=process.env.PORT || 4000;
app.listen(PORT,console.log(`App is running on PORT:${PORT}`))