const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const {mongoUrl} = require('./keys')


require('./models/User');
require('./models/Client');
require('./models/Project');
require('./models/Pic');
require('./models/Material');
require('./models/Alat');
require('./models/Team');
require('./models/Module');
require('./models/Task');
require('./models/Document');
require('./models/FotoTask');
require('./models/Feedback');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
const pegawai = require('./routes/pegawai')
const client = require('./routes/client')
const project = require('./routes/project')
const pic = require('./routes/pic')
const material = require('./routes/material')
const alat = require('./routes/alat')
const team = require('./routes/team')
const modul = require('./routes/module')
const task = require('./routes/task')
const document = require('./routes/document')
const fototask = require('./routes/fototask')
const feedback = require('./routes/feedback')

app.use(bodyParser.json({limit:'50mb'}))
app.use(express.static('uploads'))
app.use(authRoutes)
app.use(pegawai)
app.use(client)
app.use(project)
app.use(pic)
app.use(material)
app.use(alat)
app.use(team)
app.use(modul)
app.use(task)
app.use(document)
app.use(fototask)
app.use(feedback)

mongoose.connect(mongoUrl)

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})

app.get('/',requireToken,(req,res)=>{
    res.send(req.user)
})

app.listen(PORT,()=>{
    console.log("server running"+PORT)
})