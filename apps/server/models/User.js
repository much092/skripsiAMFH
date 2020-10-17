const mongoose=require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    nama:{
        type:String,
        required:false
    },
    ktp:{
        type:String,
        required:false
    },
    telp:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    }
})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}

mongoose.model('User',userSchema);