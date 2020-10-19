const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Project= mongoose.model('Project');
const Pic= mongoose.model('Pic');
const Team= mongoose.model('Team');
const id ='';

router.post('/send-data-project',async (req,res)=>{
    const {nama,tglMulai,tglSelesai,deskripsi,idclient}=req.body;
    //res.send("tes")
    try{

        const project = new Project({nama,tglMulai,tglSelesai,deskripsi,idclient});
        await project.save();
        res.send({nama: project.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataProject',async (req,res)=>{
    
    const project = await Project.find()
    try{
        console.log(project)
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

/////detail project pada halaman admin /////
router.get('/getDetailProject/:id',async (req,res)=>{
    const pic = await  Pic.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'projects', 
                                                localField: 'idproject', 
                                                foreignField: '_id', 
                                                as: 'project'
                                            }
                                        },{
                                            $unwind: "$user"
                                          },{
                                            $unwind: "$project"
                                          },{
                                            $match:{'project._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          }
                                    ]
                                    );
    
    try{
        console.log(pic)
        res.send(pic);
    }catch(err){
        return res.status(422).send(err.message)
    }

})

////detail project pada halaman pegawai/////
router.get('/getDetailProjectP/:id',async (req,res,next)=>{
    const team = await  Team.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'projects', 
                                                localField: 'idproject', 
                                                foreignField: '_id', 
                                                as: 'project'
                                            }
                                        },{
                                            $unwind: "$user"
                                          },{
                                            $unwind: "$project"
                                          },{
                                            $match:{'project._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          }
                                    ]
                                    );
    
    try{
        console.log(team)
        res.send(team);
    }catch(err){
        return res.status(422).send(err.message)
    }

})


module.exports=router