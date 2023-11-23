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
    color:String,
    picture: String,
  });

const AnimalModel = mongoose.model('Animal', animalSchema);

router.get('/animals/color/:color', async(req,res)=>{
    const {color} = req.params;
    const animals = await  AnimalModel.find({ color:color})
    res.json({success: true,
        animals
    })
})
router.patch('/animals',async(req,res)=>
{
    const {_id,picture,name,color,age} =  req.body;
    const foundAnimal = await AnimalModel.findById(_id);
    if(foundAnimal)
    {
        foundAnimal.picture = picture;
        foundAnimal.save()
        res.json({success:true,foundAnimal})
    }
    else
    {
        res.status(404).json({
            success: false,
            message:"Animal Not found"
        })
    }



})
router.post('/animals',(req,res)=>
{
    const {name,age,color,picture} =  req.body; // json 
    const animalCreated =  new AnimalModel({age:age, color: color, name,picture})
    animalCreated.save();
    res.json({
        success: true,
        animalCreated
    })
})
router.get('/animals',async(req,res)=>{
    const animals  = await AnimalModel.find(); // returns all the animals 
    res.json({
        success: true,
        animals
    })
})
router.delete('/animals/:id',async(req,res)=>{
    const {id} = req.params;
    const deletedData  = await AnimalModel.findByIdAndDelete(id); // returns all the animals 
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
