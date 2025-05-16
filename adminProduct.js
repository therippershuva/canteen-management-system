
document.addEventListener('DOMContentLoaded', requestadminProduct);

function requestadminProduct(){
    console.log('pro')
    fetch("http://localhost:8085/backend/products.php",{
        method:"GET",
        mode:"cors",
        credentials: "include",
})
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.products) {
                const products= data.products;
                const product_catalog=document.createElement('div');
                const productSection=document.querySelector('#main_product_section');
                product_catalog.className='product_catalog';

                products.forEach(prod => {
                    const ps=document.createElement('div');
                    ps.className='ps';
                    const nameDiv=document.createElement('div');
                    nameDiv.className='prod_food_list';
                    const priceDiv=document.createElement('div');
                    priceDiv.className='prod_price_list';
                    const typeDiv=document.createElement('div');
                    typeDiv.className='prod_type_list';
                    const stockDiv=document.createElement('div');
                    // stockDiv.className='prod_stock_list';
                    const statusDiv=document.createElement('div');
                    // statusDiv.className='prod_status_list active';

                    nameDiv.textContent=prod.name;
                    priceDiv.textContent=prod.price;
                    typeDiv.textContent=prod.type;
                    stockDiv.textContent=prod.stock;
                    // statusDiv.textContent=prod.status;
                    // console.log(parseInt(prod.stock))
                    if(parseInt(prod.stock)>10){
                        // stockDiv.classList.add('stock_low');
                        stockDiv.className='prod_stock_list in_stock';
                    }
                    else{
                        stockDiv.className='prod_stock_list low_stock';
                    }

                    if(prod.status=='0'){
                    statusDiv.textContent="Inactive";
                    statusDiv.className='prod_status_list active';
                    }
                    else{
                        statusDiv.textContent="Active";
                        statusDiv.className='prod_status_list active';
                    }
                    
                    ps.appendChild(nameDiv);
                    ps.appendChild(priceDiv);
                    ps.appendChild(typeDiv);
                    ps.appendChild(stockDiv);
                    ps.appendChild(statusDiv);
    
                    product_catalog.appendChild(ps);
                });
                productSection.appendChild(product_catalog);
            }
        }
        )
        .catch(err => console.log(err));
}