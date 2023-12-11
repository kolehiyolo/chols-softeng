const router = require('express').Router();
const Task = require('../models/task.model.js');

// * Get all Tasks
router.route('/').get(
  (req, res) => {
    console.log('GET /tasks/')
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Add one new Task
router.route('/add').post(
  (req, res) => {
    const name = req.body.name;
    const start = Date.parse(req.body.date);
    const due = Date.parse(req.body.date);
    const done = req.body.done;
    const owner = req.body.owner;
    const project = req.body.project;
    const priority = req.body.priority;
    const description = req.body.description;

    const newTask = new Task(
      {
        name,
        start,
        due,
        done,
        owner,
        project,
        priority,
        description
      }
    );

    console.log(newTask)

    newTask.save()
      .then(() => res.json('Task added!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Get one Task by ID
router.route('/:id').get(
  (req,res) => {
    console.log('GET /tasks/'+req.params.id);
    Task.findById(req.params.id)
      .then(task => {
        console.log(res)
        res.json(task)
      })
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Delete one Task by ID
router.route('/:id').delete(
  (req,res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Update one Task by ID
router.route('/update/:id').post(
  (req, res) => {
    Task.findById(req.params.id)
      .then(
        task => {
          task.name = req.body.name;
          task.start = Date.parse(req.body.date);
          task.due = Date.parse(req.body.date);
          task.done = req.body.done;
          task.owner = req.body.owner;
          task.project = req.body.project;
          task.priority = req.body.priority;
          task.description = req.body.description;

          task.save()
            .then(() => res.json('Task updated!'))
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
      )
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

module.exports = router;