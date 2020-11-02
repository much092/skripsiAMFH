const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Tool= mongoose.model('Tool');

router.post('/send-data-alat',async (req,res)=>{
    const {nama,jml,idproject,deskripsi,status}=req.body;
    //res.send("tes")
    try{

        const tool = new Tool({nama,jml,idproject,deskripsi,status});
        await tool.save();
        res.send(tool)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataAlat',async (req,res)=>{
    
    const tool = await Tool.find()
    try{
        console.log(tool)
      res.send(tool)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router