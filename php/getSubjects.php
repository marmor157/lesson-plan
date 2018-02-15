<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

	$sth = $dbh->prepare("SELECT * FROM Subjects
    ORDER BY Subjects.id ASC");
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);
	
	echo json_encode($result);


?>
