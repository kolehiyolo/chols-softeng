// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import ItemAvatarCircle from './item-avatar-circle.component.js';

// * Importing images/SVG
import { ReactComponent as SVGPencil } from '../../svg/pencil.svg';
import { ReactComponent as SVGTrash } from '../../svg/trash.svg';

// * Stylesheets
// import './item-task.component.scss';

export default function ItemEditTask(props) {
  // console.log('MOUNT ItemTask()');
  // const [taskData, setTaskData] = useState({
  //   name: '',
  //   owner: '',
  //   due: '',
  // });
  // const [doneState, setDoneState] = useState(false);

  // * Fetch Task Data from DB on mount
  // useEffect(
  //   () =>{
  //     fetchTaskData(props.taskID);
  //   },
  //   [props.taskID]
  // );

  // function fetchTaskData(taskID) {
  //   console.log(`RUN ItemTask -> fetchTaskData()`); 
  //   axios.get('http://localhost:5000/tasks/' + taskID)
  //     .then(
  //       res => {
  //         const fetchedTaskData = res.data;
  //         const refinedTaskData = {
  //           name: fetchedTaskData.name,
  //           owner: fetchedTaskData.owner,
  //           due: fetchedTaskData.due,
  //         }
  //         setTaskData(refinedTaskData);
  //         setDoneState(fetchedTaskData.done);
  //       }
  //     )
  // };

  // function handleTickClick(taskID) {
  //   props.tickTask(taskID);
  //   setDoneState(!doneState);
  // }

  // * Render
  return (
    (props.filterMode === 'My Tasks' && props.taskData.owner !== props.currentUser)
    ? ''
    : (props.carded)
    ? <div className='card card-item-task'>
        <div className='item-task'>
          <div className='group-1'>
            <ItemAvatarCircle
              userID={props.taskData.owner}
              key={props.taskData.owner}
            />
            <p>{props.taskData.name}</p>      
          </div>
          <div className='group-2'>
            <span className="priority-due badge text-bg-secondary">
              {new Date(props.taskData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {/* <button
              className='tick-btn'
              onClick={
                () => {
                  if (props.taskData.owner === props.currentUser) {
                    handleTickClick(props.taskID)
                  }
                }
              }
            >
              {
                (taskData.owner === props.currentUser) ?
                  ((doneState) ? <SVGTickMineDone /> : <SVGTickMineNotDone />) :
                  ((doneState) ? <SVGTickOthersDone /> : <SVGTickOthersNotDone/>)
              }
            </button> */}
          </div>
        </div>
      </div>
    : <div className='item-task'>
        <div className='group-1'>
          <ItemAvatarCircle
              userID={props.taskData.owner}
              key={props.taskData.owner}
            />
          <p>{props.taskData.name}</p>      
        </div>
        <div className='group-2'>
          <span className="priority-due badge text-bg-secondary">
            {new Date(props.taskData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          {/* <button
            className='tick-btn'
            onClick={
              () => {
                if (taskData.owner === props.currentUser) {
                  handleTickClick(props.taskID)
                }
              }
            }
          >
            {
              (taskData.owner === props.currentUser) ?
                ((doneState) ? <SVGTickMineDone /> : <SVGTickMineNotDone />) :
                ((doneState) ? <SVGTickOthersDone /> : <SVGTickOthersNotDone/>)
            }
          </button> */}
        </div>
      </div>
  );
}