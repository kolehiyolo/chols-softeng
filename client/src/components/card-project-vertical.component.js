// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import CardProjectInfo from './section-project-info.component.js';
import CardProjectTasks from './section-project-tasks.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './card-project-vertical.component.scss';

export default function CardProjectVertical(props) {
  console.log('MOUNT CardProjectVertical()');
  // const [projects, setProjects] = useState([]);

  // * Render
  return (
    <div 
      className='card card-project-vertical'
      id={'card-project-vertical-'+props.projectData._id}
    >
      <CardProjectInfo 
        projectData={props.projectData}
      />
      {/* <CardProjectTasks 
        projectData={props.projectData}
      /> */}
      {/* <div className='head'>
        <h3>Projects</h3>
        <button 
          className="btn btn-primary"
          onClick={
            () => {
            }
          }
          >
          Add New
        </button>
      </div>
      <div className='body'>
        {
          projects.map(generateProject)
        }
      </div> */}
    </div>
  );
}