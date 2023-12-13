// src/components/MyModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

// export default function TestModal({ props.showModal, props.handleClose }) {
const TestModal = (props) => {
  const [newMemberData, setNewMemberData] = useState(
    {
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
    }
  );

  function onSelectFriendChange(event) {
    console.log(event.target.value);
    // Find which friend is selected
    // Go through array of currentUserFriendsData to find their data
    // Update newMemberData _id, name, profile_picture, main_role
  };

  function onRoleChange(event) {
    setNewMemberData(
      prevValue => {
        let result = {...prevValue, 'project_role': event.target.value };

        console.log(result);
        return result;
      }
    );
  };

  function onCancelClick() {
    console.log('onCancelClick()');
    props.handleClose();
  };
  
  function onSaveClick() {
    console.log('onSaveClick()');
    props.handleClose();
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="group-2">
          <label htmlFor="project_role" className="form-label">Project Role</label>
          <input
            type="text"
            className="form-control"
            id="project_role"
            name="project_role"
            aria-describedby="emailHelp"
            value={newMemberData.project_role || ''}
            onChange={onRoleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TestModal;