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
    const startingdate = req.body.startingdate;
    const endingdate = req.body.endingdate;
  
    const newtask = new Task({
        name,
        description,
        priority,
        validation,
        startingdate,
        endingdate,
        });
        newtask.validation= false;

        if(req.body.startingdate < req.body.endingdate)
    {
    newtask.save()
      .then(() => res.json('task added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }else{
    
      res.json('starting date must be earlier than ending date !');
    
  }
}
  );
  
  router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/deleteall').delete((req, res) => {
    Task.deleteMany({})
      .then((tasks => res.json(tasks)))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/changepir/:id').post((req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.priority = req.body.priority;        
        task.save()
          .then(() => res.json('task priority updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.name = req.body.name;
        task.description = req.body.description;
        task.priority = req.body.priority;
        task.validation = req.body.validation;
        task.startingdate = req.body.startingdate;
        task.endingdate = req.body.endingdate;


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