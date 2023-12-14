// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";

// * Importing other Components
import CardProjectEditInfo from '../cards/card-project-edit-info.component.js';
import CardProjectEditTasks from '../cards/card-project-edit-tasks.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project-edit.component.scss';

export default function PageProjectEdit(props) {
  // console.log('MOUNT PageProjectEdit()');
  const [oldProjectData, setOldProjectData] = useState([]);
  const [newProjectData, setNewProjectData] = useState();
  const [oldTasksData, setOldTasksData] = useState();
  const [newTasksData, setNewTasksData] = useState();
  const [oldMembersData, setOldMembersData] = useState();
  const [newMembersData, setNewMembersData] = useState();
  const [oldCurrentUserFriendsData, setOldCurrentUserFriendsData] = useState();
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();
  
  const { id: projectID } = useParams();

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchAllOldData();
    },
    [projectID]
  );
  
  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      setCurrentUserFriendsData(removeFriendsWhoAreMembers(newMembersData, oldCurrentUserFriendsData));
    },
    [newMembersData]
  );

  function removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData) {
    if (fetchedMembersData !== undefined && fetchedCurrentUserFriendsData !== undefined) {
      // Extract _id values from newMembersData array
      const newMembersIds = fetchedMembersData.map(user => user._id);
      
      // Filter currentUserFriendsData to include only users whose _id is not in newMembersIds
      const updatedFriendsData = fetchedCurrentUserFriendsData.filter(
        user => !newMembersIds.includes(user._id)
        );
      
      return updatedFriendsData;
    }
  };

  // * This fetches all Data related to the Project, including the tasks data and members data
  function fetchAllOldData() {
    console.log(`RUN PageProjectEdit -> fetchAllData()`); 
    axios.get('http://localhost:5000/projects/' + projectID)
      .then(
        res => {
          const project = res.data;
          setOldProjectData(project);
          setNewProjectData(project);

          const fetchedTasksData = [];
          Promise.all(
            project.tasks.map((taskID) =>
              axios.get(`http://localhost:5000/tasks/${taskID}`)
                .then(
                  (res) => {
                    const refinedTaskData = res.data;
                    fetchedTasksData.push(refinedTaskData);
                  }
                )
            )
          )
            .then(() => {
              setOldTasksData(fetchedTasksData);
              setNewTasksData(fetchedTasksData);
            })

          // const fetchedMembersData = [];
          // Promise.all(
          //   project.members.map((member) =>
          //     axios.get(`http://localhost:5000/users/${member.id}`)
          //       .then(
          //         (res) => {
          //           const fetchedMemberData= res.data;
          //           const refinedMemberData = {
          //             _id: member.id,
          //             name: fetchedMemberData.name,
          //             profile_picture: fetchedMemberData.profile_picture,
          //             project_role: member.role,
          //             main_role: fetchedMemberData.main_role,
          //           };
          //           fetchedMembersData.push(refinedMemberData);
          //         }
          //       )
          //   )
          // )
          //   .then(() => {
          //     setOldMembersData(fetchedMembersData);
          //     setNewMembersData(fetchedMembersData);
          //   })

          // const fetchedFriendsData = [];
          // let currentUserFriends = [];
          // Promise.all([
          //   // Fetching currentUser Friends
          //   axios.get(`http://localhost:5000/users/${props.currentUser}`)
          //     .then((res) => res.data.friends)
          //     .then((currentUserFriends) => {
          //       console.log('currentUserFriends:');
          //       console.log(currentUserFriends);
          
          //       // Fetching data for each Friend
          //       const friendPromises = currentUserFriends.map((friendID) =>
          //         axios.get(`http://localhost:5000/users/${friendID}`)
          //           .then((res) => {
          //             const fetchedFriendData = res.data;
          //             const refinedFriendData = {
          //               _id: friendID,
          //               name: fetchedFriendData.name,
          //               profile_picture: fetchedFriendData.profile_picture,
          //               main_role: fetchedFriendData.main_role,
          //             };
          //             // console.log('refinedFriendData:');
          //             // console.log(refinedFriendData);

          //             return refinedFriendData;
          //           })
          //       );
          
          //       return Promise.all(friendPromises);
          //     })
          // ])
          //   .then(([currentUserFriendsData]) => {
          //     console.log('currentUserFriendsData:');
          //     console.log(currentUserFriendsData);
          //     // currentUserFriendsData = removeFriendsWhoAreMembers(currentUserFriendsData);
          //     setCurrentUserFriendsData(currentUserFriendsData);
          //   })
          const fetchedMembersData = [];
          const fetchedFriendsData = [];

          // Fetching new members data
          // const newMembersPromise = Promise.all(
          //   project.members.map((member) =>
          //     axios.get(`http://localhost:5000/users/${member.id}`)
          //       .then((res) => {
          //         const fetchedMemberData = res.data;
          //         const refinedMemberData = {
          //           _id: member.id,
          //           name: fetchedMemberData.name,
          //           profile_picture: fetchedMemberData.profile_picture,
          //           project_role: member.role,
          //           main_role: fetchedMemberData.main_role,
          //         };
          //         fetchedMembersData.push(refinedMemberData);
          //       })
          //   )
          // ).then(() => setNewMembersData(fetchedMembersData));

          // Fetching currentUser Friends
          const currentUserFriendsPromise = Promise.all(
            project.members.map((member) =>
              axios.get(`http://localhost:5000/users/${member.id}`)
                .then((res) => {
                  const fetchedMemberData = res.data;
                  const refinedMemberData = {
                    _id: member.id,
                    name: fetchedMemberData.name,
                    profile_picture: fetchedMemberData.profile_picture,
                    project_role: member.role,
                    main_role: fetchedMemberData.main_role,
                  };
                  fetchedMembersData.push(refinedMemberData);
                })
            )
          ).then(() => setNewMembersData(fetchedMembersData))
            .then(() => axios.get(`http://localhost:5000/users/${props.currentUser}`))
            .then((res) => {
              let result = res.data.friends;
              result.unshift(props.currentUser);
              return result;
            })
            .then((currentUserFriends) => {
              console.log('currentUserFriends:');
              console.log(currentUserFriends);

              // Fetching data for each Friend
              const friendPromises = currentUserFriends.map((friendID) =>
                axios.get(`http://localhost:5000/users/${friendID}`)
                  .then((res) => {
                    const fetchedFriendData = res.data;
                    const refinedFriendData = {
                      _id: friendID,
                      name: fetchedFriendData.name,
                      profile_picture: fetchedFriendData.profile_picture,
                      main_role: fetchedFriendData.main_role,
                    };
                    return refinedFriendData;
                  })
              );

              return Promise.all(friendPromises);
            })
            .then((fetchedCurrentUserFriendsData) => {
              console.log('fetchedCurrentUserFriendsData:');
              console.log(fetchedCurrentUserFriendsData);

              setOldCurrentUserFriendsData(fetchedCurrentUserFriendsData);
              setCurrentUserFriendsData(removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData));
            });
            }
          )
  };

  function onBackClick() {
    // TODO this should throw an "Are you sure" popup before allowing
    window.location.href='/project/' + projectID;
  }

  // * Render
  return (
    <div 
      className='page-project'
      id={'page-project-'+oldProjectData._id}
    >
      <div className='head'>
        <div className='buttons'>
          <button 
            className="btn btn-primary"
            onClick={
              () => {
                onBackClick();
              }
            }
            >
            Back
          </button>
        </div>
        <h3>Editing {oldProjectData.name}</h3>
      </div>
      <div className='body'>
        <CardProjectEditInfo 
          oldProjectData={oldProjectData}
          oldTasksData={oldTasksData}
          oldMembersData={oldMembersData}
          newProjectData={newProjectData}
          newTasksData={newTasksData}
          newMembersData={newMembersData}
          setNewProjectData={setNewProjectData}
          setNewTasksData={setNewTasksData}
          setNewMembersData={setNewMembersData}
          currentUserFriendsData={currentUserFriendsData}
          setCurrentUserFriendsData={setCurrentUserFriendsData}
        />
        {
          (newTasksData !== undefined)
          ? <CardProjectEditTasks 
              projectData={oldProjectData}
              currentUser={props.currentUser}
              oldProjectData={oldProjectData}
              oldTasksData={oldTasksData}
              oldMembersData={oldMembersData}
              newProjectData={newProjectData}
              newTasksData={newTasksData}
              newMembersData={newMembersData}
              setNewProjectData={setNewProjectData}
              setNewTasksData={setNewTasksData}
              setNewMembersData={setNewMembersData}
              currentUserFriendsData={currentUserFriendsData}
              setCurrentUserFriendsData={setCurrentUserFriendsData}
            />
          : ''
        }
      </div>
    </div>

  );
}