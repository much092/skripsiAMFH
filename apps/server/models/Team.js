const mongoose=require('mongoose');

const teamSchema = new mongoose.Schema({
    
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    }
})



mongoose.model('Team',teamSchema);