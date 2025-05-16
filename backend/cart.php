<?php
require 'cart_guest.php';
require 'cart_user.php';

// return the cart to user
if($_SERVER['REQUEST_METHOD']==="GET"){
    if(isset($_SESSION['logged_user'])){
        getLoggedUserCart();
    }
    else{
        getGuestUserCart();
    }
    exit();
}



// add new product to cart
if($_SERVER['REQUEST_METHOD']==="POST"){
    if(isset($_SESSION['logged_user'])){
        addLoggedUserCart();
    }
    else{
        addGuestUserCart();
    }
    exit();
}

// update cart data
if($_SERVER['REQUEST_METHOD']==="DELETE"){
    parse_str(file_get_contents('php://input'),$_DELETE);

    if(isset($_SESSION['logged_user'])){
        deleteLoggedUserCart($_DELETE);
    }
    else{
        deleteGuestUserCart($_DELETE);
    }
    // exit();
}

if($_SERVER['REQUEST_METHOD']==="PATCH"){
    parse_str(file_get_contents('php://input'),$_PATCH);

    if(isset($_SESSION['logged_user'])){
        updateLoggedUserCart($_PATCH);
    }
    else{
        updateGuestUserCart($_PATCH);
    }
    // exit();
}