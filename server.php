<?php
session_start();

$connect = mysqli_connect("localhost","root","","connectco");

if(!empty($_POST['login_user'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$_SESSION['username'] = $username;
	$query = "select * from user where Username='$username' and password='$password'";
	$result = mysqli_query($connect,$query);
	$count=mysqli_num_rows($result);
	if($count>0){
		header("location:dashboard.php");
	} else {
		echo "Login Failed";
	}
}

if(!empty($_POST['register'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$query = "select * from user where Username='$username'";
	$result = mysqli_query($connect,$query);
	$count=mysqli_num_rows($result);
	if($count>0){
		echo "User is already registered";
	} else {
		$query = "INSERT INTO user SET username='$username', password = '$password',lname = '$lname',fname = '$fname'";
		if($connect->query($query)){
		} else {
			echo $connect->error;
		}
		header("location:login.php");
	}
}

if(!isset($_SESSION['username'])){
	$pageName = basename($_SERVER['SCRIPT_FILENAME']);
	if($pageName == "login.php" || $pageName == "signup.php"){
	} else {
	header("location:login.php");
	}
}

if(isset($_POST['addtask'])){
	$taskname = $_POST['taskname'];
	$taskdesc = $_POST['taskname'];
	$doer = $_POST['doer'];
	$duedate = $_POST['duedate'];
	$duetime = $_POST['duetime'];
	$query = "INSERT INTO tasks SET taskname='$taskname', taskdesc = '$taskdesc',doer = '$doer',duedate = '$duedate',duetime='$duetime'";
		if($connect->query($query)){
		} else {
			echo $connect->error;
		}
}


?>