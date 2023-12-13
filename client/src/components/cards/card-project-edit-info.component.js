// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// * Importing other Components
// import CardProjectInfo from './section-project-info.component.js';
import ItemMember from '../items/item-member.component.js';
import SectionProjectEditMembers from '../sections/section-project-edit-members.component.js';
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
  const [newPriority, setNewPriority] = useState();
  const [newName, setNewName] = useState(props.oldProjectData.name);
  const [newDescription, setNewDescription] = useState(props.oldProjectData.description);
  const [newDue, setNewDue] = useState(props.oldProjectData.due);
  
  useEffect(
    () => {
      calculateProjectPriorityClass(props.oldProjectData.priority);
      setNewName(props.oldProjectData.name);
      setNewDescription(props.oldProjectData.description);
      setNewDue(props.oldProjectData.due);
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
    
    setNewPriority(projectPriority);
    setProjectPriorityClass(result);
    updateNewProjectData('priority', newPriority);
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
    switch (event.target.name) {
      case 'project_title':
        setNewName(event.target.value);
        updateNewProjectData('name', event.target.value);
        break;
        case 'project_description':
          setNewDescription(event.target.value);
          updateNewProjectData('description', event.target.value);
        break;
      default:
        break;
    }
  };

  function onDateChange(date) {
    setNewDue(date);
    updateNewProjectData('due', date);
  };

  function updateNewProjectData(property, value) {
    props.setNewProjectData(
      prevValue => {
        let result = {...prevValue, [property]: value};

        // console.log(result);

        return result;
      }
    );
  };

  // * Render
  return (
    <div 
      className='card card-project-info'
    >
      <div className="card-body">
        <div className="group-1">
          <label htmlFor="project_title" className="form-label">Title</label>
          <input type="text" className="form-control" id="project_title" name="project_title" aria-describedby="emailHelp" value={newName || ''} onChange={updateField}/>
        </div>
        <div className="group-2">
          <label htmlFor="project_description" className="form-label">Description</label>
          <textarea className="form-control" id="project_description" name="project_description" rows="3" value={newDescription || ''} onChange={updateField}></textarea>
        </div>
        <div className="group-3">
          <select className={projectPriorityClass} aria-label="Default select example" onChange={onPriorityInputChange} value={newPriority || 'Low'}>
            <option className='alert alert-danger' value="High">High</option>
            <option className='alert alert-warning' value="Medium">Medium</option>
            <option className='alert alert-success' value="Low">Low</option>
          </select>
          {/* <div className="project-priority alert alert-danger">{props.oldProjectData.priority}</div> */}
          <DatePicker
            selected={new Date((newDue != undefined) ? newDue : '01-01-2000')} 
            onChange={onDateChange}
          />
          {/* <div className="priority-due alert alert-secondary">
            {new Date(props.oldProjectData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div> */}
        </div>
        <div className="group-3">
          <SectionProjectEditMembers
            oldProjectData={props.oldProjectData}
            oldTasksData={props.oldTasksData}
            oldMembersData={props.oldMembersData}
            newProjectData={props.newProjectData}
            newTasksData={props.newTasksData}
            newMembersData={props.newMembersData}
            setNewProjectData={props.setNewProjectData}
            setNewTasksData={props.setNewTasksData}
            setNewMembersData={props.setNewMembersData}
          />
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