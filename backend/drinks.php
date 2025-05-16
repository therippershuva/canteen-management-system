<?php
require 'db.php';

if($_SERVER['REQUEST_METHOD']==="GET"){
    $stmt = "select id,name,price from items where status=1 and type='drink';";
    if($result= $conn->query($stmt)){
        $arr= array();
        //while($name= $result->fetch_assoc()['name']){
        while($name= $result->fetch_assoc()){
            array_push($arr,$name); 
        }
        echo json_encode(['drinks'=>$arr]);
    }
    else{
        echo json_encode(['error'=>'an error occured']);
    }
    exit();
}
