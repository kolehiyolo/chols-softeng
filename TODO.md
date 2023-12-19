I have several projects. These projects render the same component but with props passed. Here's one of the divs inside that render
<div className="task-filter-toggle btn-group" role="group" aria-label="Basic radio toggle button group">
  <input 
      type="radio"
      className="btn-check"
      name={"btnradio-tasks-filter-" + props.projectData._id}
      id={"btnradio-tasks-filter-1-" + props.projectData._id}
      autoComplete="off"
      checked={filterMode === 'All Tasks'}
      onChange={handleToggleChange}
      value="All Tasks"
    />
    <label 
      className="btn btn-outline-primary" htmlFor={"btnradio-tasks-filter-1-" + props.projectData._id}
    >
      All Tasks
    </label>
    <input 
      type="radio"
      className="btn-check"
      name={"btnradio-tasks-filter-" + props.projectData._id}
      id={"btnradio-tasks-filter-2-" + props.projectData._id}
      autoComplete="off"
      checked={filterMode === 'My Tasks'}
      onChange={handleToggleChange}
      value="My Tasks"
    />
    <label 
      className="btn btn-outline-primary" htmlFor={"btnradio-tasks-filter-2-" + props.projectData._id}
    >
      My Tasks
    </label>
</div>
        Each project has those radio button groups. When the radio button is altered, the ff function triggers
        function handleToggleChange(event) {
    setFilterMode(event.target.value);
  };

  The problem is, when I click on any of the projects, it doesn't toggle that project's handleToggleChange, but instead it all toggles the first project's. Fix this