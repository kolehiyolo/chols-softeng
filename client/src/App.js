// import React, {useState, useEffect} from "react";
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import Projects from "./components/pages/page-projects.component.js";
import Project from "./components/pages/page-project.component.js";
import ProjectEdit from "./components/pages/page-project-edit.component.js";
import ProjectNew from "./components/pages/page-project-new.component.js";
// import ListTasks from "./components/list-tasks.component.js";
// import ListUsers from "./components/list-users.component.js";

// * Stylesheets
import './App.scss';

function App() {
  // const [currentUser, setCurrentUser] = useState('65773b179407d34564bd6ed9');
  const [currentUser] = useState('65773b179407d34564bd6ed9');

  return (
    <Router>
      <Navbar />
      <br />
      <div className="main-content">
      <Routes>
        <Route path="/" exact element={<Projects currentUser={currentUser}/>} />
        <Route path="/projects" exact element={<Projects currentUser={currentUser}/>} />
        <Route path="/project/:id" exact element={<Project currentUser={currentUser}/>} />
        <Route path="/project/edit/:id" exact element={<ProjectEdit currentUser={currentUser}/>} />
        <Route path="/projects/new" exact element={<ProjectNew currentUser={currentUser}/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;