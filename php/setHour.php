<?php
include("haslo.php");

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$dbh->exec("set names utf8");

if(isset($_POST['type']))
{
    if($_POST['type']=="od")
    {
        if(isset($_POST['id'])&&isset($_POST['num'])){
            $sth = $dbh->prepare("UPDATE `Hours` SET `odG`=".$_POST['hour'].",`odM`= ".$_POST['minute']."  WHERE id = (SELECT id FROM (SELECT * FROM `Hours`WHERE userFK=".$_POST['id']." ORDER BY id ASC LIMIT ".($_POST['num']).") as tak  ORDER BY id DESC LIMIT 1)");
            $sth->bindValue(':id', $_POST['id'], PDO::PARAM_STR);
            $sth->bindValue(':num', $_POST['num'], PDO::PARAM_STR);
            $sth->bindValue(':Hour', $_POST['hour'], PDO::PARAM_STR);
            $sth->bindValue(':Minute', $_POST['minute'], PDO::PARAM_STR);
            $sth->execute();
            //echo ("UPDATE `Hours` SET `odG`=".$_POST['hour'].",`odM`= ".$_POST['minute']."  WHERE id = (SELECT id FROM (SELECT * FROM `Hours`WHERE userFK=".$_POST['id']." ORDER BY id ASC LIMIT ".($_POST['num']).") as tak  ORDER BY id DESC LIMIT 1)") ;
        }
    }else if($_POST['type']=="do")
    {
        if(isset($_POST['id'])&&isset($_POST['num'])){
            $sth = $dbh->prepare("UPDATE `Hours` SET `doG`=".$_POST['hour'].",`doM`= ".$_POST['minute']."  WHERE id = (SELECT id FROM (SELECT * FROM `Hours`WHERE userFK=".$_POST['id']." ORDER BY id ASC LIMIT ".($_POST['num']).") as tak  ORDER BY id DESC LIMIT 1)");
            $sth->bindValue(':id', $_POST['id'], PDO::PARAM_STR);
            $sth->bindValue(':num', ($_POST['num']), PDO::PARAM_STR);
            $sth->bindValue(':Hour', $_POST['hour'], PDO::PARAM_STR);
            $sth->bindValue(':Minute', $_POST['minute'], PDO::PARAM_STR);
            $sth->execute();
        }
    }
    

}



?>