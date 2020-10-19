const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Material= mongoose.model('Material');

router.post('/send-data-material',async (req,res)=>{
    const {nama,jml,idproject,deskripsi,status}=req.body;
    //res.send("tes")
    try{

        const material = new Material({nama,jml,idproject,deskripsi,status});
        await material.save();
        res.send(material)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataMaterial',async (req,res)=>{
    
    const material = await Material.find()
    try{
        console.log(material)
      res.send(material)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router