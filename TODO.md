It's not working. Here's my latest code
function saveProject() {
    console.log('Saving Project');
    setShowSaveModal(false);
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

    let finalProjectData = {...newProjectData};
    
    function saveNewMembersData() {
      return new Promise((resolve, reject) => {
        newMembersData.forEach(newMember => {
          if (oldMembersData.some(oldMember => oldMember._id === newMember._id)) {
            finalProjectData.members.find(member => member._id === newMember._id).role = newMember.project_role;
          } else {
            finalProjectData.members.push({
              _id: newMember._id,
              role: newMember.project_role
            });
    
            const newMemberProjectsList = {
              projects: newMember.projects
            };
            axios.post(`http://localhost:5000/users/update/projects/${newMember._id}`, newMemberProjectsList)
              .then(res => console.log(res.data));
          }
        });
    
        oldMembersData.forEach(oldMember => {
          if (newMembersData.some(newMember => newMember._id === oldMember._id)) {
            // console.log('Old Member! (Processed this already)');
          } else {
            finalProjectData.members = finalProjectData.members.filter(member => member._id !== oldMember._id);
            const deletedMemberProjectsList = {
              projects: oldMember.projects.filter(project => project !== projectID)
            };
            axios.post(`http://localhost:5000/users/update/projects/${oldMember._id}`, deletedMemberProjectsList)
              .then(res => console.log(res.data));
          }
        });
        resolve();
      });
    }
  
    function saveNewTasksData() {
      return new Promise((resolve, reject) => {
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
                console.log('New Task Added! ID: ' + res.data._id);
                finalProjectData.tasks.push(res.data._id);
                // console.log(finalProjectData.tasks);
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
            finalProjectData.tasks = finalProjectData.tasks.filter(task => task !== oldTask._id);  
          }
        }); 
        resolve();
      });
    }
  
    function finalProjectSave() {
      console.log('finalProjectSave()');
      console.log('finalProjectData');
      console.log(finalProjectData);
      axios.post(`http://localhost:5000/projects/update/${newProjectData._id}/newTask`, finalProjectData)
        .then(res => console.log(res.data));
    };
  
    Promise.all([saveNewMembersData(), saveNewTasksData()])
      .then(() => finalProjectSave())
      .catch(error => console.error(error));
  };




  saveNewTasksData has axios.post(`http://localhost:5000/tasks/add`, newTaskData) and that's notdone yet but finalProjectSave() is already running