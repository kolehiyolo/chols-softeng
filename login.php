<?php include('server.php'); 
if(isset($_SESSION['username'])){
    header("location:dashboard.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConnectCo | Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <header class="header container">
        <a class="logo link" href="login.php">ConnectCo</a>
        <nav class="navigation">
            <button type="button" class="login link" onclick="location.href='login.php'">Login</button>
            <button type="button" class="signup link" onclick="location.href='signup.php'">Sign Up</button>
        </nav>
    </header>

    <main class="main main-container">
        <div class="center">
            <div class="form-container">
                <h1 class="welcome">Welcome</h1>
                <p class="description">We are glad to see you back with us</p>
                <form action="" method="post">
                    <div class="input-container">
                        <div class="input-icon">
                            <svg width="24.638" height="24">
                                <use href="icons/icons.svg#username" />
                            </svg>
                        </div>
                        <input class="form-input" type="text" required name="username" id="username" placeholder="Username">
                    </div>

                    <div class="input-container">
                        <div class="input-icon">
                            <svg width="24.638" height="24">
                                <use href="icons/icons.svg#password" />
                            </svg>
                        </div>
                        <input class="form-input" type="password" required name="password" id="pw" placeholder="Password">
                    </div>
                    <input type="submit" name="login_user" class="submit" value="Login">
                </form>
            </div>
            <div>
                <img src="images/office.png" alt="office" width="702" height="700" />
            </div>
        </div>

    </main>
</body>

</html>