<?php
require 'db.php';
// require 'cart_user.php';

if($_SERVER['REQUEST_METHOD']=="POST"){
    $order=array();
    $user_id=getUserID();
    $cart_id=getCartID($user_id);
    getAllCartItems($cart_id);
    exit();
}

function getUserID(){
    return $_SESSION['logged_user']['id'];
}

function getCartID($user_id){
    global $conn;
    $stmt="select id from cart where user_id=$user_id;";
    if($result=$conn->query($stmt)){
        if($result->num_rows){
            $cart_id=$result->fetch_assoc()['id'];
        }
    }
    return $cart_id;
}

function getAllCartItems($cart_id){
    global $conn;
    $stmt="select p.id, p.name, ci.quantity, i.stock, (p.price*ci.quantity) as price from items p 
    inner join cart_item ci 
    on p.id=ci.prod_id and ci.cart_id=$cart_id 
    INNER join inventory i ON p.id=i.id;";
    if($result=$conn->query($stmt)){
        if($result->num_rows){
            while($row=$result->fetch_assoc()){
                $id=$row['id'];
                $prod_array[$id]['id']=$row['id'];
                $prod_array[$id]['name']=$row['name'];
                $prod_array[$id]['stock']=$row['stock'];
                $prod_array[$id]['quantity']=$row['quantity'];
                $prod_array[$id]['price']=$row['price'];
                // return updateTotalLoggedCart($prod_array);
            }
        }
    }
    updateTotalLoggedCart($prod_array);
}

function updateTotalLoggedCart($prod_array){

    global $conn;
    $total=0;
    foreach($prod_array as $item){
        // printf($item['name']);
        $total +=$item['price'];

    }
    $prod_array['total']=$total;
    $location=$_POST['locations'];
    $user_id=getUserID();
    $order_status="pending";
    $added_on=date("Y-m-d h:i:s");

    // print($added_on);

    mysqli_query($conn,"insert into order_table (user_id,location,total,order_status,added_on) values 
        ('$user_id','$location','$total','$order_status','$added_on');");

    $order_id=mysqli_insert_id($conn);

    foreach($prod_array as $item){
        $id=$item['id'];
        $quantity=$item['quantity'];
        $price=$item['price'];
        // printf($item['id']);
        if($id!=0){
        mysqli_query($conn,"insert into order_details (order_id,prod_id,quantity,price) values 
        ('$order_id','$id','$quantity','$price');");
    }
}
}


if($_SERVER['REQUEST_METHOD']==="GET"){
    // $stmt = "SELECT ot.id,ot.user_id,ot.location,ot.total,ot.order_status,ot.added_on,p.name,od.quantity,od.price FROM `order_table` ot INNER JOIN order_details od on ot.id=od.order_id INNER join items p on p.id=od.prod_id ORDER by ot.added_on ASC;";
    $stmt="SELECT * FROM `order_table`;";
    if($result= $conn->query($stmt)){
        $arr= array();
        //while($name= $result->fetch_assoc()['name']){
        while($name= $result->fetch_assoc()){
            array_push($arr,$name); 
        }
        echo json_encode(['orders'=>$arr]);
    }
    else{
        echo json_encode(['error'=>'an error occured']);
    }
    exit();
}

if($_SERVER['REQUEST_METHOD']==="PATCH"){
    parse_str(file_get_contents('php://input'),$_PATCH);
    // printf('bro');
    // global $conn;
    $credit= $_PATCH['credit'];
    $user= $_PATCH['id'];
    mysqli_query($conn,"UPDATE `user` SET `credit` = '$credit' WHERE `user`.`user_id` = '$user';");
    
    
    exit();   
}