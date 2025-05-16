

const admin_logOutSection=document.querySelector('.logout_section');
const admin_welcome=document.querySelector('.welcome_header');
const admin_logOutIcon=document.querySelector('.fa-power-off');
const admin_header=document.querySelectorAll('.admin_header');

const nav_user=document.querySelector('.user_header');
const nav_product=document.querySelector('.product_header');
const nav_order=document.querySelector('.order_header');
const nav_check=document.querySelector('.check_header');
// const nav_product=document.querySelector('.product_header');

admin_welcome.addEventListener('click',showLogout);

function showLogout(){
    // console.log(admin_logOutSection);
        if (admin_logOutSection.classList.contains('hide')) {
            admin_logOutSection.classList.remove('hide');
        }
        else {
            admin_logOutSection.classList.add('hide');
        }
        const admin_logOutIcon=document.querySelector('.fa-power-off');
        admin_logOutIcon.addEventListener('click',logoutAdmin);
}

function checkLoginStatus(){
    // console.log('hi')
    fetch("http://localhost:8085/backend/adminlogin.php?q=check_status",{
        method:"GET",
        mode:"cors",
        credentials: "include",
})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.user!='guest' && displayLoggedUser(data);
            data.user=='guest' && redirectLogOut();
        })
        .catch(err => console.log(err));
}

function logoutAdmin(){
    fetch("http://localhost:8085/backend/adminlogin.php",{
        method:"GET",
        mode:"cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            redirectLogOut();
            data.logout && displayLoginRegister();
    })
    .catch(err => console.log(err));
}

function redirectLogOut(){
    // console.log('ok')
    if(window.location.pathname!='/admin/adminlogin.html'){
    window.open("adminlogin.html", "_self");}
}

function displayLoggedUser(data){
        console.log(data.user);
}


// Code for headers starts here
admin_header.forEach(head=>head.addEventListener('click',showHeader))
// admin_header.addEventListener('click',showHeader);

function showHeader(){
    // console.log(this.textContent);
    const nav_header=this.textContent;
    setActiveHeader(nav_header);
}

function setActiveHeader(nav_header){
    // const headerList=document.querySelectorAll('.admin_nav_menu');
    // // const headerList=document.querySelectorAll('.admin_menu_list');

    // const root=document.querySelector(':root');
    // const nav_bg=window.getComputedStyle(root).getPropertyValue('--nav_bg');
    // // nav_header.style.backgroundColor=nav_bg;
    // console.log(nav_bg)
    // headerList.forEach(category=>{
    //     console.log(category.classList)

    //     if(category.classList.contains(nav_header)){
    //         category.style.backgroundColor=nav_bg;
    //         console.log('ok')
    //     }
    //     else{
    //         category.style.backgroundColor='initial';
    //         console.log('not ok');
    //     }
    // })
}

nav_user.addEventListener('click',navUserClick);
nav_product.addEventListener('click',navProductClick);
nav_order.addEventListener('click',navOrderClick);

function navUserClick(){
    // console.log(this);

    // const root=document.querySelector(':root');
    // const nav_bg=window.getComputedStyle(root).getPropertyValue('--nav_bg');
    // console.log(nav_bg);
    // nav_user.style.backgroundColor=nav_bg;

}

function navProductClick(){
    window.open("adminProduct.html", "_self");            
}

function navOrderClick(){
    window.open("adminindex.html", "_self");            
}

function navUserClick(){
    window.open("adminuser.html", "_self");
}

// Code for headers ends here



