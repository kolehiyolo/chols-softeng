<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="calendar.css">
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

    <div class="container1">
      <div class="left">
        <div class="calendar">
          <div class="month">
            <i class="fas fa-angle-left prev"></i>
            <div class="date">december 2015</div>
            <i class="fas fa-angle-right next"></i>
          </div>
          <div class="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="days"></div>
          <div class="goto-today">
            <div class="goto">
              <input type="text" placeholder="mm/yyyy" class="date-input" />
              <button class="goto-btn">Go</button>
            </div>
            <button class="today-btn">Today</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="today-date">
          <div class="event-day">wed</div>
          <div class="event-date">12th december 2022</div>
        </div>
        <div class="events"></div>
        <div class="add-event-wrapper">
          <div class="add-event-header">
            <div class="title">Add Event</div>
            <i class="fas fa-times close"></i>
          </div>
          <div class="add-event-body">
            <div class="add-event-input">
              <input type="text" placeholder="Event Name" class="event-name" />
            </div>
            <div class="add-event-input">
              <input
                type="text"
                placeholder="Event Time From"
                class="event-time-from"
              />
            </div>
            <div class="add-event-input">
              <input
                type="text"
                placeholder="Event Time To"
                class="event-time-to"
              />
            </div>
          </div>
        
        
          <div class="add-event-footer">
            <button class="add-event-btn">Add Event</button>
          </div>
        </div>
      </div>
      <button class="add-event">
        <i class="fas fa-plus"></i>
      </button>
    </div>

  

    <script src="calendar.js"></script>
</body>
   
        

</div>

</body>
</html>
