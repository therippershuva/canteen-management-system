document.addEventListener('DOMContentLoaded', requestadminUsers);

function requestadminUsers(){
    fetch("http://localhost:8085/backend/user.php",{
        method:"GET",
        mode:"cors",
        credentials: "include",
})
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.users) {
                // console.log(data.users);
                const users= data.users;
                const user_catalog=document.createElement('div');
                const userSection=document.querySelector('#main_user_section');
                user_catalog.className='user_catalog';

                users.forEach(user => {
                    const us=document.createElement('div');
                    us.className='us';
                    const nameDiv=document.createElement('div');
                    nameDiv.className='user_id_list';
                    const creditDiv=document.createElement('div');
                    creditDiv.className='user_credit_list';
                    const creditForm=document.createElement('form');
                    creditForm.className='credit_form';
                    const addCredit=document.createElement('input');
                    addCredit.className='credit_input';
                    const creditBtn=document.createElement('button');
                    creditBtn.className='credit_button';
                    addCredit.name='credit_input';
                    addCredit.type='number';
                    addCredit.min=0;
                    addCredit.value=0;
                    creditBtn.name='credit_button';
                    creditBtn.textContent='ADD';
                    
                    creditBtn.addEventListener('click',updateCredit.bind({newVal:addCredit,id:user.user_id,credit:user.credit}));

                    nameDiv.textContent=user.user_id;
                    creditDiv.textContent=user.credit;
                    
                    creditForm.appendChild(addCredit);
                    creditForm.appendChild(creditBtn);

                    us.appendChild(nameDiv);
                    us.appendChild(creditDiv);
                    us.appendChild(creditForm);
                    
    
                    user_catalog.appendChild(us);
                });
                userSection.appendChild(user_catalog);
            }
        }
        )
        .catch(err => console.log(err));
}

function updateCredit(e){
    e.preventDefault();
    // console.log(this.newVal.value);
    // console.log(this.id);
    // console.log(this.credit);

        // console.log(this);
        var addedAmount=parseInt(this.newVal.value);
        var crd=parseInt(this.credit);
        var newCrd=crd+addedAmount;
        // console.log(newCrd);
        var id=parseInt(this.id);
        const payload = new URLSearchParams();
        payload.append('id', id);
        payload.append('newCredit', newCrd);
        fetch("http://localhost:8085/backend/user.php?", {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            body: payload,
        })
            .then((res) => res.json())
            .then((data) => {
                // alert('order' + orderID + 'completed and removed');
                console.log(data);
            })
            .catch(err => console.log(err));   
}