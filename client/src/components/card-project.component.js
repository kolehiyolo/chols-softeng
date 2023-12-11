import React, {useState, useEffect} from "react";
import axios from 'axios';

import './card-project.component.scss';

import { ReactComponent as SVGInfo } from '../svg/info.svg';
// import {Link} from 'react-router-dom';

function UserAvatar(item) {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users/'+item.id)
    .then(
      res => {
        if (res.data.profile_picture) {
          setAvatarUrl(res.data.profile_picture);
        }
      }
    )
    .catch(
      // err => res.status(400).json(`Error: ${err}`)
    );    
  }, []); // Dependency array ensures the effect runs when userId changes

  return (
    <div className="avatar" key={item.id}>
      <img src={avatarUrl} alt="User Avatar" />
    </div>
  );
}

export default function CardProject(props) {
  const [taskFilter, setTaskFilter] = useState('All Tasks');
  const [doneTasksCount, setDoneTasksCount] = useState(0);

  // function onDelete(id) {
  //   props.deleteProject(id);
  // };
  
  useEffect(
    () => {
      countDoneTasks(props.project.tasks);
    },
    []
  );
  
  function changeTaskFilter() {
    let value = (taskFilter == 'All Tasks') ? 'My Tasks' : 'All Tasks';
    setTaskFilter(value)
  }
  
  function countDoneTasks(tasksArray) {
    let result = 0;

    tasksArray.forEach(element => {
      axios.get('http://localhost:5000/tasks/'+element)
      .then(
        res => {
          if (res.data.done) {
            result++;
            setDoneTasksCount(result);
          }
        }
      )
      .catch(
        // err => res.status(400).json(`Error: ${err}`)
      );
    });
  }

  return (
    <div className="card card-project" id={'project-'+props.project._id}
      style={
        {
          width: 440+'px'
        }
      }
    >
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <div className="flex-row group-1">
          <h5 className="card-title">{props.project.name}</h5>
          <SVGInfo className="card-info" width="24" height="24" />
        </div>
        <div className="flex-row group-2">
          <p className="card-text">{props.project.description}</p>
        </div>
        <div className="flex-row group-3">
          {/* <p className="project-priority">{props.project.priority}</p> */}
          <span className="project-priority badge text-bg-danger">{props.project.priority}</span>
          <span className="priority-due badge text-bg-danger">
            {new Date(props.project.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex-row group-4">
          <div className="count">
            <div className="count">
              <span>{doneTasksCount}</span>
              <span> / </span>
              <span>{props.project.tasks.length}</span>
            </div>
            <div className="percentage">
              <span>
                {
                  ((doneTasksCount / props.project.tasks.length) * 100).toFixed(0)
                } %
              </span>
            </div>
          </div>
          <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div
              className="progress-bar"
              style={
                {
                  width: (doneTasksCount / props.project.tasks.length) * 100 + "%"
                }
              }
            >
            </div>
          </div>
        </div>
        <div className="flex-row group-5">
          <div className="members">
            {
              props.project.members.map(UserAvatar)
            }
          </div>
          <button 
            className="btn btn-primary"
            onClick={
              () => {
                changeTaskFilter()
              }
            }
            >
              {taskFilter}
          </button>
        </div>
      </div>
    </div>
  )
}