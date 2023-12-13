// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
// import CardProjectInfo from './section-project-info.component.js';
import ItemMember from '../items/item-member.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './card-project-info.component.scss';

export default function CardProjectEditInfo(props) {
  // console.log('MOUNT CardProjectVertical()');
  // const [doneStatus, setDoneStatus] = useState(props.projectData.done);
  const [projectPriorityClass, setProjectPriorityClass] = useState();
  
  
  // function updateDoneStatus(passedDoneStatus) {
  //   setDoneStatus(passedDoneStatus);
  // };

  useEffect(
    () => {
      calculateProjectPriorityClass(props.oldProjectData.priority);
    },
    [props.oldProjectData]
  );

  function calculateProjectPriorityClass(projectPriority) {
    let result = "project-priority form-select alert alert-";

    switch(projectPriority) {
      case 'High':
        result = result + 'danger';
        break;
      case 'Medium':
        result = result + 'warning';
        break;
      case 'Low':
        result = result + 'success';
        break;
      default:
        result = 'project-priority form-select';
        break;
    }
    
    setProjectPriorityClass(result);
  };

  function onPriorityInputChange(event) {
    console.log(`TRIGGER! ${event.target.value}`);
    calculateProjectPriorityClass(event.target.value);
  }

  // * When "Edit" is clicked
  function onEditClick() {
    console.log(`RUN CardProjectInfo -> onEditClick()`); 
  };

  // * When "Delete" is clicked
  function onDeleteClick() {
    console.log(`RUN CardProjectInfo -> onDeleteClick()`); 
  };

  function updateField(event) {
    const sample = {
      name: '',
      description: '',
      priority: '',
      due: ''
    }


  };

  // * Render
  return (
    <div 
      className='card card-project-info'
    >
      <div className="card-body">
        <div className="group-1">
          <label for="project_title" class="form-label">Title</label>
          <input type="text" class="form-control" id="project_title" name="project_title" aria-describedby="emailHelp" value={props.oldProjectData.name}/>
        </div>
        <div className="group-2">
          <label for="project_description" class="form-label">Description</label>
          <textarea class="form-control" id="project_description" name="project_description" rows="3" value={props.oldProjectData.description}></textarea>
        </div>
        <div className="group-3">
          <select class={projectPriorityClass} aria-label="Default select example" onChange={onPriorityInputChange}>
            <option class='alert alert-danger' selected={(props.oldProjectData.priority === 'High')} value="High">High</option>
            <option class='alert alert-warning' selected={(props.oldProjectData.priority === 'Medium')} value="Medium">Medium</option>
            <option class='alert alert-success' selected={(props.oldProjectData.priority === 'Low')} value="Low">Low</option>
          </select>
          {/* <div className="project-priority alert alert-danger">{props.oldProjectData.priority}</div> */}
          <div className="priority-due alert alert-secondary">
            {new Date(props.oldProjectData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="group-3">
          <div className="right">
            <div className="members">
              {             
                (props.oldProjectData.members)
                  ? props.oldProjectData.members.map(
                      (projectMember) => {
                        return (
                          <ItemMember
                            projectMember={projectMember}
                            key={projectMember.id}
                          />
                        )
                      }
                    )
                  : ''
              }
            </div>
          </div>
        </div>
        <div className="group-4">
          <div className="buttons">
            <button 
              className="edit btn btn-secondary"
              onClick={
                () => {
                  onEditClick()
                }
              }
              >
                Edit
            </button>
            <button 
              className="delete btn btn-danger"
              onClick={
                () => {
                  onDeleteClick()
                }
              }
              >
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};