const express = require('express')

const dbConnect= require('/config/db');

const app=express();
app.use(express.json());

async function server(){
    try{
        await dbConnect();
        console.log("connected to db");
        app.listen(3000,()=>{
            res.json("listening on port 3000")
        })

    }
    catch(err){
        console.err("failed to connect to server",err);
    }
}
module.exports={server};