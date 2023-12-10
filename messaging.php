<?php include('server.php');
$refresh = 0;
if($_GET){
    $refresh = 1;
    $identifier = $_GET['identifier'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="messaging.css">
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

    <!-- User Profile Card & Active Conversations -->
    <div class="user-section">
        <div class="profile-card">
        <div class="status-toggle" onclick="toggleStatus(this)">
        <div class="slider online"></div>
        </div>
        <img src="images/berserk_guts.png" alt="User Image" class="user-image">
        <div class="profile-details">
            <h3><?php
                        $unmatch = $_SESSION['username'];
                        $query = "select fname from user where Username='$unmatch'";
                        $result = mysqli_query($connect,$query);
                        $dispname=mysqli_fetch_row($result)[0];
                        echo $dispname;
                        ?></h3>
            <p>UI/UX Designer</p>
        </div>
        </div>
        
        <h4>Active Conversations</h4>
        <div class="active-conversation-card">
            <?php echo "New Convo";
            $unmatch = $_SESSION['username'];
            $query = "select fname,lname from user where username != '$unmatch'";
            $result = mysqli_query($connect, $query);
            
            $num_results = mysqli_num_rows($result);
            echo "<form action='messaging.php' method='post'>";
            echo "<select name='identifier'>";
            
            for ($i = 0; $i < $num_results; $i++) {
                $row = mysqli_fetch_row($result);
                echo '<option value="' . $row[0] . '">' . $row[0] . ' ' . $row[1] . '</option>';
            }
            
            echo '</select>';
            echo "<input type='submit' name='newchat' class='submit' value='OPEN CHAT'>";
            echo "</form>";
            ?>
        </div>
        <?php
            if(isset($_POST['newchat']) || $refresh == 1){
                if($refresh == 0){
                    $identifier = $_POST['identifier'];
                }
                $_SESSION['identifier'] = $identifier;
                $query = "select fname,lname from user where fname = '$identifier'";
                $result = mysqli_query($connect, $query);
                
                $row = mysqli_fetch_row($result);

                echo '<div class="active-conversation-card">
                <img src="images/other-user.png" alt="User Profile" class="user-profile">
                <div class="user-details">
                    <div class="user-name">';
                echo $row[0] . ' ' . $row[1];
                echo '</div>
                <div class="last-message"></div>
                </div>
                </div>';
            }
        ?>
    </div>

    <!-- Conversation Section -->
    <div class="chat-section">
        <?php
            if(isset($_POST['newchat'])|| $refresh == 1){
                if($refresh == 0){
                    $identifier = $_POST['identifier'];
                }
                $unmatch = $_SESSION['username'];
                $query = "select id from user where username = '$unmatch'";
                $result = mysqli_query($connect, $query);
                $senderid = mysqli_fetch_row($result)[0];
                
                $query = "select id from user where fname = '$identifier'";
                $result = mysqli_query($connect, $query);
                $receiverid = mysqli_fetch_row($result)[0];

                $query = "SELECT * FROM `msg` WHERE (senderid = '$senderid' AND receiverid = '$receiverid') OR (senderid = '$receiverid' AND receiverid = '$senderid');";
                $result = mysqli_query($connect, $query);
                $ctr = mysqli_num_rows($result);                
                for ($i = 0; $i < $ctr; $i++) {
                    $row = mysqli_fetch_row($result);
                    if($row[1]==$senderid){
                        echo '<div class="message user-message">
                        <div class="message-content">
                            <p>';
                        echo $row[3];
                        echo '</p></div>
                        </div>';
                    } else {
                        echo '<div class="message other-user-message">
                        <div class="message-content">
                            <p>';
                        echo $row[3];
                        echo '</p></div>
                        </div>';
                    }
                }
                $refresh = 0;
            }
        ?>
        <!-- Message Input Area -->
        <div class="compose-section">
            <form action='' method = 'post'>
                <input type="text" name="message" id="message" placeholder="Type Message Here">
                <input type="submit" name="sendchat" class="send-button" value="SEND">
            </form>
            <?php
                if(!empty($_POST['sendchat'])){
                    $identifier = $_SESSION['identifier'];
                    $txt = $_POST['message'];
                    $unmatch = $_SESSION['username'];
                    $query = "select id from user where username = '$unmatch'";
                    $result = mysqli_query($connect, $query);
                    $senderid = mysqli_fetch_row($result)[0];

                    $query = "select id from user where fname = '$identifier'";
                    $result = mysqli_query($connect, $query);
                    $receiverid = mysqli_fetch_row($result)[0];

                    $query = "INSERT INTO msg SET senderid='$senderid', receiverid = '$receiverid',txt='$txt'";
                    if($connect->query($query)){
                    } else {
                        echo $connect->error;
                    }
                    header("Location: messaging.php?newchat=1&identifier=".$identifier);
                }
            ?>
        </div>
    </div>


    <!-- Right Profile & Meeting Card -->
    <div class="right-section">
        <div class="profile-card">
            <img src="images/other-user.png" alt="User Image" class="user-image">
            <div class="profile-details">
                <h3>Ugda Ramun</h3>
                <p>UgdaRamun@gmail.com</p>
            </div>
        </div>

        <h4 class="create-meeting-label">Create Meeting</h4>
        
        <div class="meeting-card">
            <button>Create</button>
            <img src="images/Camera_fill.png" alt="Camera">
            <!-- Additional Meeting Details Here -->
        </div>

        <div class="meeting-details">
        <h4>Meeting Details</h4>
        <!-- Add meeting details content here -->
        <p>Date: October 25, 2023</p>
        <p>Time: 2:00 PM</p>
        <p>Location: Conference Room</p>
    </div>
    </div>
</div>

</body>
</html>
