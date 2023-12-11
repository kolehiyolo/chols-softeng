import React, {useState, useEffect} from "react";
import axios from 'axios';
import CardProject from './card-project.component.js';
// import CardTask from './card-task.component.js';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(
    () => {
      fetchProjects();
    },
    []
  );

  function fetchProjects() {
    console.log(`fetchProjects()`); 
    axios.get('http://localhost:5000/projects')
      .then(
        res => {
          console.log('FETCHED DATA')
          setProjects(res.data)
        }
      )
      .catch(
        // err => res.status(400).json(`Error: ${err}`)
      );
  };

  // function deleteProject(id) {
  //   axios.delete(`http://localhost:5000/projects/${id}`)
  //     .then(
  //       res => {
  //         console.log(res.data);
  //         fetchProjects();
  //       }
  //     )
  //     .catch(
  //       // err => res.status(400).json(`Error: ${err}`)
  //     );
  // }

  // function generateTask(item) {
  //   return (
  //     <CardTask
        
  //     />
  //   )
  // }

  // function tickTask(id) {
    
  // }


  function generatePairProject(item) {
    return (
      <div className='project' key={item._id}>
        <CardProject
          project={item}
          // checkTask={tickTask}
        />
        <div className='tasks'>
          {/* {
            projects.map(generateTask)
          } */}
        </div>
      </div>
    )
  }

  return (
    <div className='list-projects'>
      <div className='head'>
        <h3>Projects</h3>
      </div>
      <div className='body'>
        {
          projects.map(generatePairProject)
        }
      </div>
    </div>
  );
};
