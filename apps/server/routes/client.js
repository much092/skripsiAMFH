const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Client= mongoose.model('Client');


router.post('/send-data-client',async (req,res)=>{
    const {nama,telp,alamat,perusahaan}=req.body;
    //res.send("tes")
    try{

        const client = new Client({nama,telp,alamat,perusahaan});
        await client.save();
        res.send({nama: client.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataClient',async (req,res)=>{
    //const {nama,telp}=req.body;
    const client = await Client.find()
    try{
      //  console.log(u)
      res.send(client)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


module.exports=router