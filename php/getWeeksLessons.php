<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['id'])){
	$sth = $dbh->prepare("SELECT  Subjects.subjectShort, Lessons.nSali FROM Lessons 
    LEFT JOIN Subjects ON(Lessons.subjectFK = Subjects.id) 
    LEFT JOIN Users ON (Lessons.userFK = Users.id) 
    WHERE Lessons.userFK = :User
    ORDER BY Lessons.id ASC");
	$sth->bindValue(':User', $_POST['id'], PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);
	
	echo json_encode($result);

}

?>
