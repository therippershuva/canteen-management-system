<?php
require 'db.php';

if($_SERVER['REQUEST_METHOD']==="DELETE"){
    parse_str(file_get_contents('php://input'),$_DELETE);
    global $conn;
    $order_id= $_DELETE['id'];
    mysqli_query($conn,"delete from `order_details` where order_id='$order_id';");
    
    mysqli_query($conn,"delete from `order_table` where id='$order_id';");
    
    exit();
}

if($_SERVER['REQUEST_METHOD']==="POST" && !isset($_POST['q'])) {
    // printf('cringe');
    $order_id=$_POST['id'];
    // printf($order_id);
    // $stmt = "SELECT ot.id,ot.user_id,ot.location,ot.total,ot.order_status,ot.added_on,p.name,od.quantity,od.price FROM `order_table` ot INNER JOIN order_details od on ot.id=od.order_id INNER join items p on p.id=od.prod_id ORDER by ot.added_on ASC;";
    $stmt="SELECT od.id,od.order_id,p.name,od.quantity,od.price FROM `order_details` od INNER JOIN items p on od.prod_id=p.id
        WHERE od.order_id='$order_id' ;";
    if($result= $conn->query($stmt)){
        $arr= array();
        //while($name= $result->fetch_assoc()['name']){
        while($name= $result->fetch_assoc()){
            array_push($arr,$name); 
        }
        echo json_encode(['order_details'=>$arr]);
    }
    else{
        echo json_encode(['error'=>'an error occured']);
    }
    exit();
}