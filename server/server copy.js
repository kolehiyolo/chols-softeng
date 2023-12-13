// * Core Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// * Fetching dotenv Data
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// * Initializing Express
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// * Register the bodyParser middleware
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

// * MongoDB Connection
const uri = 'mongodb://0.0.0.0:27017/connect_co';
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// * Routes
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// * Start Server
app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
  console.log(`\n`);
});
