
const BASEURL = `https://muddy-plum-dragonfly.cyclic.app`

let usertoken = localStorage.getItem('usertoken') || null;

let loggedInUser = {};


if (usertoken) {

    fetchUserDetails();

}


async function fetchUserDetails() {

    try {

        let res = await fetch(`${BASEURL}/user/get`, {

            method: "GET",

            headers: {

                "Content-type": "application/json",

                "Authorization": `Bearer ${usertoken}`

            }

        });

        if (res.ok) {

            res = await res.json();

            loggedInUser = res;

            renderUserName();
            

        }
        
        else {

            localStorage.removeItem('usertoken');

            alert('Login Required');

            location.reload();

        }


    } 
    
    catch (error) {
        
        localStorage.removeItem('usertoken');

        alert('Login Required');

        console.log(error)

        location.reload();

    }
}



let signin_up_button = document.getElementById('signin_up_button');


let showUserName = document.getElementById('showUserName');




function renderUserName(){
    
    showUserName.innerHTML = `<i class="fa-solid fa-user"></i> ${loggedInUser.Name}` ;

    showUserName.style.display = 'block';

    signin_up_button.innerHTML = `Logout`;

}



signin_up_button.addEventListener('click', ()=>{

    if(signin_up_button.innerHTML === 'Logout'){

        localStorage.removeItem('usertoken');

        location.reload();
    }

})



/* dark mode */



let modechange = document.querySelector("#modechanger")
console.log(modechange)

modechange.addEventListener("click" , (e)=>{

    let modeselect = localStorage.getItem("displaymode") || "Light";

   
    if(modeselect === "Light"){
       
        document.body.style.backgroundColor = 'black'
        document.body.style.color='white'
        document.querySelector('nav').style.backgroundColor='black'
        document.querySelector("#modechanger").style.color='aqua'
        document.querySelector('.Myappfooter').style.borderColor = 'white'

        document.getElementById("myemail").style.color='aqua'
        document.getElementById("myname").style.color='aqua'

        localStorage.setItem("displaymode","Dark");

    }
    else{
       
        
        document.body.style.backgroundColor = 'white'
        document.body.style.color='black'
        document.querySelector('nav').style.backgroundColor='white'
        document.querySelector("#modechanger").style.color='black'
        document.querySelector('.Myappfooter').style.borderColor = 'black'

        document.getElementById("myemail").style.color='black'
        document.getElementById("myname").style.color='black'

        localStorage.setItem("displaymode","Light");
      
     
    }

})