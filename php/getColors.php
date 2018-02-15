<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['id'])){
	$sth = $dbh->prepare("SELECT * FROM Colors
    WHERE userFK = :User
    ORDER BY Colors.id ASC");
	$sth->bindValue(':User', $_POST['id'], PDO::PARAM_STR);
	$sth->execute();
	$result = $sth->fetchAll( PDO::FETCH_ASSOC);
	
	echo json_encode($result);

}

?>
