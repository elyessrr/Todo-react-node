const router = require('express').Router();
let Task = require('../models/Task.model');


router.route('/').get((req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const priority = req.body.priority;
    const validation = req.body.validation;

    
  
    const newtask = new Task({
        name,
        description,
        priority,
        validation,
        });
        newtask.validation= false;
    newtask.save()
      .then(() => res.json('task added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/delete/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


  router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.username = req.body.username;
        task.description = req.body.description;
        
        task.save()
          .then(() => res.json('task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/validate/:id').post((req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.validation = true;        
        task.save()
          .then(() => res.json('task validated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  





  module.exports = router;