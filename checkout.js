document.addEventListener('DOMContentLoaded', updateCheckout);
// const checkoutSection=document.querySelector('#checkout_section');
// checkoutSection.addEventListener('onload',addCheckoutItems)


function updateCheckout() {
    fetch("http://localhost:8085/backend/cart.php", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            addCheckoutItems(data);
            // responseUpdateCart(data);
        })
        .catch(err => console.log(err));
}

function addCheckoutItems(data) {
    console.log(data);
    const { total, ...cart } = data.cart;
    // console.log(data.cart);
    localCart.cart = cart;
    localCart.total = total;
    // console.log(total);
    const checkoutSection = document.querySelector('#checkout_section');
    const checkout_catalog = document.createElement('div');
    checkout_catalog.className = 'checkout_catalog';

    for (const [id, product] of Object.entries(localCart.cart)) {
        const { name, price, quantity } = product;
        // console.log(price);



        const checkoutsect = document.createElement('div');
        checkoutsect.className = 'checkoutsect';
        const checkout_item_title = document.createElement('span');
        checkout_item_title.className = 'checkout_item_title';
        const checkout_item_price = document.createElement('span');
        checkout_item_price.className = 'checkout_item_price';
        const checkout_item_qty = document.createElement('span');
        checkout_item_qty.className = 'checkout_item_qty';
        const checkout_removeBtn = document.createElement('span');
        checkout_removeBtn.className = 'checkout_removeBtn';


        checkout_item_title.textContent = `Item: ${name}`;
        checkout_item_price.textContent = `Price: ${price}`;
        checkout_item_qty.textContent = `Quantity: ${quantity}`;


        checkout_removeBtn.textContent = 'X';

        checkout_removeBtn.addEventListener('click', deleteProuct.bind(id));

        checkoutsect.appendChild(checkout_item_title);
        checkoutsect.appendChild(checkout_item_qty);
        checkoutsect.appendChild(checkout_item_price);
        checkoutsect.appendChild(checkout_removeBtn);
        checkout_catalog.appendChild(checkoutsect);

    }
    const subTotal = document.querySelector('.checkout_subtotal');
    if (localCart.length != 0) {
        subTotal.innerText = localCart.total;
    }
    else {
        subTotal.innerText = '0';
    }
    checkoutSection.appendChild(checkout_catalog);
}

const pay_btn = document.querySelector('.checkout_pay');
pay_btn.addEventListener('click', proceedToPay);
const creditID = document.querySelector('#credit')
console.log(creditID.innerText);


function proceedToPay() {
    fetch("http://localhost:8085/backend/login.php?q=check_status", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.user != 'guest' && calcCredit(data);

            // data.user=='guest' && displayLoginRegister();
        })
        .catch(err => console.log(err));

    // var credit=getCredit()
    // if()
}

function calcCredit(data) {
    const form = document.querySelector('.location_form');
    const formData = new FormData(form);
    const locations = document.querySelector('.locations');
    // console.log(locations.value);

    var crd = data.credit;
    const pay_subTotal = document.querySelector('.checkout_subtotal');
    // console.log(parseInt(pay_subTotal.textContent));
    var subT = parseInt(pay_subTotal.textContent);
    if (locations.value) {
        if (crd > subT) {
            var newCred = crd - subT;
            // console.log(newCred);
            console.log('payment done');
            fetch('http://localhost:8085/backend/order.php', {
                method: "POST",
                mode: "cors",
                credentials: "include",
                body: formData
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // data.user && displayLoggedUser(data);
                    // data.user && updateCart();
                })
                .catch(err => console.log(err));

            const payload = new URLSearchParams();
            payload.append("credit", newCred);
            payload.append("id", data.user);
            fetch('http://localhost:8085/backend/order.php', {
                method: "PATCH",
                mode: "cors",
                credentials: "include",
                body: payload
            }).then((res) => res.json())
                .then((data) => {
                    // console.log(data );
                    checkLoginStatus();
                    
                })
                .catch(err => console.log(err));
        }
        else {
            alert('Not Enough Credit');
        }
    }
    else {
        alert('Location Cannot Be Empty');
    }
}
    // function getCredit(data){
    //     // console.log(data.credit);
    //     return data.credit;
    // }