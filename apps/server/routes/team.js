const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Team= mongoose.model('Team');
const id ='';

router.post('/send-data-team',async (req,res)=>{
    const {iduser,idproject}=req.body;
    //res.send("tes")
    Team.count({'idproject': idproject,'iduser':iduser}, async function (err, count){
        if(count>0){
            res.send({error:"Data sudah ada"})
        }
        else{
            try{

                const team = new Team({iduser,idproject});
                await team.save();
                res.send(team)
            }
            catch(err){
                const error = err.message;
                console.log(error)
                return res.send({error : err.message})
                //return res.status(422).send("Error : "+err.message)
            }
        }
    })
    
})

router.get('/getDataTeam/:id',async (req,res)=>{
    
    const team = await Team.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },{
                                            $unwind: "$user"
                                        },{
                                            $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          }
                                    ]
                                    );
    try{
        console.log(team)
      res.send(team)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.post('/getDataProjectByIdP',async (req,res)=>{
    const {iduser}=req.body;
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
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(iduser)]}}
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