// src/components/MyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// * Importing other Components
import ItemAssignee from '../items/item-assignee.component.js';

// export default function TestModal({ props.showModal, props.handleClose }) {
export default function PopupEditTask(props) {
  const [updatedTaskData, setUpdatedTaskData] = useState(
    {
      description: '',
      done: '',
      due: '',
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    }
  );
  const [assigneeData, setAssigneeData] = useState(
    {
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
    }
  );

  useEffect(
    () =>{
      setUpdatedTaskData(props.taskData);
      if (props.newMembersData !== undefined) {
        setAssigneeData(
          () => {
            if (props.taskData.owner != 'Unassigned') {
              return props.newMembersData.find(user => user._id === props.taskData.owner);
            } else {
              return {
                _id: '',
                name: '',
                profile_picture: '',
                main_role: '',
                project_role: '',
              };
            }
          }
        );
        console.log('BOLLOCKS');
        console.log(props.newMembersData.find(user => user._id === props.taskData.owner));
      };
    },
    [props.taskData, props.newMembersData]
  );

  function onSelectedMemberChange(selectedOption) {
    console.log(selectedOption);

    setUpdatedTaskData(
      prevData => {
        const result = {
          ...prevData,
          'owner': selectedOption._id,
        };

        console.log(result);
        return result;
      }
    );
    
    setAssigneeData(
      prevData => {
        const result = {
          ...prevData,
          '_id': selectedOption._id,
          'name': selectedOption.name,
          'profile_picture': selectedOption.profile_picture,
          'main_role': selectedOption.main_role,
          'project_role': selectedOption.project_role,    
        };

        console.log(result);
        return result;
      }
    );
  };

  function onInputChange(event) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'name': event.target.value };

        console.log(result);
        return result;
      }
    );
  };

  function onDateChange(date) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'due': date };

        console.log(result);
        return result;
      }
    );
  };

  function onCancelClick() {
    console.log('onCancelClick()');
    props.setShowEditModal(false);
    props.handleEditClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: '',
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
  };
  
  function onSaveClick() {
    console.log('onSaveClick()');

    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = prevValue.map(task =>
          task._id === updatedTaskData._id ? updatedTaskData : task
        );
        
        console.log(`updatedTasksData`);
        console.log(updatedTasksData);

        return updatedTasksData;
      }
    );

    props.setShowEditModal(false);
    props.handleEditClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: '',
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
  };

  function onDeleteClick() {
    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = prevValue.filter(task => task._id !== props.taskData._id);
        
        console.log(`updatedTasksData`);
        console.log(updatedTasksData);

        return updatedTasksData;
      }
    );

    props.setShowEditModal(false);
    props.handleEditClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: '',
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
  };

  return (
    (props.showEditModal)
    ? (
        <Modal show={props.showEditModal} onHide={props.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="group-1">
              <Select
                options={props.newMembersData}
                value={assigneeData._id || ''}
                onChange={(selectedOption) => onSelectedMemberChange(selectedOption)}
                isSearchable
                placeholder="Select an assignee"
                components={{
                  Option: ItemAssignee, // Custom component for rendering options
                }}
              />
            </div>
            {
              (assigneeData._id !== '')
              ? <div className='item-member' value={assigneeData._id}>
                  <div className='group-1'>
                    <div className='left'>
                      <div
                        className="item-avatar-circle"
                        key={assigneeData._id}
                      >
                        <img src={assigneeData.profile_picture} alt={'User ' + assigneeData._id + ' Avatar'} />
                      </div>
                    </div>
                    <div className='right'>
                      <p className='name'>{assigneeData.name.first} {assigneeData.name.last}</p>      
                      <p className='role'>{assigneeData.main_role}</p>      
                    </div>
                  </div>
                  <div className='group-2'>
                  </div>
                  {props.label}
                </div>
              : ''
            }
            <div className="group-3">
              <label htmlFor="task_name" className="form-label">Task</label>
              <input
                type="text"
                className="form-control"
                id="task_name"
                name="task_name"
                aria-describedby="emailHelp"
                value={updatedTaskData.name || ''}
                onChange={onInputChange}
              />
            </div>
            <div className="group-4">
              <label htmlFor="task_name" className="form-label">Task</label>
              <DatePicker
                selected={new Date((updatedTaskData.due != undefined) ? updatedTaskData.due : '01-01-2000')} 
                onChange={onDateChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteClick}>
              Delete
            </Button>
            <Button variant="primary" onClick={onSaveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )
    : ''
  );
};