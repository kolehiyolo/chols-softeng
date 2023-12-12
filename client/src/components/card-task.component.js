import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

import './card-task.component.scss';

import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

export default function CardTask(props) {
  const [taskName, setTaskName] = useState('');
  const [taskDue, setTaskDue] = useState('2000-01-01');
  const [taskOwner, setTaskOwner] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [taskDone, setTaskDone] = useState(false);


  useEffect(
    () => {
      // console.log('FETCH TASKDATA')
      axios.get('http://localhost:5000/tasks/'+props.data)
      .then(
        res => {
          // console.log('DONE FETCH TASKDATA')
          console.log('CREATE TASK: '+res.data.name);
          setTaskName(res.data.name);
          setTaskDue(res.data.due);
          setTaskOwner(res.data.owner);
          setTaskDone(res.data.done);
        }
      )
      .catch(
        // err => res.status(400).json(`Error: ${err}`)
      );
    },
    []
  );

  useEffect(
    () => {
      // console.log('FETCH AVATAR')
      axios.get('http://localhost:5000/users/'+taskOwner)
      .then(
        res => {
          // console.log('DONE FETCH AVATAR')
          if (res.data.profile_picture) {
            setAvatarUrl(res.data.profile_picture);
          }
        }
      )
      .catch(
        // err => res.status(400).json(`Error: ${err}`)
      );    
    }, 
    [taskOwner]
  ); // Dependency array ensures the effect runs when userId changes

  function truncateDescription(description) {
    const stringWithoutNewlines = description.replace(/\n/g, ' ');
  
    if (stringWithoutNewlines.length <= 30) {
      return stringWithoutNewlines;
    }
  
    const truncatedString = stringWithoutNewlines.substring(0, 30);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
  
    const resultString = lastSpaceIndex === -1 ? truncatedString : truncatedString.substring(0, lastSpaceIndex);
  
    return `${resultString}...`;
  };

  function onTick(id) {
    setTaskDone((prevTaskDone) => !prevTaskDone);

    props.onTick(id, taskDone);
  };

  return (
    (props.updatedTaskFilter == 'My Tasks' && taskOwner != props.currentUser)
    ? ''
    : <div className='card-task card' id={props.data}
        style={
          {
            width: 400 + 'px'
          }
        }
      >
        <div className='card-body'>
          <div className='left'>
            <div className="avatar">
              <img src={avatarUrl} alt="User Avatar" />
            </div>
            <p className="name">{truncateDescription(taskName)}</p>
          </div>
          <div className='right'>
            <span className="due badge text-bg-secondary">
              {new Date(taskDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <button onClick={() => onTick(props.data)}>
              {(taskDone) ? <SVGCheck className={"card-check"} width="24" height="24" /> : <SVGCheck2 className={"card-check"} width="24" height="24" />}
            </button>
          </div>
        </div>
      </div>
  )
}