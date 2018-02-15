<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['id'])){
    $start = $_POST['day'];
    if($_POST['day']==6 || $_POST['day']==0) $_POST['day']=1;
    do{
        $sth = $dbh->prepare("SELECT Subjects.subjectShort, Subjects.subjectLong, Lessons.nSali, Days.dayLongName
        FROM Lessons 
        LEFT JOIN Days ON(Lessons.dayFK = Days.id) 
        LEFT JOIN Subjects ON (Lessons.subjectFK = Subjects.id) 
        WHERE(Lessons.userFK = :User AND  Lessons.dayFK = :Day)
        ORDER BY Lessons.id ASC");

        $sth->bindValue(':User', $_POST['id'], PDO::PARAM_STR);
        $sth->bindValue(':Day', $_POST['day'], PDO::PARAM_STR);
        $sth->execute();
        $result = $sth->fetchAll( PDO::FETCH_ASSOC);
        if($_POST['day']==$start) break;
        $_POST['day']++;
        if($_POST['day']==6 || $_POST['day']==0) $_POST['day']=1;

    }while($result[0]['subjectLong']=="");
	
	
	echo json_encode($result);

}

?>
