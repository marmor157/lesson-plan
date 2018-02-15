<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="libs/jquery-3.1.0.min.js"></script>
    <script src="js/Settings.js"></script>
    <script src="js/Main.js"></script>
    <script src="js/UI.js"></script>
    <script src="js/Clock.js"></script>
    <script src="js/Colors.js"></script>
    <script src="js/Ajax.js"></script>
    <script src="js/Database.js"></script>
    <script src="js/Data.js"></script>

    <link href="css/main.css" rel="stylesheet" />
    <link href="css/paneToday.css" rel="stylesheet" />
    <link href="css/paneWeek.css" rel="stylesheet" />
    <link href="css/paneSettings.css" rel="stylesheet" />
    <link href="css/mainPane.css" rel="stylesheet" />
    <link href="css/alert.css" rel="stylesheet" />
    <link href="css/paneHours.css" rel="stylesheet" />
    <link href="css/hoursPicker.css" rel="stylesheet" />
    <link href="css/colors.css" rel="stylesheet" />
    <link href="css/subjectPicker.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" />

    <script>
        var userID;
        $(document).ready(function () {
            
            Settings.init()
            UI.init()
            Main.init()
            Clock.init()
            Colors.init()
            $("#menu").css("display", "block")
            
            

            

            
        })
        
    </script>

    <noscript>

        Uruchom JS w przeglądarce

    </noscript>

</head>

<body>
    <div id="container">

        <!-- Alert Div !-->

        <div id="alert">
            <span id="alertText"></span>
            <div id="alertButton">Zamknij</div>
        </div>
        <?php
            session_start();
            if(isset($_POST['login']) && isset($_POST['password']))
            {
                $_SESSION['login'] = $_POST['login'];
                $_SESSION['password'] = $_POST['password'];
                echo '<div id="login">
                    <form id="loginContainer" method="post">
                        <label>Login: <input type="text" name="login" id="loginInput"/></label>
                        <label>Hasło: <input type="password" name="password" id="passwordInput"/></label>
                        <input type="submit" value="Accept" id="loginAccept"/>
                    </form>
                </div>';
                echo "<script>Data.methods.login({login:\"".$_SESSION['login']."\",password:\"".$_SESSION['password']."\"})</script>";
            }else if(isset($_SESSION['login']) && isset($_SESSION['password']))
            {
                echo "<script>Data.methods.login({login:\"".$_SESSION['login']."\",password:\"".$_SESSION['password']."\"})</script>";
            }else{
                echo '<script> alert("W pełni skofigurowanym kontem jest uzytkownik \"test\" o takim samym haśle.")  </script>';
                echo '<div id="login">
                    <form id="loginContainer" method="post">
                        <label>Login: <input type="text" name="login" id="loginInput"/></label>
                        <label>Hasło: <input type="password" name="password" id="passwordInput"/></label>
                        <input type="submit" value="Accept" id="loginAccept"/>
                    </form>
                </div>';
            }

           
        ?>
        

        <!-- Screen with Clock !-->

        <div id="mainScreen">
            <span id="clock"></span>
            <div id="lessonNow">
            </div>
               
            <div id="lessonNext">
            </div>
        </div>

        <!-- Button showing menu on mobile version !-->

        <div id="menuShowButton"></div>

        <!-- Pane of main settings !-->

        <div id="paneSettings" class="hide">
            <div class="title">Ustawienia</div>
            <div class="settingsButton">
                <img class="settingButtonIcon"src="gfx/clock.png" alt="" />
                Godziny</div>
            <div class="settingsButton">
                <img class="settingButtonIcon"src="gfx/color.png" alt="" />
                Kolorystka</div>
            
        </div>

        <!-- Pane with today's lessons!-->

        <div id="paneToday" class="pane hide">
            <div class="title">Dzisiaj</div>
            <div class="closeButton"></div>
            <div id="dayContainer"></div>
        </div>

        <!-- Pane with this week's lessons !-->

        <div id="paneWeek" class="pane hide">
            <div class="title">Tydzień</div>
            <div class="closeButton"></div>
            <div id="weekContainer"></div>
        </div>

        <!-- Pane to change colors !-->

        <div id="paneColors" class="pane hide">
            <div class="title">Personalizacja</div>
            <div class="closeButton"></div>
            <div class="colorContainer">
                <div class="colorBackgroudPicker colorPicker"><div>Kolor tła</div></div>
                <div class="colorTextPicker colorPicker"><div>Kolor tekstu</div></div>
                <div class="colorHighlightPicker colorPicker"><div>Kolor podświetlania</div></div>
            </div>
        </div>

        <!-- Pane with hours !-->

        <div id="paneHours" class="pane hide">
            <div class="title">Godziny</div>
            <div class="closeButton"></div>
            <div id="hoursContainer"></div>
        </div>

        <!-- Pane to choose hours !-->

        <div id="hoursPicker" class="pane hide">
            <div id="hoursPickerHours" class="hoursPickClock">00</div>
            <div id="hoursPickerSemicolon" class="hoursPickClock">:</div>
            <div id="hoursPickerMinutes" class="hoursPickClock">00</div><br/>
            <div id="hoursPickingHours"></div>
            <div id="hoursPickingMinutes"></div>
            <div id="hoursPickingAccept"></div>
            <div class="closeButton"></div>
            <div id="help"></div><div id="help_id"></div>
            <div id="hoursPickerAccept">Accept</div>
        </div>

        <div id="subjectPicker" class="pane hide">
            <div id="subjectPickerAccept">Accept</div>
            <div id="subjectContainer"></div>
            <div class="closeButton"></div>
            <div id="help"></div><div id="help_id"></div><div id="help_day"></div> 
        </div>

        <!-- Main manu on bottom !-->

        <div id="menuBar">
            <div class="menuBarOption">
                <div class="menuOptionText">Ustawienia</div>
                <div class="menuIcon">
                    <img src="gfx/settings.png" alt="nic"/>
                </div>
            
            </div><div class="menuBarOption">
                <div class="menuOptionText">Dzisiaj</div>
                <div class="menuIcon">
                    <img src="gfx/today.png" alt="nic" />
                </div>
            </div><div class="menuBarOption">
                <div class="menuOptionText">Tydzień</div>
                <div class="menuIcon">
                    <img src="gfx/week.png" alt="nic" />
                </div>
            </div>
        </div>
        
        
    </div>
</body>
</html>
