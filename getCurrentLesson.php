<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['id']) && isset($_POST['hour']) && isset($_POST['minute']) && isset($_POST['day'])){
	$sth = $dbh->prepare("SELECT Hours.id
    FROM Hours 
    WHERE(Hours.odG < :Hours AND  Hours.doG >= :Hours AND  Hours.doM >= :Minutes AND Hours.userFK = :ID)
    OR (Hours.odG = :Hours  AND  Hours.odM <= :Minutes AND  Hours.doG = :Hours AND Hours.doM < :Minutes AND Hours.userFK = :ID)
    OR (Hours.odG = :Hours  AND  Hours.odM <= :Minutes AND  Hours.doG > :Hours  AND Hours.userFK = :ID)
	ORDER BY Hours.id ASC
    LIMIT 1");

	$sth->bindValue(':Hours', $_POST['hour'], PDO::PARAM_STR);
    $sth->bindValue(':Minutes', $_POST['minute'], PDO::PARAM_STR);
    $sth->bindValue(':ID', $_POST['id'], PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);

    $lesson =  $result[0]['id']%15;

    $sth = $dbh->prepare("SELECT Subjects.subjectLong, Lessons.nSali 
    FROM Lessons 
    LEFT JOIN Subjects ON (Lessons.subjectFK = Subjects.id) 
    WHERE(Lessons.userFK = :User AND  Lessons.dayFK = :Day AND Lessons.hourFK = :hourID)");

	$sth->bindValue(':User', $_POST['id'], PDO::PARAM_STR);
    $sth->bindValue(':Day', $_POST['day'], PDO::PARAM_STR);
    $sth->bindValue(':hourID', $lesson, PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);
	
	
	echo json_encode($result);

}

?>
