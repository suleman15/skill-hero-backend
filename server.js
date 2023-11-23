const express = require('express')
const app = express();
const router = express.Router()
app.use(express.json()) // it helps you to read the data from the body

const mongoose = require('mongoose');
async function connectDatabase() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await mongoose.connect('mongodb+srv://admin:admin@project-cluster.ntsdu0a.mongodb.net/');
  }
connectDatabase().then((result)=>console.log(result)).catch(err => console.log(err));

const animalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color:String
  });

const Animal = mongoose.model('Animal', animalSchema);

router.post('/animals',(req,res)=>
{
    const {name,age,color} =  req.body; // json 
    const animalCreated =  new Animal({age:age, color: color, name})
    animalCreated.save();
    res.json({
        success: true,
        animalCreated
    })
})
router.get('/animals',async(req,res)=>{
    const animals  = await Animal.find(); // returns all the animals 
    res.json({
        success: true,
        animals
    })
})
router.delete('/animals/:id',async(req,res)=>{
    const {id} = req.params;
    const deletedData  = await Animal.findByIdAndDelete(id); // returns all the animals 
    res.json({
        success: true,
         deletedData
    })
})



router.all('/',(req,res)=>{
    res.json({
        success: true,
        message:"Animal Server is live 🐴 🐤 🐈"
    })
})
app.use(router)
const PORT =  5000
app.listen(PORT,()=>{
    console.log(`Animal Application Server is started on port ${PORT}`)
})
// const express.Router()
