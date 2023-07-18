
const BaseURL = `https://task-ease-niteshthori24198.vercel.app`

let registerForm = document.getElementById('registeruser');


registerForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (registerForm.new_user_conf_pass.value !== registerForm.new_user_pass.value) {

        Swal.fire('Password Mismatch', '', 'warning')

    } else {

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




const AddUserToDB = (payload) => {


    fetch(`${BaseURL}/user/register`, {

        method: "POST",

        headers: {
            "Content-type": "application/json"

        },

        body: JSON.stringify(payload)

    }).then((res) => res.json())
        .then((data) => {

            if (data.ok) {


                Swal.fire({

                    title: "Your Account has been created Successfully",
                    icon: 'success',

                    confirmButtonText: 'Ok'

                }).then((result) => {

                    if (result.isConfirmed) {

                        location.href = 'login.html';
                    }

                })

            }

            else {

                swal.fire('Oops ! Something went wrong. Please enter your details correctly.', '', 'error');

            }

        }).catch((err) => {
            swal.fire(err, '', 'error');
        })


}

