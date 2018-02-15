<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['backgroundColor']) && isset($_POST['textColor']) && isset($_POST['highlightColor']) && isset($_POST['id'])  )
{
    $sth = $dbh->prepare("UPDATE `Colors` SET `backgroundColor`='".$_POST['backgroundColor']."',`textColor`= '".$_POST['textColor']."',`highlightColor`= '". $_POST['highlightColor']."' WHERE userFK = ".$_POST['id']);
    $sth->execute();
    
    echo ("UPDATE `Colors` SET `backgroundColor`='".$_POST['backgroundColor']."',`textColor`= '".$_POST['textColor']."',`highlightColor`= '". $_POST['highlightColor']."' WHERE userFK = ".$_POST['id']);
}

?>