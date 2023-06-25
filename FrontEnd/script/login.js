
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

            localStorage.setItem("usertoken",data.token);

            alert("Login Successfull")

            location.href = "../index.html" 
        }

        else{

            alert("Oops ! Wrong Password ")

        }

    })
    .catch((err)=>{

        alert("Login Failed")
        
    })
   

}