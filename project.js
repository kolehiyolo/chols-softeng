// Sample project data
const projects = [
    { id: 1, name: 'Project A', description: 'Description A', status: 'Work in Progress', start_date: '2023-01-01', due_date: '2023-02-01' },
    { id: 2, name: 'Project B', description: 'Description B', status: 'Done', start_date: '2023-02-01', due_date: '2023-03-01' },
    // Add more projects as needed
];

// Display initial project list
displayProjects();

function displayProjects() {
    const tableBody = document.getElementById('projectTableBody');
    tableBody.innerHTML = '';

    projects.forEach(project => {
        const row = `<tr>
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td>${project.description}</td>
            <td>${project.status}</td>
            <td>${project.start_date}</td>
            <td>${project.due_date}</td>
            <td><button onclick="openEditModal(${project.id})">Edit</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function addProject() {
    const projectName = document.getElementById('project_name').value;
    const projectDescription = document.getElementById('project_description').value;
    const status = document.getElementById('status').value;
    const startDate = document.getElementById('start_date').value;
    const dueDate = document.getElementById('due_date').value;

    // Implement logic to add project (send data to the server)
    projects.push({
        id: projects.length + 1,
        name: projectName,
        description: projectDescription,
        status: status,
        start_date: startDate,
        due_date: dueDate
    });

    displayProjects();
    alert('Project added!');
}

function addMember() {
    // Implement logic to add member (send data to the server)
    alert('Member added!');
}

function openEditModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    document.getElementById('edit_project_name').value = project.name;
    document.getElementById('edit_project_description').value = project.description;
    document.getElementById('edit_status').value = project.status;
    document.getElementById('edit_start_date').value = project.start_date;
    document.getElementById('edit_due_date').value = project.due_date;

    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEditedProject() {
    // Implement logic to save edited project (send data to the server)
    alert('Changes saved!');
    closeEditModal();
}