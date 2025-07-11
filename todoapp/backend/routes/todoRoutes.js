const express = require('express')
const router = express.Router()
const Todo = require('../models/ToDo')

router.get('/', async(req, res)=>{
    try{
        const todos = await Todo.find()
        res.json(todos)
    }
    catch(err){
        res.status(500).json({error:"Unable to get todos"})
    }
})

router.post('/', async(req,res)=>
{
    const {title} = req.body;
    if(!title)
    {
        return res.status(400).json({error:"Title is required"})

    }
    try{
        const newTodo = new Todo({title});
        const savedTodo = await newTodo.save()
        res.status(201).json(savedTodo)

    }
    catch(err)
    {
        res.status(500).json({error:"Unable to save"})
    }
})
router.put('/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // returns updated document
      );
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;