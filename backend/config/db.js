const mongoose = require ('mongoose')
const express= require ('express')

async function dbConnect(){
    try{
        await mongoose.connect("");
    }
    catch(err){
        console.log(err);
    }
}
module.exports = dbConnect;