// Code for cart starts here
document.addEventListener('DOMContentLoaded',updateCart);
const cartIcon = document.querySelector('.fa-basket-shopping');
const cartWindow = document.querySelector('.cart_window');
// const cartItemName=document.querySelector('.item_title');
// const cartItemPrice=document.querySelector('.item_price');
// const cartItemQuantity=document.querySelector('.item_quantity');
// const cartItemSubTotal=document.querySelector('.item_subtotal');

const localCart={
    cart:null,
    length:0,
    total:0,
};

cartIcon.addEventListener('click', showCart)
function showCart(){
    if (cartWindow.classList.contains('hide')) {
        cartWindow.classList.remove('hide');
    }
    else {
        cartWindow.classList.add('hide');
    }
        
        const catalog=document.createElement('div');
        catalog.className='cart_catalog';
        const cartSection=document.querySelector('#cart_items');
        // const checkoutSection=document.querySelector('#checkout_section');

    for(const [id,product]of Object.entries(localCart.cart)){
        // if (cartWindow.classList.contains('hide')) {
        //     cartWindow.classList.remove('hide');
        // }
        // else {
        //     cartWindow.classList.add('hide');
        // }
        const {name,price,quantity}=product;

        const cs=document.createElement('div');
        cs.className='cs';
        cs.setAttribute('item_name',name);
        const nameDiv=document.createElement('span');
        nameDiv.className='item_title';
        const priceDiv=document.createElement('span');
        priceDiv.className='item_price';
        const qtyDiv=document.createElement('span');
        qtyDiv.className='item_quantity';
        const removeBtn=document.createElement('span');
        removeBtn.className='remove';

        nameDiv.textContent=name;
        priceDiv.textContent=price;
        qtyDiv.textContent=quantity;
        removeBtn.textContent='X';

        removeBtn.addEventListener('click',deleteProuct.bind(id));

        cs.appendChild(nameDiv);
        cs.appendChild(qtyDiv);
        cs.appendChild(priceDiv);
        cs.appendChild(removeBtn);
        catalog.appendChild(cs);
        
    }
    const subTotal=document.querySelector('.item_subtotal');
    if(localCart.length!=0){
        subTotal.innerText = localCart.total;
        
        checkoutBtn.addEventListener('click',proceedToCheckout);
    }
    else{
        subTotal.innerText = '0';
    }
    cartSection.appendChild(catalog);
    // checkoutSection.appendChild(catalog);
}


function updateCart(){
    fetch("http://localhost:8085/backend/cart.php",{
        method:"GET",
        mode:"cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // addCheckoutItems(data);
            responseUpdateCart(data);
    })
    .catch(err => console.log(err));    
}

function responseUpdateCart(data){
    // console.log(data)
    const {total,...cart}=data.cart;
    // console.log(total);
    // console.log(cart);
    localCart.cart=cart;
    localCart.total=total;
    localCart.length= Object.keys(cart).length;
    if(localCart.length>0){
        cartIcon.classList.add('not_empty')
        const rootCss=document.querySelector(':root');
        rootCss.style.setProperty('--cart_size',`'${localCart.length}'`);
    }    
    else{
        cartIcon.classList.remove('not_empty');
    }
}

function addToCart(event){
    console.log(this);
    var buttonClicked = event.target;
    var input = buttonClicked.parentElement.children[1];
    const loggedUser= document.querySelector('.username');
    console.log(loggedUser.textContent);
    // console.log(input.value)
    const payload=new URLSearchParams();
    payload.append('id',this.id);
    payload.append('name',this.name);
    payload.append('price',this.price);
    payload.append('quantity',input.value);
    payload.append('user_id',loggedUser.textContent);
    fetch('http://localhost:8085/backend/cart.php',{
        method:"POST",
        mode:"cors",
        credentials: "include",
        body:payload 
    }).then((res) => res.json())
    .then((data) => { 
    // console.log(data);
    updateCart();
    })
    .catch(err => console.log(err));
}

function deleteProuct(){
    const payload=new URLSearchParams();
    payload.append('id',this);
    fetch('http://localhost:8085/backend/cart.php',{
        method:"DELETE",
        mode:"cors",
        credentials: "include",
        body:payload 
    }).then((res) => res.json())
    .then((data) => { 
    // console.log(data );
    updateCart();
    responseUpdateCartItem(data);
    })
    .catch(err => console.log(err));
}

function updateProduct(e){
    const payload=new URLSearchParams();
    payload.append("quantity",e.target.value)
    fetch('http://localhost:8085/backend/cart.php',{
        method:"PATCH",
        mode:"cors",
        credentials: "include",
        body:payload 
    }).then((res) => res.json())
    .then((data) => { 
    // console.log(data );
    responseUpdateCartItem(data);
    })
    .catch(err => console.log(err));
}

function responseUpdateCartItem(){
    
}

function proceedToCheckout(){
    // console.log('ok')
    const loggedUser= document.querySelector('.username');
    if(loggedUser.textContent!=''){
    window.open("checkout.html");
    }
    else{
        alert('Please login');
        showLogin();
    }
}
// Code for cart ends here

