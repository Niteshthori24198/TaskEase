
const BASEURL = `https://task-ease-niteshthori24198.vercel.app`


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




async function fetchUserDetails() {

    try {

        let res = await fetch(`${BASEURL}/user/get`, {

            method: "GET",

            headers: {

                "content-type": "application/json",

                "authorization": `Bearer ${usertoken}`

            }

        }).then((res) => res.json());

        console.log("===>", res)

        if (res.ok) {

            res = await res;

            loggedInUser = res.user;

            renderUserName();


        }

        else {

            localStorage.removeItem('usertoken');

            Swal.fire('Login Required', '', 'warning')


        }


    }

    catch (error) {

        console.log("==> catch run")

        localStorage.removeItem('usertoken');

        Swal.fire(error.message, '', 'error')


    }
}



let signin_up_button = document.getElementById('signin_up_button');


let showUserName = document.getElementById('showUserName');




function renderUserName() {

    showUserName.innerHTML = `<i class="fa-solid fa-user"></i> ${loggedInUser.Name}`;

    showUserName.style.display = 'block';

    signin_up_button.innerHTML = `Logout`;

}






signin_up_button.addEventListener('click', async (e) => {


    if (signin_up_button.innerHTML === 'Logout') {

        e.preventDefault()

        await userLogedOutHandle()

    }

})







async function userLogedOutHandle() {


    Swal.fire({

        title: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Logout'

    }).then((result) => {

        if (result.isConfirmed) {

            userLogoutIntiate()
        }
    })


    async function userLogoutIntiate() {

        const Response = await fetch(`${BASEURL}/user/logout`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${usertoken}`
            }
        })
            .then((res) => {
                return res.json()
            })
            .catch((err) => {
                console.log(err)
            })


        const data = await Response

        if (data.Success) {

            Swal.fire({

                title: data.msg,
                icon: 'success',
                confirmButtonText: 'Ok'

            }).then((result) => {

                if (result.isConfirmed) {

                    localStorage.removeItem('usertoken');
                    location.href = '../view/login.html'
                }

            })

        }
        else {
            Swal.fire(data.msg, '', 'error')
        }
    }




}





