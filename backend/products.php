<?php
require 'db.php';

if($_SERVER['REQUEST_METHOD']==="GET"){
    $stmt = "SELECT i.id,i.name,i.price,i.type,i.status,s.stock FROM `items` i INNER JOIN inventory s on i.id=s.id;";
    if($result= $conn->query($stmt)){
        $arr= array();
        //while($name= $result->fetch_assoc()['name']){
        while($name= $result->fetch_assoc()){
            array_push($arr,$name); 
        }
        echo json_encode(['products'=>$arr]);
    }
    else{
        echo json_encode(['error'=>'an error occured']);
    }
    exit();
}