// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
// import CardProjectInfo from './section-project-info.component.js';
import ItemEditTask from '../items/item-edit-task.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './card-project-tasks.component.scss';

export default function CardProjectEditTasks(props) {
  const [filterMode, setFilterMode] = useState('All Tasks');
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [allDoneTasks, setAllDoneTasks] = useState(0);
  const [myDoneTasks, setMyDoneTasks] = useState(0);

  console.log('MOUNT');

  function handleToggleChange(event) {
    setFilterMode(event.target.value);
  }

  // * Fetch Task Data from DB on mount
  useEffect(
    () => {
      setTasks(props.newTasksData);
      
      const myUpdatedTasks = props.newTasksData.filter((task) =>
        task.owner == props.currentUser
      );
      
      setMyTasks(myUpdatedTasks);
      calculateDoneTasks(props.newTasksData);
    },
    [props.newTasksData]
  );

  // * Calculate allDoneTasks every time tasks is updated
  useEffect(
    () =>{
      console.log('tasks Updated');
      console.log(tasks);
      calculateDoneTasks(tasks);
    },
    [tasks]
  );

  function calculateDoneTasks(tasks) {
    console.log(`RUN SectionProjectTasks -> calculateDoneTasks()`); 

    let resultsAll = 0;
    let resultsMy = 0;
      
    console.log(tasks);
    tasks.forEach(
      (task) => {
        if (task.done) {
          resultsAll++;

          if (task.owner == props.currentUser) {
            resultsMy++;
          }
        }
      }
    )
    
    setMyDoneTasks(resultsMy);
    setAllDoneTasks(resultsAll);

    const projectIsDone = (resultsAll == tasks.length) ? true : false;
    // props.updateDoneStatus(projectIsDone);

    axios.post(
      'http://localhost:5000/projects/done/' + props.projectData._id,
      {
        done: projectIsDone
      }
    )
      .then(
        () => {
          
        }
      );
  };

  // function fetchTasksData(taskIDArray) {
  //   console.log(`RUN SectionProjectTasks -> fetchTasksData()`); 

  //   const updatedTasks = [];

  //   Promise.all(
  //     taskIDArray.map((taskID) =>
  //       axios.get(`http://localhost:5000/tasks/${taskID}`)
  //         .then(
  //           (res) => {
  //             const fetchedTaskData = res.data;
  //             const refinedTaskData = {
  //               id: taskID,
  //               done: fetchedTaskData.done,
  //               owner: fetchedTaskData.owner
  //             };
  //             updatedTasks.push(refinedTaskData);
  //           }
  //         )
  //     )
  //   )
  //     .then(() => {
  //       // After all requests are complete, update the state with the array of refinedTaskData
  //       setTasks(updatedTasks);

  //       const myUpdatedTasks = updatedTasks.filter((task) =>
  //         task.owner == props.currentUser
  //       );

  //       setMyTasks(myUpdatedTasks);
  //     })
  // };

  // * Render
  return (
    <div className='card card-project-tasks'>
      <div className="card-body">
        <div className="head">
          <div className="group-1">
            <div className="task-filter-toggle btn-group" role="group" aria-label="Basic radio toggle button group">
              <input 
                  type="radio"
                  className="btn-check"
                  name="btnradio-tasks-filter"
                  id="btnradio-tasks-filter-1"
                  autoComplete="off"
                  checked={filterMode === 'All Tasks'}
                  onChange={handleToggleChange}
                  value="All Tasks"
                />
                <label 
                  className="btn btn-outline-primary" htmlFor="btnradio-tasks-filter-1"
                >
                  All Tasks
                </label>
                <input 
                  type="radio"
                  className="btn-check"
                  name="btnradio-tasks-filter"
                  id="btnradio-tasks-filter-2"
                  autoComplete="off"
                  checked={filterMode === 'My Tasks'}
                  onChange={handleToggleChange}
                  value="My Tasks"
                />
                <label 
                  className="btn btn-outline-primary" htmlFor="btnradio-tasks-filter-2"
                >
                  My Tasks
                </label>
            </div>
            <div className="progress-stats">
              <div className="count">
                <span>{(filterMode == 'All Tasks') ? allDoneTasks : myDoneTasks}</span>
                <span> / </span>
                <span>{(filterMode == 'All Tasks') ? tasks.length : myTasks.length}</span>
              </div>
              <div className="percentage">
                <span>
                  {
                    (filterMode == 'All Tasks') ?
                      ((allDoneTasks / tasks.length) * 100).toFixed(0) :
                      ((myDoneTasks / myTasks.length) * 100).toFixed(0)
                  }%
                </span>
              </div>
            </div>
          </div>
          <div className="group-2">
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div
                className="progress-bar"
                style={
                  {
                    width: (
                      (filterMode == 'All Tasks') ?
                        ((allDoneTasks / tasks.length) * 100).toFixed(0) :
                        ((myDoneTasks / myTasks.length) * 100).toFixed(0)
                    ) + "%"
                  }
                }
              >
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          {
            (tasks)
            ? tasks.map(
                (taskData) => {
                  return (
                    <ItemEditTask 
                      taskData={taskData}
                      // taskID={taskID}
                      key={taskData._id}
                      currentUser={props.currentUser}
                      filterMode={filterMode}
                      // tickTask={tickTask}
                      carded={true}
                    />
                  );
                }
              )
            : ''
          }
        </div>
      </div>
    </div>
  );
};