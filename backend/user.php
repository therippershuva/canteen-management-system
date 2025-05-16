<?php
require 'db.php';

if($_SERVER['REQUEST_METHOD']==="GET"){
    $stmt = "SELECT u.user_id,u.credit FROM `user` u ;";
    if($result= $conn->query($stmt)){
        $arr= array();
        //while($name= $result->fetch_assoc()['name']){
        while($name= $result->fetch_assoc()){
            array_push($arr,$name); 
        }
        echo json_encode(['users'=>$arr]);
    }
    else{
        echo json_encode(['error'=>'an error occured']);
    }
    exit();
}

if($_SERVER['REQUEST_METHOD']==="PATCH"){
    parse_str(file_get_contents('php://input'),$_PATCH);
    global $conn;
    $id= $_PATCH['id'];
    $newCredit= $_PATCH['newCredit'];
    mysqli_query($conn,"UPDATE user set credit=$newCredit where user_id=$id;");
    
    
    exit();
}