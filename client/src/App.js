import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import ListProjects from "./components/list-projects.component.js";
// import ListTasks from "./components/list-tasks.component.js";
// import ListUsers from "./components/list-users.component.js";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
      <Routes>
        <Route path="/" exact element={<ListProjects />} />
        {/* <Route path="/tasks" exact element={<ListTasks />} /> */}
        {/* <Route path="/users" exact element={<ListUsers />} /> */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;