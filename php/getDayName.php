<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['day'])){
	$sth = $dbh->prepare("SELECT dayLongName FROM Days
    WHERE id = :Numb");
	$sth->bindValue(':Numb', $_POST['day'], PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);
	
	echo json_encode($result);

}

?>
