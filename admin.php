<?php
include('server.php');

$unmatch = $_SESSION['username'];
$query = "select control from user where Username='$unmatch'";
$result = mysqli_query($connect,$query);
$controltype=mysqli_fetch_row($result)[0];
if($controltype==0){
    header("location:dashboard.php");
} else{
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <center>
    <?php 
    echo "Welcome Admin";?>
    <h1>Add New Task</h1>
    <form action='' method='post'>
        <?php echo "Employee Name: ";
            $unmatch = $_SESSION['username'];
            $query = "select fname,lname from user where username != '$unmatch'";
            $result = mysqli_query($connect, $query);
            
            $num_results = mysqli_num_rows($result);
            echo "<form action='' method='post'>";
            echo "<select name='doer'>";
            
            for ($i = 0; $i < $num_results; $i++) {
                $row = mysqli_fetch_row($result);
                echo '<option value="' . $row[0] . '">' . $row[0] . ' ' . $row[1] . '</option>';
            }
            echo '</select>';
            echo '</br>';
            echo 'Task Title: ';
        ?>
        <input type="text" name="taskname" placeholder="TASK TITLE">
        </br>
        <?php echo "Task Description: "?>
        <input type="text" name="taskdesc" placeholder="TASK DESCRIPTION" style="width: 300px;">
        </br>
        <?php echo "Due Date: "?>
        <input type="date" name="duedate">
        <input type="time" name="duetime">
        <input type="submit" name="addtask">
    </form>

</body>
</html>