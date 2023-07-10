
const profile_baseurl = `http://localhost:4040`



const username = document.getElementById('user_name_here');

const useremail = document.getElementById('user_email_id_disp');

const username2 = document.getElementById('user_name_disp');

const useraddress = document.getElementById('user_address_disp');

const usercontact = document.getElementById('user_contact_disp');

const userdataeditbtn = document.getElementById('updateUserInfobtn');




const users_token = localStorage.getItem('usertoken') || null;


if (!users_token) {
    location.href = "login.html"
}
else {

    FetchUserInformation()
}




function FetchUserInformation() {


    fetch(`${profile_baseurl}/user/get`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${users_token}`
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)

            RenderUserdata(data.user)
        })
        .catch((err) => {
            console.log(err)
        })

}



function RenderUserdata(UserData) {

    username.innerText = UserData.Name
    username2.value = UserData.Name
    useremail.value = UserData.Email
    useraddress.value = UserData.Location
    usercontact.value = UserData.Contact

}




userdataeditbtn.addEventListener("click", () => {

    const userpayload = {

        Name: username2.value,
        Location: useraddress.value,
        Contact: usercontact.value

    }


    Swal.fire({

        title: 'Do you Want to Update Your Profile ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText:'No'

    }).then((result) => {

        if (result.isConfirmed) {

            UpdateUserInfo(userpayload)
        }
        else{
            FetchUserInformation()
        }
    })

})


function UpdateUserInfo(userpayload) {


    userdataeditbtn.innerHTML = '<i class="fa fa-refresh fa-spin"></i> Save'

    userdataeditbtn.disabled = true;

    fetch(`${profile_baseurl}/user/update`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${users_token}`
        },
        body: JSON.stringify(userpayload)
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            userdataeditbtn.innerHTML = 'Save'
            userdataeditbtn.disabled = false;
            if (data.Success) {
                
               location.reload()
            }
            else {
                location.reload()
            }

        })
        .catch((err) => {
            userdataeditbtn.innerHTML = 'Save'
            userdataeditbtn.disabled = false;
            console.log(err)
            location.reload()
        })


}

