
const BASEURL = `http://localhost:4040`


let a = new URLSearchParams(window.location.search);

let tokenfromurl = a.get('token');

if (tokenfromurl) {

    localStorage.setItem('usertoken', tokenfromurl);


    var currentUrl = window.location.href;

    if (currentUrl.indexOf('?token=') !== -1) {

        var newUrl = currentUrl.replace(/(\?|&)token=[^&]*(&|$)/, '$1');

        history.replaceState(null, null, newUrl);
    }

}




let usertoken = localStorage.getItem('usertoken') || null;

let loggedInUser = {};


if (usertoken) {

    fetchUserDetails();

}

else{

    location.href = "./view/login.html"
}


async function fetchUserDetails() {

    try {

        let res = await fetch(`${BASEURL}/user/get`, {

            method: "GET",

            headers: {

                "content-type": "application/json",

                "authorization": `Bearer ${usertoken}`

            }

        }).then((res)=>res.json());

        console.log("===>", res)

        if (res.ok) {

            res = await res;

            loggedInUser = res.user;

            renderUserName();


        }

        else {

            localStorage.removeItem('usertoken');

            alert('Login Required');

            location.reload();

        }


    }

    catch (error) {

        console.log("==> catch run")

        localStorage.removeItem('usertoken');

        alert('Login Required');

        console.log(error)

        location.reload();

    }
}



let signin_up_button = document.getElementById('signin_up_button');


let showUserName = document.getElementById('showUserName');




function renderUserName() {

    showUserName.innerHTML = `<i class="fa-solid fa-user"></i> ${loggedInUser.Name}`;

    showUserName.style.display = 'block';

    signin_up_button.innerHTML = `Logout`;

}


showUserName.addEventListener("click", ()=>{

    if(showUserName.innerHTML){
        location.href='profile.html'
    }


})



signin_up_button.addEventListener('click', async() => {

    if (signin_up_button.innerHTML === 'Logout') {

        if (confirm('Are you sure you want to log out?')) {

            const userLogOut = await userLogedOutHandle()

            if (userLogOut) {

                localStorage.removeItem('usertoken');

                alert('Logout Successfull !')

                location.reload();
            }

            else {
                alert('Something Went Wrong !!')
            }

        }

    }

})







async function userLogedOutHandle(){

    let userloggedout=false;

    const Response = await fetch(`${BASEURL}/user/logout`,{
        method:'GET',
        headers:{
            'content-type':'application/json',
            'authorization':`Bearer ${usertoken}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .catch((err)=>{
        console.log(err)
    })


    const data = await Response

    if(data.Success){
        userloggedout=true
    }
    else{
        userloggedout=data.Success;
    }

    return userloggedout

}





// let modechange = document.querySelector("#modechanger")
// console.log(modechange)

// modechange.addEventListener("click", (e) => {

//     let modeselect = localStorage.getItem("displaymode") || "Light";


//     if (modeselect === "Light") {

//         document.body.style.backgroundColor = 'black'
//         document.body.style.color = 'white'
//         document.querySelector('nav').style.backgroundColor = 'black'
//         document.querySelector("#modechanger").style.color = 'aqua'
//         document.querySelector('.Myappfooter').style.borderColor = 'white'

//         document.getElementById("myemail").style.color = 'aqua'
//         document.getElementById("myname").style.color = 'aqua'

//         localStorage.setItem("displaymode", "Dark");

//     }
//     else {


//         document.body.style.backgroundColor = 'white'
//         document.body.style.color = 'black'
//         document.querySelector('nav').style.backgroundColor = 'white'
//         document.querySelector("#modechanger").style.color = 'black'
//         document.querySelector('.Myappfooter').style.borderColor = 'black'

//         document.getElementById("myemail").style.color = 'black'
//         document.getElementById("myname").style.color = 'black'

//         localStorage.setItem("displaymode", "Light");


//     }

// })