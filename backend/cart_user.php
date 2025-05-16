<?php
require 'db.php';

function getLoggedUserCart(){
    global $conn;
    $cart=array();
    $user_id=getUserID();
    $cart_id=getCartID($user_id);
    if($cart_id){
        $cart=getAllCartItems($cart_id);
    }
    echo json_encode(['cart'=>$cart]);
    // exit();
}

function getUserID(){
    return $_SESSION['logged_user']['id'];
}

function getCartID($user_id){
    global $conn;
    $cart_id=null;
    $stmt="select id from cart where user_id=$user_id;";
    if($result=$conn->query($stmt)){
        if($result->num_rows){
            $cart_id=$result->fetch_assoc()['id'];
            // print($cart_id);
        }
        else{
            $stmt="insert into cart(user_id) values ($user_id);";
            if($result=$conn->query($stmt)){
                if($result->affected_rows){
                    $cart_id=$conn->insert_id;
                }
            }
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
                $prod_array[$id]['name']=$row['name'];
                $prod_array[$id]['stock']=$row['stock'];
                $prod_array[$id]['quantity']=$row['quantity'];
                $prod_array[$id]['price']=$row['price'];
                // return updateTotalLoggedCart($prod_array);
            }
        }
    }
    return updateTotalLoggedCart($prod_array);
}

function updateTotalLoggedCart($prod_array){
    $total=0;
    foreach($prod_array as $item){
        $total +=$item['price'];
    }
    $prod_array['total']=$total;
    return $prod_array;
}

function updateLoggedUserCart($_PATCH){

}

function addLoggedUserCart(){
    global $conn;
    $prod_id= $_POST['id'];
    $quantity= $_POST['quantity'];
    $cart_id =getCartID(getUserID());
    $stmt='insert into cart_item (cart_id,prod_id,quantity) values (?,?,?) on duplicate key update quantity= quantity+?;';
    $prep_stmt=$conn->prepare($stmt);
    $prep_stmt->bind_param('iiii',$cart_id,$prod_id,$quantity,$quantity);
    $prep_stmt->execute();
    $prep_stmt->close();
    $cart=getAllCartItems($cart_id);
    echo json_encode(['cart'=>$cart]);
}

function deleteLoggedUserCart($_DELETE){
    global $conn;
    $prod_id= $_DELETE['id'];
    $cart_id= getCartID(getUserID());
    $stmt="delete from `cart_item` where cart_id='$cart_id' and prod_id=?;";
    $prep_stmt=$conn->prepare($stmt);
    $prep_stmt->bind_param('i',$prod_id);
    $prep_stmt->execute();
    $prep_stmt->close();
    $cart=getAllCartItems($cart_id);
    echo json_encode(['cart'=>$cart]);
}

