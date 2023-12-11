const router = require('express').Router();
const Project = require('../models/project.model.js');

// * Get all Projects
router.route('/').get(
  (req, res) => {
    Project.find()
      .then(projects => res.json(projects))
      .catch(err => {
        console.log("Can't fetch all Projects")
        res.status(400).json(`Error: ${err}`)
      });
  }
);

// * Add one new Project
router.route('/add').post(
  (req, res) => {
    const name = req.body.username;
    const description = req.body.description;
    const priority = req.body.description;
    const done = req.body.description;
    const start = Date.parse(req.body.date);
    const due = Date.parse(req.body.date);
    // TODO
    const members = req.body.members;
    // TODO
    const tasks = req.body.tasks;

    const newProject = new Project(
      {
        name,
        description,
        priority,
        done,
        start,
        due,
        members,
        tasks
      }
    );

    console.log(newProject)

    newProject.save()
      .then(() => res.json('Project added!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Get one Project by ID
router.route('/:id').get(
  (req,res) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Delete one Project by ID
router.route('/:id').delete(
  (req,res) => {
    Project.findByIdAndDelete(req.params.id)
      .then(() => res.json('Project deleted.'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Update one Project by ID
// TODO
router.route('/update/:id').post(
  (req, res) => {
    Project.findById(req.params.id)
      .then(
        project => {
          project.name = req.body.username;
          project.description = req.body.description;
          project.priority = req.body.description;
          project.done = req.body.description;
          project.start = Date.parse(req.body.date);
          project.due = Date.parse(req.body.date);
          // TODO
          project.members = req.body.members;
          project.tasks = req.body.tasks;

          project.save()
            .then(() => res.json('Project updated!'))
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
      )
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

module.exports = router;