<?php include('server.php');?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConnectCo | Dashboard</title> 
    <link rel="stylesheet" href="dashboard.css">
    <script src="dashboard.js" defer></script>
    <script src="https://kit.fontawesome.com/178c543cad.js" crossorigin="anonymous"></script>
</head>
<body>
    <main class="wrapper">
        <!-- Navigation Section -->
        <section class="nav-grid">
            <div class="nav-wrap">
                <img class="logo-section" src="images/logo.png" alt="ConnectCo Logo">
                <nav class="nav-section">
                    <a href="dashboard.php" class="nav-link"><img src="images/dashboard.png">DASHBOARD</a>
                    <a href="project.php" class="nav-link"><img src="images/Folder_fill.png">PROJECTS</a>
                    <a href="task.php" class="nav-link"><img src="images/Book_check_fill.png">MY TASK</a>  
                    <a href="calendar.php" class="nav-link"><img src="images/Date_range_fill.png">CALENDAR</a>    
                    <a href="messaging.php" class="nav-link"><img src="images/Camera_fill.png">MEET & CHAT</a>
                </nav>
            </div>
        </section>

        <!-- User Profile Card -->
        <section class="header-grid">
            <div class="profile-wrap">
                <img class="user-image" src="images/berserk_guts.png" alt="User Image">                
                <div class="profile-details">
                    <header class="user-name">
                        <?php
                        $unmatch = $_SESSION['username'];
                        $query = "select fname from user where Username='$unmatch'";
                        $result = mysqli_query($connect,$query);
                        $dispname=mysqli_fetch_row($result)[0];
                        echo $dispname;
                        ?>
                    </header>
                    <p class="user-job">
                        UI/UX Designer
                    </p>
                </div>
                <div class="notif-icon" onclick="toggleNotifi()">
                    <i class="fa-solid fa-bell fa-2xl"></i>
                </div>  
                <div class="notifi-box" id="box">
                    <div class="notifi-item">
                        <div class="text">
                            <p>No Notifications</p>
                        </div>
                    </div>

                </div>
            </div>       
        </section>

        <section class="main-grid">
            <section class="card-section">
                <div class="project-wrap">
                    <header>Project 1</header>                    
                    <div class="project-priority">
                        <span class="priority-high">HIGH PRIORITY</span>
                    </div>
                    <div class="project-progress">
                        <span class="progress">Task done: 28/50</span>
                    </div>
                    <div class="progress-bar">
                        <span class="progress-percent"></span>
                    </div>
                    <div class="profile-pictures">
                        <img class="profile" src="images/berserk_guts.png" alt="profile-1"> 
                        <img class="profile" src="images/other-user.png" alt="profile-2">
                    </div>
                    <div class="project-due">
                        <span class="due-date">
                            DUE DATE: <time>OCTOBER 5, 2023</time>
                        </span>                  
                    </div>              
                </div>
            </section>

            <section class="card-section">
                <div class="project-wrap">
                    <header>Project 2</header>
                    <div class="project-priority">
                        <span class="priority-medium">MEDIUM PRIORITY</span>
                    </div>
                    <div class="project-progress">
                        <span class="progress">Task done: 7/15</span>
                    </div>
                    <div class="progress-bar">
                        <span class="progress-percent"></span>
                    </div>
                    <div class="profile-pictures">
                        <img class="profile" src="images/berserk_guts.png" alt="profile-1"> 
                        <img class="profile" src="images/other-user.png" alt="profile-2">
                    </div>
                    <div class="project-due">
                        <span class="due-date">
                            DUE DATE: <time>OCTOBER 25, 2023</time>
                        </span>                  
                    </div>            
                </div>
            </section>

            <section class="card-section">
                <div class="time-wrap">
                    <header>Time Project</header> 
                    <div class="timer">                    
                        <input class="task-value" type="text" placeholder="(empty)">
                        <span class="timer__part timer__part--minutes">00</span>
                        <span class="timer__part">:</span>
                        <span class="timer__part timer__part--seconds">00</span>
                        <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                            <i class="fa-solid fa-play"></i>
                        </button>
                        <button type="button" class="timer__btn timer__btn--reset">
                            <i class="fa-solid fa-clock"></i>
                        </button>
                    </div>
                </div>
            </section>

            <section class="card-section">
                <div class="calendar-wrap">
                    <header>
                        <a href="calendar.php" class="current-date"></a>
                        <div class="icons">
                            <span id="prev">
                                <i class="fa-solid fa-chevron-left fa-xs"></i>
                            </span>
                            <span id="next">
                                <i class="fa-solid fa-chevron-right fa-xs"></i>
                            </span>
                            
                        </div>
                    </header>
                    <div class="calendar">
                        <ul class="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                        </ul>
                        <ul class="days"></ul>
                    </div>
                </div>
            </section>

            <section class="card-section">
                <div class="task-wrap">
                    <header>My Task</header>
                    <section class="task">
                        <div class="todo">
                            <input class="todo-value" type="text" placeholder="(empty)" value="Create wireframe">
                            <input class="todo-checkbox" type="checkbox" id="checkbox1">
                            <label for="checkbox1" class="label-checkbox"></label>
                        </div>
                        <div class="todo">
                            <input class="todo-value" type="text" placeholder="(empty)"
                            value="Create logo">
                            <input class="todo-checkbox" type="checkbox" id="checkbox2">
                            <label for="checkbox2" class="label-checkbox"></label>
                        </div>
                        <div class="todo">
                            <input class="todo-value" type="text" placeholder="(empty)"
                            value="Dashboard">
                            <input class="todo-checkbox" type="checkbox" id="checkbox3">
                            <label for="checkbox3" class="label-checkbox"></label>
                        </div>
                        <div class="todo">
                            <input class="todo-value" type="text" placeholder="(empty)" value="Mobile dev">
                            <input class="todo-checkbox" type="checkbox" id="checkbox4">
                            <label for="checkbox4" class="label-checkbox"></label>
                        </div>
                        <div class="todo">
                            <input class="todo-value" type="text" placeholder="(empty)"
                            value="Low fidelity">
                            <input class="todo-checkbox" type="checkbox" id="checkbox5">
                            <label for="checkbox5" class="label-checkbox"></label>
                        </div>
                    </section>
                </div>
            </section>

            <section class="card-section">
                <div class="messages-wrap">
                    <header>Messages</header> 
                    <?php
                        $unmatch = $_SESSION['username'];
                        $query = "select id from user where username = '$unmatch'";
                        $result = mysqli_query($connect, $query);

                        $receiver = mysqli_fetch_row($result)[0];
                        
                        $query = "select DISTINCT senderid,txt from msg where receiverid = '$receiver' limit 3";
                        $result = mysqli_query($connect, $query);
                        
                        while ($row = mysqli_fetch_row($result)) {
                            $senderid = $row[0];
                            $msg = $row[1];
                            echo'
                            <div class="active-conversation-card">
                            <img src="images/other-user.png" alt="User Profile" class="user-profile">
                            <div class="user-details">
                                <div class="user-name">';
                            $query = "select fname,lname from user where id='$senderid'";
                            $result2 = mysqli_query($connect, $query);
                            $row2 = mysqli_fetch_row($result2);
                            echo $row2[0] . ' ' . $row2[1];
                            echo '</div>
                            <div class="last-message">';
                            echo $msg;
                            echo '
                            </div>
                            </div>
                            </div>';
                        }
                    ?>
                </div>
            </section>
        </section>
    </main>
</body>
</html>