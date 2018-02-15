<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['num']) && isset($_POST['id']) && isset($_POST['subject']) && isset($_POST['day']) && isset($_POST['nSali']) )
{
    $sth = $dbh->prepare("UPDATE `Lessons` SET `nSali`= :nSali, `subjectFK`= :subject WHERE userFK = :id && dayFK = :day && hourFK = :num");
    $sth->bindValue(':id', $_POST['id'], PDO::PARAM_STR);
    $sth->bindValue(':num', $_POST['num'], PDO::PARAM_STR);
    $sth->bindValue(':day', $_POST['day'], PDO::PARAM_STR);
    $sth->bindValue(':nSali', $_POST['nSali'], PDO::PARAM_STR);
    $sth->bindValue(':subject', $_POST['subject'], PDO::PARAM_STR);
    $sth->execute();
    
    echo ("UPDATE `Lessons` SET `nSali`= ".$_POST['nSali'].", `subjectFK`= ".$_POST['subject']." WHERE userFK = ".$_POST['id']." && dayFK = ".$_POST['day']." && hourFK = ".$_POST['num']);
}

?>