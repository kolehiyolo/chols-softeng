<?php include('server.php')?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="task.css">
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
    <a href="#" class="nav-link"><img src="images/Folder_fill.png"></span>PROJECTS</a>
    <a href="task.php" class="nav-link"><img src="images/Book_check_fill.png"></span>MY TASK</a>
    <a href="calendar.php" class="nav-link"><img src="images/Date_range_fill.png"></span>CALENDAR</a>
    <a href="messaging.php" class="nav-link"><img src="images/Camera_fill.png"></span>MEET & CHAT</a>
    </div>

    <div class="container1">
        <div class="todo-app">
            <div class="app-title">
                <h2>Personal Tasks</h2>
                <i class="fa-solid fa-book-bookmark"></i>
            </div>
            <div class="row">
                <input type="text" id="input-box" placeholder="add your tasks">
                <button>Add</button>
            </div>
            <ul id="list-container">
            </ul>
        </div>
    </div>

    <div class="container1">
        <div class="todo-app">
            <div class="app-title">
                <h2>Assigned Tasks</h2>
                <i class="fa-solid fa-book-bookmark"></i>
            </div>
            <?php
                $unmatch = $_SESSION['username'];
                $query = "select fname from user where username = '$unmatch'";
                $result = mysqli_query($connect, $query);

                $doer = mysqli_fetch_row($result)[0];
                $query = "select taskname, taskdesc, duedate, duetime from tasks where doer = '$doer'";
                $result = mysqli_query($connect, $query);
                while ($row = mysqli_fetch_row($result)) {
                    echo '<h1>'. $row[0] . '</h1><h3>' . $row[2] . ' ' . $row[3] . '</h3>' . '</h2>' . $row[1] ;
                }
            ?>
        </div>
    </div>


    <script src="task.js"></script>
</body>
   
        

</div>

</body>
</html>
