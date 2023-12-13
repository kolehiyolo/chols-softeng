// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import ItemEditMember from '../items/item-edit-member.component.js';
// import ItemTask from '../items/item-task.component.js';
// import CardTask from './card-task.component.js';

// * Stylesheets
import './section-project-edit-members.component.scss';

export default function SectionProjectEditMembers(props) {
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();

  // TODO If user adds a new member, their friend list should pop up
  
  // * Fetch Task Data from DB on mount
  useEffect(
    () =>{
    },
    []
  );

  // * Render
  return (
    <div className='section-project-edit-members'>
      <button className='add-member'>
        Add Member
      </button>
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