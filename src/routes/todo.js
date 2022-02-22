const express = require('express');
const router = express.Router()
const todoModel = require('../models/todo') 

// get all TODOs
router.get('/', async(req, res) => {    
  try {
    const allTODOs = await todoModel.find();
    res.json(allTODOs)

  } catch(err) {
    res.status(500).json({message: err.message})
  }  
})

// get 1 TODO
router.get('/:id', async(req, res) => {    
  try {
    const todo = await todoModel.findById(req.params.id)
    if (!todo) return res.sendStatus(404);
    res.status(200).json(todo)
  } catch (err) {
    err.name === 'CastError' ? res.sendStatus(404) : res.status(500).json({ message: err.message});
  }
})

// create TODO
router.post('/', async(req, res) => {    
  try {
    const newTODO = new todoModel({ todo: req.body.todo })
    const todo = await newTODO.save();
    res.status(201).json(todo)
  } catch (err) {
    res.status(400).json({message: err.message})
    
  }
})

// update TODO

router.patch('/:id', async(req, res) => {    
  try {
    const user = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
      })
      if (!user) return res.sendStatus(404);
     res.status(200).json(user)

  } catch (err) {
    res.status(400).json({message:err.message})
  }
}) 

// delete TODO
router.delete('/:id', async(req, res) => {    
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);
    if (!todo) return res.sendStatus(404);
    res.status(200).json({todo, message: 'todo deleted'});
   } catch (err) {
    err.name === 'CastError' ? res.sendStatus(404) : res.status(500).json({ message: err.message});
   }
})


module.exports = router