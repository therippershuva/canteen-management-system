<?php
require 'db.php';

function getGuestUserCart(){
    if(!isset($_SESSION['cart']))
    {
        $_SESSION['cart']=array();
    }
    echo json_encode(['cart'=>$_SESSION['cart']]);
}

function addGuestUserCart(){
    $id=$_POST['id'];
    $name=$_POST['name'];
    // $price=$_POST['price'];
    $quantity=$_POST['quantity'];
    if(!isset($_SESSION['cart'][$id])){
        $_SESSION['cart'][$id]['name']=$name;
        // $_SESSION['cart'][$id]['price']=$price;
        $_SESSION['cart'][$id]['quantity']=$quantity;
    }
    else{
        $_SESSION['cart'][$id]['quantity']+= $quantity;
    }
    $price=getProductPrice($id);
    $_SESSION['cart'][$id]['price']=($price*$_SESSION['cart'][$id]['quantity']);
    updateTotalCart();
    echo json_encode(['cart'=>$_SESSION['cart']]);
    exit();
}

function getProductPrice($id){
    global $conn;
    $stmt='select price from items where id=?;';
    $prep_stmt=$conn->prepare($stmt);
    $prep_stmt->bind_param('i',$id);
    $prep_stmt->execute();
    if($result=$prep_stmt->get_result()){
        return $result->fetch_assoc()['price'];
    }
    else{
        return -1;
    }

}

function updateTotalCart(){
    $total= 0;  
    foreach($_SESSION['cart'] as $item){
        // var_dump(gettype($item));
        $total += $item['price'];
        // var_dump($_SESSION['cart']);
    }
    $_SESSION['cart']['total']=$total;
}


function deleteGuestUserCart($_DELETE){
    $id=$_DELETE['id'];
    unset($_SESSION['cart'][$id]);
    updateTotalCart();
    echo json_encode(['cart'=>$_SESSION['cart']]);   
}

function updateGuestUserCart($_PATCH){
    
}