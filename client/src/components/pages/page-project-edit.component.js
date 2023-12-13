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
  
  const { id: projectID } = useParams();

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchAllOldData();
    },
    [projectID]
  );

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

          const fetchedMembersData = [];
          Promise.all(
            project.members.map((member) =>
              axios.get(`http://localhost:5000/users/${member.id}`)
                .then(
                  (res) => {
                    const fetchedMemberData= res.data;
                    const refinedMemberData = {
                      _id: member.id,
                      name: fetchedMemberData.name,
                      profile_picture: fetchedMemberData.profile_picture,
                      project_role: member.role
                    };
                    fetchedMembersData.push(refinedMemberData);
                  }
                )
            )
          )
            .then(() => {
              setOldMembersData(fetchedMembersData);
              setNewMembersData(fetchedMembersData);
            })
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
        />
        {/* {
          (oldProjectData.length !== 0)
          ? <CardProjectEditTasks 
              projectData={oldProjectData}
              currentUser={props.currentUser}
            />
          : ''
        } */}
      </div>
    </div>

  );
}