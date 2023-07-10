
const BaseURL = `http://localhost:4040`

const loginform = document.getElementById("login-user");

const useremail = document.getElementById("useremail");

const userpass = document.getElementById("userpass");

loginform.addEventListener("submit", function (e){

    e.preventDefault();
    
    userLogin();

});



function userLogin(){
    
    let user = {

        Email:useremail.value,
        Password:userpass.value

    }

    LoginNewUser(user);

}



function LoginNewUser(user){

    fetch(`${BaseURL}/user/login`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then((res)=>{

        return res.json()
    })

    .then((data)=>{

        console.log(data);

        if(data.token){


            Swal.fire({

                title: "Login Successfull ✌",
                icon:'success',

                confirmButtonText: 'Ok'

            }).then((result) => {

                if (result.isConfirmed) {

                    localStorage.setItem("usertoken", data.token);

                    location.href = "../index.html"
                }

            })

        }

        else{

            Swal.fire('Wrong Password !', '', 'warning')


        }

    })
    .catch((err)=>{

        Swal.fire('Login Failed.', '', 'error')

        
    })
   

}




function handleGoogleSignUp(){
    document.getElementById('niteshgoogleauth').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Continue With Google`;
    window.location.href = `${BaseURL}/user/auth/google`;
}