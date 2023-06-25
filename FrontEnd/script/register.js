
const BaseURL = `http://localhost:4040`

let registerForm = document.getElementById('registeruser');


registerForm.addEventListener('submit',(e)=> {

    e.preventDefault();

    if(registerForm.new_user_conf_pass.value !== registerForm.new_user_pass.value){

        alert('Password Not Matched');

    }else{
        
        registerUser();

    }

})



const registerUser = () => {

    let payload = {

        Email: registerForm.new_user_email.value,
        Name: registerForm.new_user_name.value,
        Password: registerForm.new_user_pass.value,
        Location: registerForm.new_user_address.value,
        Contact: registerForm.new_user_contact.value

    }

    console.log(payload);

    AddUserToDB(payload);   

}




const AddUserToDB = async (payload) => {


     try {

        let res = await fetch(`${BaseURL}/user/register`, {

            method: "POST",

            headers:{
                "Content-type": "application/json"

            },

            body: JSON.stringify(payload)

        });

        if(res.ok){

            res = await res.json();

            alert('Your Account has been created Successfully .');

            location.href = 'login.html';

        }
        
        else{

            alert('Oops ! Something went wrong. Please enter your details correctly.');

        }
        
        
    } 
    
    catch (error) {

        alert('Something went wrong');

    }

}