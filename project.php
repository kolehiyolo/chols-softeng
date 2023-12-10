<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="project.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
   
     
    />
    <title>ConnectCo | Messaging</title>
    <script>
    function toggleStatus(element) {
        const slider = element.querySelector('.slider');
        if (slider.classList.contains('online')) {
            slider.classList.remove('online');
            element.style.backgroundColor = 'red';
        } else {
            slider.classList.add('online');
            element.style.backgroundColor = 'rgb(0, 207, 0)';
        }
    }
    </script>


</head>
<body>

<div class="container">
    <!-- Navigation Section -->
    <div class="nav-section">
    <div class="logo-section">
        <img src="images/logo.png" alt="ConnectCo Logo" class="logo">
    </div>
    <a href="dashboard.php" class="nav-link"><img src="images/dashboard.png"></span>DASHBOARD</a>
    <a href="project.php" class="nav-link"><img src="images/Folder_fill.png"></span>PROJECTS</a>
    <a href="task.php" class="nav-link"><img src="images/Book_check_fill.png"></span>MY TASK</a>
    <a href="calendar.php" class="nav-link"><img src="images/Date_range_fill.png"></span>CALENDAR</a>
    <a href="messaging.php" class="nav-link"><img src="images/Camera_fill.png"></span>MEET & CHAT</a>
    </div>


    <div class="project-container">
        <h3>Add Project</h3>
        <div class="project-form">
            <label for="project_name">Project Name:</label>
            <input type="text" id="project_name" placeholder="Enter project name">

            <label for="project_description">Description:</label>
            <textarea id="project_description" placeholder="Enter project description"></textarea>

            <label for="status">Status:</label>
            <select id="status">
                <option value="Work in Progress">Work in Progress</option>
                <option value="Done">Done</option>
                <!-- Add more status options as needed -->
            </select>

            <label for="start_date">Start Date:</label>
            <input type="date" id="start_date">

            <label for="due_date">Due Date:</label>
            <input type="date" id="due_date">

            <button onclick="addProject()">Add Project</button>
        </div>
    </div>

    <div class="project-container">
        <h3>Add Member</h3>
        <div class="member-form">
            <label for="member_name">Member Name:</label>
            <input type="text" id="member_name" placeholder="Enter member name">

            <label for="member_email">Email:</label>
            <input type="email" id="member_email" placeholder="Enter member email">

            <label for="member_role">Role:</label>
            <input type="text" id="member_role" placeholder="Enter member role">

            <button onclick="addMember()">Add Member</button>
        </div>
    </div>

    <div class="project-container">
        <h3>Project List</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="projectTableBody">
                <!-- Project list will be dynamically added here -->
            </tbody>
        </table>
    </div>

    <!-- Edit Project Modal -->
    <div class="edit-modal" id="editModal">
        <div class="edit-modal-content">
            <h3>Edit Project</h3>
            <label for="edit_project_name">Project Name:</label>
            <input type="text" id="edit_project_name">

            <label for="edit_project_description">Description:</label>
            <textarea id="edit_project_description"></textarea>

            <label for="edit_status">Status:</label>
            <select id="edit_status">
                <option value="Work in Progress">Work in Progress</option>
                <option value="Done">Done</option>
                <!-- Add more status options as needed -->
            </select>

            <label for="edit_start_date">Start Date:</label>
            <input type="date" id="edit_start_date">

            <label for="edit_due_date">Due Date:</label>
            <input type="date" id="edit_due_date">

            <button onclick="saveEditedProject()">Save Changes</button>
            <button class="close-btn" onclick="closeEditModal()">Close</button>
        </div>
    </div>
    <script src="project.js"></script>
</body>
   
        

</div>

</body>
</html>
