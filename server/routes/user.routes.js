const router = require('express').Router();
const User = require('../models/user.model.js');

// * Get all Users
router.route('/').get(
  (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Add one new User
router.route('/add').post(
  (req, res) => {
    const name = {
      first: req.body.name_first,
      middle: req.body.name_middle,
      last: req.body.name_last
    };
    const main_role = req.body.main_role;
    const profile_picture = req.body.profile_picture;
    const user_name = req.body.user_name;
    const password = req.body.password;
    const email = req.body.email;

    // TODO
    const projects = req.body.projects;
    const tasks = req.body.tasks;

    const newUser = new User(
      {
        name,
        main_role,
        projects,
        tasks,
        profile_picture,
        user_name,
        password,
        email
      }
    );

    console.log(newUser)

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Get one User by ID
router.route('/:id').get(
  (req,res) => {
    console.log('GET /users/'+req.params.id);
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Delete one User by ID
router.route('/:id').delete(
  (req,res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

// * Update one User by ID
router.route('/update/:id').post(
  (req, res) => {
    User.findById(req.params.id)
      .then(
        user => {
          user.name = {
            first: req.body.name_first,
            middle: req.body.name_middle,
            last: req.body.name_last
          };
          user.main_role = req.body.main_role;
          user.profile_picture = req.body.profile_picture;
          user.user_name = req.body.user_name;
          user.password = req.body.password;
          user.email = req.body.email;
      
          // TODO
          user.projects = req.body.projects;
          user.tasks = req.body.tasks;

          user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
      )
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
);

module.exports = router;