// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";

// * Importing other Components
import CardProjectEditInfo from '../cards/card-project-edit-info.component.js';
import CardProjectEditTasks from '../cards/card-project-edit-tasks.component.js';
import PopupWarnWOptions from '../popup/popup-warn-w-options.component.js';
import PopupWarn from "../popup/popup-warn.component.js";
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project-edit.component.scss';

export default function PageProjectEdit(props) {
  // console.log('MOUNT PageProjectEdit()');
  const [oldProjectData, setOldProjectData] = useState([]);
  const [newProjectData, setNewProjectData] = useState([]);
  const [oldTasksData, setOldTasksData] = useState();
  const [newTasksData, setNewTasksData] = useState();
  const [oldMembersData, setOldMembersData] = useState();
  const [newMembersData, setNewMembersData] = useState();
  const [oldCurrentUserFriendsData, setOldCurrentUserFriendsData] = useState();
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();
  const [allTasksAreAssigned, setAllTasksAreAssigned] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSaveWithUnassignedTasks, setShowSaveWithUnassignedTasks] = useState(false);
  
  const { id: projectID } = useParams();

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchAllOldData();
    },
    [projectID]
  );

  useEffect(
    () => {
      // console.log(newProjectData);
    },
    [newProjectData]
  );
  
  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      setCurrentUserFriendsData(removeFriendsWhoAreMembers(newMembersData, oldCurrentUserFriendsData));
    },
    [newMembersData, oldCurrentUserFriendsData]
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
    // console.log(`RUN PageProjectEdit -> fetchAllData()`); 
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

          const fetchedMembersData = [];
          const fetchedFriendsData = [];

          const currentUserFriendsPromise = Promise.all(
            project.members.map((member) =>
              axios.get(`http://localhost:5000/users/${member._id}`)
                .then((res) => {
                  const fetchedMemberData = res.data;
                  const refinedMemberData = {
                    _id: member._id,
                    name: fetchedMemberData.name,
                    profile_picture: fetchedMemberData.profile_picture,
                    project_role: member.role,
                    main_role: fetchedMemberData.main_role,
                    projects: fetchedMemberData.projects,
                  };
                  fetchedMembersData.push(refinedMemberData);
                })
            )
          ).then(() => {
            setNewMembersData(fetchedMembersData);
            setOldMembersData(fetchedMembersData);
          })
            .then(() => axios.get(`http://localhost:5000/users/${props.currentUser}`))
            .then((res) => {
              let result = res.data.friends;
              result.unshift(props.currentUser);
              return result;
            })
            .then((currentUserFriends) => {
              // console.log('currentUserFriends:');
              // console.log(currentUserFriends);

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
                      projects: fetchedFriendData.projects,
                    };
                    return refinedFriendData;
                  })
              );

              return Promise.all(friendPromises);
            })
            .then((fetchedCurrentUserFriendsData) => {
              // console.log('fetchedCurrentUserFriendsData:');
              // console.log(fetchedCurrentUserFriendsData);

              setOldCurrentUserFriendsData(fetchedCurrentUserFriendsData);
              setCurrentUserFriendsData(removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData));
            });
            }
          )
  };

  function onBackClick() {
    // TODO this should throw an "Are you sure" popup before allowing
    window.location.href='/project/' + projectID;
  };

  function saveProject() {
    console.log('Saving Project');
    setShowSaveModal(false);
    // TODO
    // Save the newProjectData to the DB
    // Save the newTasksData to the DB
    // Save the newMembersData to the DB
    // Console log the newProjectData, newTasksData, and newMembersData
    console.log('oldProjectData');
    console.log(oldProjectData);
    console.log('newProjectData');
    console.log(newProjectData);
    console.log('oldTasksData');
    console.log(oldTasksData);
    console.log('newTasksData');
    console.log(newTasksData);
    console.log('oldMembersData');
    console.log(oldMembersData);
    console.log('newMembersData');
    console.log(newMembersData);
    
    // TODO
    // Save the newMembersData first
    // Run through newMembersData and check if any of the members are new
    // You can do this by checking the newMembersData with the oldMembersData
    // * If newMember is not in oldMembersData, then it is a new member and you must do the ff:
      // 1. Create an object for the newMemberData with {id: newMember._id, role: newMember.project_role}
      // 2. Add the newMemberData to newProjectData.members
      // 3. Do an axios.post request to http://localhost:5000/users/update/projects/:id with the body newMember.projects
    // * If newMember is in oldMembersData, then it is an old member and you must do the ff:
      // 1. Find the matched oldMember data
      // 2. Update the newProjectData.member data with the newMember.project_role
    // * If oldMember is not in newMembersData, then it is a deleted member and you must do the ff:
      // 1. Find the matched oldMember data
      // 2. Remove the oldMemberData from newProjectData.members
      // 3. Remove the project from the oldMemberData.projects
      // 3. Do an axios.post request to http://localhost:5000/users/update/projects/:id with the body oldMember.projects
    
    function saveNewMembersData() {
      newMembersData.forEach(newMember => {
        if (oldMembersData.some(oldMember => oldMember._id === newMember._id)) {
          // console.log('Old Member!');
          newProjectData.members.find(member => member._id === newMember._id).role = newMember.project_role;

          axios.post(`http://localhost:5000/projects/update/${newProjectData._id}`, newProjectData)
                .then(res => console.log(res.data));
          // console.log('newProjectData.members');
          // console.log(newProjectData.members);
        } else {
          // console.log('New Member!');

          // console.log('Adding new member to newProjectData.members')
          newProjectData.members.push({
            _id: newMember._id,
            role: newMember.project_role
          });

          // console.log('Adding project to newMemberProjectsList');
          const newMemberProjectsList = {
            projects: newMember.projects
          };
          // console.log(newMemberProjectsList);
          axios.post(`http://localhost:5000/users/update/projects/${newMember._id}`, newMemberProjectsList)
            .then(res => console.log(res.data));
          axios.post(`http://localhost:5000/projects/update/${newProjectData._id}`, newProjectData)
          .then(res => console.log(res.data));
        }
      });

      oldMembersData.forEach(oldMember => {
        if (newMembersData.some(newMember => newMember._id === oldMember._id)) {
          // console.log('Old Member! (Processed this already)');
        } else {
          // console.log('Deleted Member!');

          // console.log('Removing member from newProjectData.members')
          newProjectData.members = newProjectData.members.filter(member => member._id !== oldMember._id);
          // console.log(newProjectData.members);

          // console.log('Removing project from deletedMemberProjectsList');
          const deletedMemberProjectsList = {
            projects: oldMember.projects.filter(project => project !== projectID)
          };
          // console.log(deletedMemberProjectsList);
          axios.post(`http://localhost:5000/users/update/projects/${oldMember._id}`, deletedMemberProjectsList)
            .then(res => console.log(res.data));

          axios.post(`http://localhost:5000/projects/update/${newProjectData._id}`, newProjectData)
              .then(res => console.log(res.data));
        }
      });
    };
    
    function saveNewTasksData() {
      newTasksData.forEach(newTask => {
        if (oldTasksData.some(oldTask => oldTask._id === newTask._id)) {
          console.log('Old Task!');
          axios.post(`http://localhost:5000/tasks/update/${newTask._id}`, newTask)
            .then(res => console.log(res.data));
        } else {
          console.log('New Task!');
          const newTaskData = {
            name: newTask.name,
            start: newTask.start,
            due: newTask.due,
            done: false,
            owner: newTask.owner,
            project: newProjectData._id,
            priority: newTask.priority,
            description: newTask.description
          }
          axios.post(`http://localhost:5000/tasks/add`, newTaskData)
            .then(res => {
              console.log('New Task Added! ID:')
              console.log(res.data);
              newProjectData.tasks.push(res.data);
              console.log(newProjectData.tasks);

              axios.post(`http://localhost:5000/projects/update/${newProjectData._id}`, newProjectData)
                .then(res => console.log(res.data));
                // window.location.href='/project/' + newProjectData._id;
            });
        }
      });

      oldTasksData.forEach(oldTask => {
        if (newTasksData.some(newTask => newTask._id === oldTask._id)) {
          console.log('Old Task! (Processed this already)');
        } else {
          console.log('Deleted Task!');
          axios.delete(`http://localhost:5000/tasks/${oldTask._id}`)
            .then(res => console.log(res.data));
          newProjectData.tasks = newProjectData.tasks.filter(task => task !== oldTask._id);

          axios.post(`http://localhost:5000/projects/update/${newProjectData._id}`, newProjectData)
                .then(res => console.log(res.data));
        }
      }); 
    };
    
    // Save the newTasksData second
    // Run through newTasksData and check if any of the tasks are new
    // You can do this by checking the newTasksData with the oldTasksData
    // * If newTask is not in oldTasksData, then it is a new task and you must do the ff:
      // 1. Create an object for the newTaskData
      // 3. Do an axios.post request to http://localhost:5000/tasks/add with the body newTaskData
      // 3. Get the response from the axios.post request
      // 3. Add the response, which is the new task's created _id to newProjectData.tasks
    // * If newTask is in oldTasksData, then it is an old task and you must do the ff:
      // 1. Create an object for the newTaskData
      // 3. Do an axios.post request to http://localhost:5000/tasks/update/:id with the body newTaskData
    // * If oldTask is not in newTasksData, then it is a deleted task and you must do the ff:
      // 1. Do an axios.delete request to http://localhost:5000/tasks/:id
      // 2. Remove the oldTaskData._id from newProjectData.tasks

        
    
    saveNewMembersData();
    saveNewTasksData();
    // saveNewProjectData();
    // Save the newProjectData last
    // Do an axios.post request to http://localhost:5000/projects/update/:id with the body newProjectData
    // Redirect to the project page
    
  };
  
  function deleteProject() {
    console.log('Deleting Project');
    setShowDeleteModal(false);
    // TODO
    // Delete the project from the DB
  };

  function onProjectDeleteClick() {
    console.log(`RUN PageProjectEdit -> onDeleteClick()`);
    setShowDeleteModal(true);
  };

  function onProjectSaveClick() {
    console.log(`RUN PageProjectEdit -> onProjectSaveClick()`);

        
    if (allTasksAreAssigned) {
      console.log('allTasksAreAssigned is true');      
      setShowSaveModal(true);
    }
    else {
      console.log('allTasksAreAssigned is false');
      console.log('Checking for unassigned tasks');

      if (newTasksData.some(task => task.owner === "Unassigned")) {
        console.log('Cannot save project because not all tasks are assigned');
        setShowSaveWithUnassignedTasks(true);
      } else {
        setShowSaveModal(true);
        setAllTasksAreAssigned(true);
      }
    }
  };

  // * Render
  return (
    <>
      {showDeleteModal && (
        <PopupWarnWOptions
          showModal={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Delete Project"
          subtitle="You can’t retrieve deleted projects"
          confirmButtonText="Confirm"
          confirmVariant="danger"
          cancelButtonText="Cancel"
          onConfirm={deleteProject}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showSaveModal && (
        <PopupWarnWOptions
          showModal={showSaveModal}
          handleClose={() => setShowSaveModal(false)}
          title="Save Project"
          subtitle="You can’t undo saved changes"
          confirmButtonText="Confirm"
          confirmVariant="success"
          cancelButtonText="Cancel"
          onConfirm={saveProject}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
      {showSaveWithUnassignedTasks && (
        <PopupWarn
          title="Can't do that"
          subtitle="You have unassigned tasks"
          cancelButtonText="Ok"
          onCancel={() => setShowSaveWithUnassignedTasks(false)}
        />
      )}
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
            allTasksAreAssigned={allTasksAreAssigned}
            setAllTasksAreAssigned={setAllTasksAreAssigned}
            onProjectSaveClick={onProjectSaveClick}
            onProjectDeleteClick={onProjectDeleteClick}
            currentUser={props.currentUser}
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
                allTasksAreAssigned={allTasksAreAssigned}
                setAllTasksAreAssigned={setAllTasksAreAssigned}
              />
            : ''
          }
        </div>
      </div>
    </>
  );
}