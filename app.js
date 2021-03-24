const express =require('express');
const app=express();
const mongoose=require('mongoose');
const {database}=require('./Config/Keys');

// Mongoose Schemas
require('./Models/Client');
require('./Models/UserMessage');
require('./Models/ContactUs');

app.use(express.json());
app.use(require('./Routes/Authentication'))
app.use(require('./Routes/SendMessage'))
app.use(require('./Routes/ContactUs'))

mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("connected to MOngodb")})
    .catch((err)=>{console.log("Error to Connect MOngodb"+err)});

const PORT=process.env.PORT || 4000;
app.listen(PORT,console.log(`App is running on PORT:${PORT}`))