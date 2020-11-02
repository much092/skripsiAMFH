const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const User= mongoose.model('User');
const Client= mongoose.model('Client');
const Project= mongoose.model('Project');
var base64ToImage = require('base64-to-image');


router.post('/send-data-pegawai',async (req,res)=>{
    const {email,password,status,nama,ktp,telp}=req.body;
    //res.send("tes")
    try{

        const user = new User({email,password,status,nama,ktp,telp});
        await user.save();
        const token = jwt.sign({userId:user._id},jwtkey)
        res.send({nama: user.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})

router.get('/getDataPegawai',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({status:{$ne:'admin'}})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataDetailPegawai/:id',async (req,res)=>{
    
    const user = await User.findOne({_id:req.params.id})
    try{
      //  console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataPM',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({status:'pm'})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataPegawai2',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({status:{$nin:['admin','pm']}})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.post('/update-data-user',async (req,res)=>{
    const {_id,nama,email,ktp,telp,password,image}=req.body;
    //res.send("tes")
    console.log(req.body.fileData)
    if(req.body.fileData=='data:undefined;base64,'){
        var fileName= image;
    }
    else{
        var base64Str = req.body.fileData;
        var fileName = Date.now()+'_'+req.body.fileName;
        var type = req.body.type;
        var path ='uploads/';
        var optionalObj = {'fileName': fileName, 'type':type};
     
         base64ToImage(base64Str,path,optionalObj); 
    }
  
         
    try{
        if(password!= ''){
            const user = await User.findByIdAndUpdate(_id,{nama:nama,email:email,ktp:ktp,telp:telp,password:password,image:fileName})
            await user.save();
            res.send(user)
        }
        else{
            const user = await User.findByIdAndUpdate(_id,{nama:nama,email:email,ktp:ktp,telp:telp,image:fileName})
            await user.save();
            res.send(user)
        }
        
    }
    catch(err){
        console.log(err)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})


router.get('/getCount',async (req,res)=>{
 
    const user = await User.count({status:{$ne:'admin'}})
    const client = await Client.count()
    const project = await Project.count()
    
    try{
        console.log(user)
      res.send({pegawai:user,client:client,project:project})
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router