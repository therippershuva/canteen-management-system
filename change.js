// Code for Forget Password Starts Here
const resetSubmit=document.querySelector('.forget_submit_btn');
resetSubmit.addEventListener('click',changeFormSubmit);

function changeFormSubmit(e){
    e.preventDefault();
    console.log('ok');
    const form=document.querySelector('.change_form');
    const formData=new FormData(form);
    fetch('http://localhost:8085/backend/change.php',{
        method:"POST",
        mode:"cors",
        credentials: "include",
        body:formData 
    }).then((res) => res.json())
    .then((data) => { 
    console.log(data);
   
    })
    .catch(err => console.log(err));
}


//  Code for Forget Password Ends Here