// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';

// * Importing other Components
import ItemEditMember from '../items/item-edit-member.component.js';
import TestModal from '../popup/popup-v1.component.js';
// import ItemTask from '../items/item-task.component.js';
// import CardTask from './card-task.component.js';

// * Stylesheets
import './section-project-edit-members.component.scss';

export default function SectionProjectEditMembers(props) {
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();
  const [showModal, setShowModal] = useState(false);

  // TODO If user adds a new member, their friend list should pop up
  
  // * Fetch Task Data from DB on mount
  useEffect(
    () =>{
    },
    []
  );

  function handleShow() {
    setShowModal(true);
  };

  function handleClose() {
    setShowModal(false);
  };

  function onAddMemberClick() {
    console.log('onAddMemberClick');
    handleShow();
  };

  // * Render
  return (
    <div className='section-project-edit-members'>
      <div className='new-member'>
        <Button
          variant="primary"
          onClick={onAddMemberClick}
        >
          Add Member
        </Button>
        <TestModal
          showModal={showModal}
          handleClose={handleClose}
        />
      </div>
      <div className='members'>
        {             
          (props.newMembersData)
            ? props.newMembersData.map(
                (projectMemberData) => {
                  return (
                    <ItemEditMember
                      newTasksData={props.newTasksData}
                      setNewTasksData={props.setNewTasksData}
                      newMembersData={props.newMembersData}
                      setNewMembersData={props.setNewMembersData}
                      projectMemberData={projectMemberData}
                      key={projectMemberData._id}
                    />
                  )
                }
              )
            : ''
        }
      </div>
    </div>
  );
};