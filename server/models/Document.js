const mongoose=require('mongoose');

const documentSchema = new mongoose.Schema({
    
    fileName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    }
})


mongoose.model('Document',documentSchema);