import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import Projects from "./components/page-projects.component.js";
// import Project from "./components/page-project.component.js";
// import ProjectEdit from "./components/page-project-edit.component.js";
// import ProjectNew from "./components/page-project-new.component.js";
// import ListTasks from "./components/list-tasks.component.js";
// import ListUsers from "./components/list-users.component.js";

function App() {
  const [currentUser, setCurrentUser] = useState('65773b179407d34564bd6ed9');

  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
      <Routes>
        <Route path="/" exact element={<Projects currentUser={currentUser}/>} />
        <Route path="/projects" exact element={<Projects currentUser={currentUser}/>} />
        {/* <Route path="/project/:id" render={(props) => <Project currentUser={currentUser} projectId={props.match.params.id} />} /> */}
        {/* <Route path="/project/edit/:id" render={(props) => <ProjectEdit currentUser={currentUser} projectId={props.match.params.id} />} /> */}
        {/* <Route path="/projects/new" exact element={<Projects currentUser={currentUser}/>} /> */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;