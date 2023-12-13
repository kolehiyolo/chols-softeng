// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import CardProjectVertical from './card-project-vertical.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-projects.component.scss';

export default function PageProjects() {
  console.log('MOUNT PageProjects()');
  const [projects, setProjects] = useState([]);

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchProjects();
    },
    []
  );

  // * This fetches all Projects from DB
  function fetchProjects() {
    console.log(`RUN PageProjects -> fetchProjects()`); 
    axios.get('http://localhost:5000/projects')
      .then(
        res => {
          const projects = res.data;
          console.log(` - Success! ${projects.length} projects found`);
          console.log(`\n`);
          setProjects(projects);
        }
      )
  };

  // * When "Add New" is clicked
  function onAddNewClick() {
    console.log(`RUN PageProjects -> onAddNewClick()`); 
  };

  // * 
  function generateProjectVertical(projectData) {
    return (
      <CardProjectVertical 
        projectData={projectData}
        key={projectData._id}  
      />
    )
  }

  // * Render
  return (
    <div className='page-projects'>
      <div className='head'>
        <h3>Projects</h3>
        <button 
          className="btn btn-primary"
          onClick={
            () => {
              onAddNewClick();
            }
          }
          >
          Add New
        </button>
      </div>
      <div className='body'>
        {
          projects.map(generateProjectVertical)
        }
      </div>
    </div>
  );
}