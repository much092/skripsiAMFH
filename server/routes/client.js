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

router.get('/getDataClientById/:id',async (req,res)=>{
    //const {nama,telp}=req.body;
    const client = await Client.findOne({_id:req.params.id})
    try{
      //  console.log(u)
      res.send(client)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/deleteClient/:id',async (req,res)=>{
    
    const client = await Client.findOneAndRemove({_id:req.params.id})
    try{
      res.send({message:'Data berhasil dihapus'})
    }catch(err){
        return res.status(422).send({error:err})
    }

})

router.post('/updateClient/:id',async (req,res)=>{
    const {_id,nama,telp,alamat,perusahaan}=req.body;
    const client = await Client.findByIdAndUpdate(_id,{nama:nama,telp:telp,alamat:alamat,perusahaan:perusahaan})
    try{
      res.send(client)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


module.exports=router