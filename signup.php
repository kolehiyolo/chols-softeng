<?php include('server.php') ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConnectCo | Signup</title>  
    <script src="https://kit.fontawesome.com/178c543cad.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="signup.css">
</head>
<body>  
    <div class="wrapper">
        <div class="signup-box">
            <header>Sign up</header> 
            <form action="" method="post">
                <div class="name-input">
                    <div class="input-box">
                        <input type="text" class="input-field" name="fname" id="firstname" placeholder="First name" required title="Enter your first name">    
                        <i class="fa-solid fa-user"></i>        
                    </div>
                    <div class="input-box">
                        <input type="text" class="input-field" name="lname" id="lastname" placeholder="Last name" required title="Enter your last name">     
                        <i class="fa-solid fa-user"></i>               
                    </div>
                </div>
                <div class="input-box">
                    <input type="email" class="input-field" name="username" id="email" placeholder="Email" required title="Enter your email">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="input-box">                       
                    <input type="password" class="input-field" name="password" id="password" placeholder="Password" minlength="8" maxlength="16" required title="Password must be 8-16 characters long">
                    <i class="fa-solid fa-lock"></i>                    
                </div>
                <div class="input-box">
                    <input type="submit" name="register" class="input-submit" value="Register">
                </div>
            </form>
            <div class="signup-login">
                <span>Have an account? <a href="login.php">Login</a></span>
            </div>
        </div>    
    </div>     
</body>
</html>
