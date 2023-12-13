// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import CardProjectInfo from '../cards/card-project-info.component.js';
import CardProjectTasks from '../cards/card-project-tasks.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project.component.scss';

export default function PageProjectNew(props) {
  console.log('MOUNT PageProjectNew()');
  // const [projectData, setProjectData] = useState([]);
  // const [filterMode, setFilterMode] = useState('All Projects');

  // * Fetch Projects from DB on mount
  // useEffect(
  //   () =>{
  //     fetchProjectData();
  //   },
  //   []
  // );

  // * This fetches all Projects from DB
  // function fetchProjectData() {
  //   console.log(`RUN PageProject -> fetchProjectData()`); 
  //   axios.get('http://localhost:5000/projects/' + props.projectID)
  //     .then(
  //       res => {
  //         const project = res.data;
  //         console.log(` - Success! Project "${project.length}" found`);
  //         console.log(`\n`);
  //         setProjectData(project);
  //       }
  //     )
  // };

  function onBackClick() {
    window.location.href='/projects/';
  }

  // * Render
  return (
    <div 
      className='page-project'
      // id={'page-project-'+props.projectData._id}
    >
      <div className='head'>
        <div className='buttons'>
          <button 
            className="btn btn-primary"
            onClick={
              () => {
                onBackClick();
              }
            }
            >
            Back
          </button>
        </div>
        {/* <h3>projectData.name</h3> */}
      </div>
      <div className='body'>
        <h1>New Project</h1>
        {/* <CardProjectInfo 
          projectData={projectData}
        />
        <CardProjectTasks 
          projectData={projectData}
          currentUser={props.currentUser}
        /> */}
      </div>
    </div>

  );
}