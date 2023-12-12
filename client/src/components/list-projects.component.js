import React, {useState, useEffect} from "react";
import axios from 'axios';
import CardProject from './card-project.component.js';
import CardTask from './card-task.component.js';

import './list-projects.component.scss';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [updatedProjectTasks, setUpdatedProjectTasks] = useState([]);
  const [updatedTaskFilter, setUpdatedTaskFilter] = useState(false);
  const [currentUser, setCurrentUser] = useState('65773b179407d34564bd6ed9');

  useEffect(
    () => {
      fetchProjects();
    },
    []
  );

  function changeTaskFilter(currentTaskFilter) {
    let value = (currentTaskFilter == 'All Tasks') ? 'My Tasks' : 'All Tasks';
    setUpdatedTaskFilter(value);
    console.log(value);
  }

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

  function onTick(id, oldValue) {
    axios.post('http://localhost:5000/tasks/check/' + id, {done: !oldValue})
      .then(
        res => {
          axios.get('http://localhost:5000/tasks/' + id)
            .then(
              res => {
                axios.get('http://localhost:5000/projects/' + res.data.project)
                .then(
                  res => {
                    setUpdatedProjectTasks(res.data.tasks);
                  }
                )    
              }
            )
        }
      )
      
    return '';
  };

  function generateTask(item) {
    console.log('generateTask(' + item + ')');
    return (
      <CardTask
        data={item}
        key={item._id}
        onTick={onTick}
        currentUser={currentUser}
        updatedTaskFilter={updatedTaskFilter}
      />
    )
  };

  function generatePairProject(item) {
    return (
      <div className='project' key={item._id}>
        <CardProject
          project={item}
          updatedProjectTasks={updatedProjectTasks}
          changeTaskFilter={changeTaskFilter}
          // checkTask={tickTask}
        />
        <div className='tasks'>
          {
            item.tasks.map(generateTask)
          }
          {/* {
            (updatedTaskFilter == 'My Tasks') ?
              item.tasks.map((taskID) => {
                axios.get('http://localhost:5000/tasks/'+taskID)
                  .then(
                    res => {
                      if (res.data.owner == currentUser) {
                        return generateTask(taskID);
                      }
                    }
                  )
            }) : item.tasks.map(generateTask)
          } */}
        </div>
      </div>
    )
  };

  return (
    <div className='list-projects'>
      <div className='head'>
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
          projects.map(generatePairProject)
        }
      </div>
    </div>
  );
};
