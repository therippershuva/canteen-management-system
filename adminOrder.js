document.addEventListener('DOMContentLoaded', requestadminOrder);

const admin_sect = document.querySelector('#admin_order_section');

function requestadminOrder() {
    // console.log('order')
    fetch("http://localhost:8085/backend/order.php", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.orders) {
                console.log(data);
                const orders = data.orders;

                const orderSection = document.querySelector('#admin_main_section');
                const order_catalog = document.createElement('div');
                order_catalog.className = 'order_catalog';

                orders.forEach(ord => {


                    // const orderForm = document.createElement('form');
                    // orderForm.className = "orderForm";
                    // const orderValue = document.createElement('input');
                    // orderValue.className = "orderValue";
                    // orderValue.value = ord.id;
                    // orderValue.type='hidden';

                    const os = document.createElement('div');
                    os.className = 'os';
                    const orderNoDiv = document.createElement('div');
                    orderNoDiv.className = 'order_orderNo_list';
                    const userIDDiv = document.createElement('div');
                    userIDDiv.className = 'order_userNo_list';
                    const location = document.createElement('div');
                    location.className = 'order_location_list';
                    const total = document.createElement('div');
                    total.className = 'order_total_list';
                    const oStatusDiv = document.createElement('div');
                    oStatusDiv.className = 'order_status_list';
                    const addedDiv = document.createElement('div');
                    addedDiv.className = 'order_date_list';

                    // const prodDiv=document.createElement('div');
                    // prodDiv.className='order_prod_list';
                    // const qtyDiv=document.createElement('div');
                    // qtyDiv.className='order_qty_list';
                    // const priceDiv=document.createElement('div');
                    // priceDiv.className='order_price_list';

                    orderNoDiv.textContent = ord.id;
                    userIDDiv.textContent = ord.user_id;
                    location.textContent = ord.location;
                    total.textContent = ord.total;
                    oStatusDiv.textContent = ord.order_status;
                    addedDiv.textContent = ord.added_on;
                    // prodDiv.textContent=ord.name;
                    // qtyDiv.textContent=ord.quantity;
                    // priceDiv.textContent=ord.price;
                    
                    oStatusDiv.addEventListener('click',changeStatus.bind(ord.id));

                    orderNoDiv.addEventListener('click', getOrderDetails.bind(ord.id));

                    // orderForm.appendChild(orderValue);
                    // os.appendChild(orderForm);

                    os.appendChild(orderNoDiv);
                    os.appendChild(userIDDiv);
                    os.appendChild(location);
                    os.appendChild(total);
                    os.appendChild(oStatusDiv);
                    os.appendChild(addedDiv);
                    // os.appendChild(prodDiv);
                    // os.appendChild(qtyDiv);
                    // os.appendChild(priceDiv);

                    order_catalog.appendChild(os);
                });
                // orderSection.appendChild(orderNoDiv);
                // orderSection.appendChild(userIDDiv);
                // orderSection.appendChild(location);
                // orderSection.appendChild(total);
                // orderSection.appendChild(oStatusDiv);
                // orderSection.appendChild(addedDiv);
                orderSection.appendChild(order_catalog);
            }
        }
        )
        .catch(err => console.log(err));
}

// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
//   }

function getOrderDetails() {
    // console.log(parseInt(this));
    const payload = new URLSearchParams();
    payload.append('id', parseInt(this));
    // var orderID = parseInt(this);
    fetch("http://localhost:8085/backend/orderadmin.php?", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: payload,
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            const orders = data.order_details;
            // console.log(orders);

            const orderSection = document.querySelector('#admin_order_section');
            const order_catalog = document.createElement('div');
            order_catalog.className = 'orderDetail_catalog';

            orders.forEach(ord => {
                const ods = document.createElement('div');
                ods.className = 'ods';
                // const orderID = document.createElement('div');
                // orderID.className = 'order_orderID_list';
                const prodDiv = document.createElement('div');
                prodDiv.className = 'order_product_list';
                const quantity = document.createElement('div');
                quantity.className = 'order_quantity_list';
                const priceDiv = document.createElement('div');
                priceDiv.className = 'order_price_list';

                // ods.textContent = ord.order_id;
                prodDiv.textContent = ord.name;
                quantity.textContent = ord.quantity;
                priceDiv.textContent = ord.price;
                // oStatusDiv.textContent = ord.order_status;
                // addedDiv.textContent = ord.added_on;

                ods.appendChild(prodDiv);
                ods.appendChild(quantity);
                ods.appendChild(priceDiv);    

                order_catalog.appendChild(ods);
            });
            order_catalog.setAttribute('catalog','hide');
            orderSection.appendChild(order_catalog);
        })
        .catch(err => console.log(err));
    showOrder();
}

function showOrder() {
    // console.log(admin_logOutSection);
    if (admin_sect.classList.contains('hide')) {
        admin_sect.classList.remove('hide');
    }
    else {
        admin_sect.classList.add('hide');
        // const ods=getAttribute('catalog');
        // ods.removeChild(order_catalog);
    }
}

function changeStatus(){
    // console.log(this);
    var orderID=parseInt(this);
    const payload = new URLSearchParams();
    payload.append('id', parseInt(this));
    fetch("http://localhost:8085/backend/orderadmin.php?", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        body: payload,
    })
        .then((res) => res.json())
        .then((data) => {
            alert('order' + orderID + 'completed and removed');
        })
        .catch(err => console.log(err));   
}