
// Code for Login Page Starts Here
document.addEventListener('DOMContentLoaded',checkLoginStatus);
const adminSubmitBtn=document.querySelector('.admin_submit_btn');

adminSubmitBtn.addEventListener('click',loginAdmin);

function loginAdmin(e){
    e.preventDefault(); 
    // console.log('login');
    const form=document.querySelector('.admin_login_form');
    const formData=new FormData(form);
    fetch('http://localhost:8085/backend/adminlogin.php',{
        method:"POST",
        mode:"cors",
        credentials: "include",
        body:formData 
    }).then((res) => res.json())
    .then((data) => { 
    console.log(data);
    data.admin && redirectLogin(data);
    })
    .catch(err => console.log(err));
}

function redirectLogin(){
    // console.log('ok')
    window.open("adminindex.html", "_self");
    }

// Code for Login Page Ends Here