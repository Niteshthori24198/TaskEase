
const BaseURL = `http://localhost:4040`

let todotablebody = document.querySelector("tbody");

const token = localStorage.getItem("usertoken") || null;

if (token) {

    DisplayTodo()

}

else {

    document.body.innerHTML = ''


    Swal.fire({

        title: 'Kindly Login First to Access this section.',

        icon: 'error',

        confirmButtonText: 'Ok'

    }).then((result) => {

        if (result.isConfirmed) {

            location.href = "login.html"
        }

    })


}


function DisplayTodo() {


    fetch(`${BaseURL}/todo/get`, {

        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            console.log(data)

            RenderTODO(data)
        })
        .catch((error) => {

            Swal.fire(error.message, '', 'error')

        })

}


function RenderTODO(data) {

    todotablebody.innerHTML = ''

    const todos = data.map((todo) => {
        return getTodorow(todo)
    }).join('')

    todotablebody.innerHTML = todos;

}


function getTodorow(row) {

    return `<tr>
                <td  class="meri-class">${row._id}</td>
                <td  class="meri-class">${row.TaskName}</td>
                <td  class="meri-class">${row.isCompleted ? "Completed" : "Pending"}</td>

                    <td  onClick="EditRow('${row._id}')" type="button"  data-bs-toggle="modal"
                        data-bs-target="#editTodo" data-bs-whatever="@mdo" id="meri-id">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </td>

                <td  class="meri-class" onclick="DeleteRow('${row._id}')" > <i class="fa-solid fa-trash"></i> </td>
                </tr>`

}






let editTodoForm = document.getElementById('editTodoForm')

editTodoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let todoid = editTodoForm.e_todoid.value
    let todoname = editTodoForm.e_taskName.value
    let todostatus = editTodoForm.e_status.value

    let payload = {
        TaskName: todoname,
        isCompleted: todostatus
    }

    fetch(`${BaseURL}/todo/update/${todoid}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((data) => {

            if (data.error) {

                Swal.fire(data.error, '', 'error')

            }
            else {


                Swal.fire('Todo has been updated Successfully.', '', 'success')

                DisplayTodo()
            }

        })

        .catch((error) => {

            Swal.fire(error.message, '', 'error')

        })

})







function EditRow(id) {

    fetch(`${BaseURL}/todo/getone/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {

            // auto fill data
            editTodoForm.e_todoid.value = data._id;
            editTodoForm.e_taskName.value = data.TaskName;
            editTodoForm.e_status.value = data.isCompleted;

        })
        .catch((error) => {
            Swal.fire(error.message, '', 'error')
        })


}



function DeleteRow(id) {

    Swal.fire({

        title: 'Are you sure that you Want to Delete Your Todo ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

    }).then((result) => {

        if (result.isConfirmed) {

            removeTodotask()
        }

    })


    function removeTodotask() {
        fetch(`${BaseURL}/todo/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                Swal.fire('Todo has been Deleted Successfully', '', 'success')

                DisplayTodo()

            })
            .catch((error) => {
                Swal.fire(error.message, '', 'error')
            })
    }




}







let creatTodoForm = document.getElementById('creatTodoForm')

creatTodoForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!creatTodoForm.c_taskName.value) {

        Swal.fire('Please fill all required detail', '', 'warning')

        return
    }

    let payload = {

        TaskName: creatTodoForm.c_taskName.value,
        isCompleted: false

    }


    fetch(`${BaseURL}/todo/add`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())

        .then((data) => {

            Swal.fire('Todo has been Successfully Created', '', 'success')

            DisplayTodo()

        })

        .catch((error) => {

            Swal.fire(error.message, '', 'error')

        })

})








let todotaskSearch = document.getElementById('Searchtodo');
let todotaskFilter = document.getElementById('FilterTodo');


todotaskFilter.addEventListener('change', TaskfilterFunc);
todotaskSearch.addEventListener('input', TaskfilterFunc);


function TaskfilterFunc() {

    let url = `${BaseURL}/todo/get?TaskName=${todotaskSearch.value}&isCompleted=${todotaskFilter.value}`

    FilterAndSearchTodo(url)

}


async function FilterAndSearchTodo(url) {

    let res = await fetch(url, {

        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {

        res = await res.json();

        RenderTODO(res);

    }
    else {

        Swal.fire('Please Login First !', '', 'error')
    }
}





