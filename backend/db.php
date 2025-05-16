<?php
    header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET,POST,PATCH,DELETE');

    if(!isset($_SESSION)) 
    { 
        session_start(['cookie_samesite'=>'None','cookie_secure'=>true]); 
    } 
    $conn=new mysqli("localhost:3306", "root", "", "online_canteen_system");
    if($conn->connect_errno){
        echo json_encode(['error'=>$conn->connect_error]);
        exit();
    }
