<?php
//var_dump($_POST);
//print_r($_POST); // $_GET
//echo $_POST['imie'];
include("haslo.php");



try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$dbh->exec("set names utf8");


function register($login,$pass){
    str_replace("'", "" ,$pass);
    str_replace("\"", "", $pass);
    str_replace("javascript", "",$pass);
    str_replace(">", "",$pass);
    str_replace("<", "",$pass);

}

if(isset($_POST['login']) && isset($_POST['password'])){

    $login = $_POST['login'];
    str_replace("'", "" ,$login);
    str_replace("\"", "", $login);
    str_replace("javascript", "",$login);
    str_replace(">", "",$login);
    str_replace("<", "",$login);

	$sth = $dbh->prepare("SELECT * 
    FROM Users 
    WHERE login = :login");

	$sth->bindValue(':login', $login, PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);

	$pass = $_POST['password'];
    str_replace("'", "" ,$pass);
    str_replace("\"", "", $pass);
    str_replace("javascript", "",$pass);
    str_replace(">", "",$pass);
    str_replace("<", "",$pass);
    $pass = sha1($pass);

    if(count($result)>0)
    {
        $sth = $dbh->prepare( "SELECT *
        FROM Users 
        WHERE login = :login 
        AND password = :password");
        $sth->bindValue(':login', $login, PDO::PARAM_STR);
        $sth->bindValue(':password', $pass, PDO::PARAM_STR);
        $sth->execute();
        $result = $sth->fetchAll( PDO::FETCH_ASSOC);
        if(count($result)>0)
        {
            echo json_encode($result[0]['id']);
        }else   echo "Bad Password";

    }else{

        $sth = $dbh->prepare(  "INSERT INTO Users (login, password) 
        VALUES (:login,:password)");
        $sth->bindValue(':login', $login, PDO::PARAM_STR);
        $sth->bindValue(':password', $pass, PDO::PARAM_STR);
        $sth->execute();

        $sth = $dbh->prepare(  "SELECT MAX(id) as id FROM Users");
        $sth->execute();
        $id = $sth->fetchAll( PDO::FETCH_ASSOC);
        $id = intval($id[0]['id']);

        for($day=1;$day<=5;$day++){
            for($hour=1;$hour<=15;$hour++){
                $sth = $dbh->prepare(  "INSERT INTO `Lessons`(`nSali`, `dayFK`, `hourFK`, `subjectFK`, `userFK`) 
                VALUES ('',$day,$hour,1,$id)");
                $sth->execute();
            }
        }
        for($hour=1;$hour<=15;$hour++){
            $sth = $dbh->prepare(  "INSERT INTO `Hours`(`odG`, `odM`, `doG`, `doM`, `userFK`) 
            VALUES (0,0,0,0,$id)");
            $sth->execute();
        }
        $sth = $dbh->prepare("INSERT INTO `Colors`(`backgroundColor`, `textColor`, `highlightColor`, `userFK`) 
        VALUES ('rgb(50,50,50)','rgb(255,255,255)','rgb(42,89,232)',$id)");
        $sth->execute();
        echo json_encode($id);
    }
	

}


/*
$arr=Array(
	"post" => $_POST, // $arr["post"]
	"moje_dane" => "sexxxx"
);
echo json_encode($arr); // json_decode
*/
?>
