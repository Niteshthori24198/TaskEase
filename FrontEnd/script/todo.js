
const BaseURL = `http://localhost:4040`

let todotablebody = document.querySelector("tbody");

const token  = localStorage.getItem("usertoken") || null;

if(token){

    DisplayTodo()

}

else{

    document.body.innerHTML=''

    alert("Login Required");

    location.href = "login.html"

}


function DisplayTodo(){


    fetch(`${BaseURL}/todo/get`,{
        
        method:'GET',
        headers:{
            'content-type':'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{

        console.log(data)

        RenderTODO(data)
    })
    .catch((err)=>{

        console.log(err);
        alert("Something Went Wrong")
    })

}


function RenderTODO(data){

    todotablebody.innerHTML=''

    const todos = data.map((todo)=>{
        return getTodorow(todo)
    }).join('')

    todotablebody.innerHTML = todos;

}


function getTodorow(row){

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

                alert(data.error)

            } 
            else {

                alert('Todo has been updated Successfully.')

                location.reload()
            }

        })

        .catch((err) => {

            alert('Something went wrong')
        })

})







function EditRow(id){

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
        .catch((err) => {
            alert('Something went wrong')
        })


}



function DeleteRow(id){

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

            alert("Todo has been Deleted Successfully")

            location.reload()

        })
        .catch((err) => {
            alert('Something went wrong')
        })

}







let creatTodoForm = document.getElementById('creatTodoForm')

creatTodoForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!creatTodoForm.c_taskName.value) {

        alert('Please fill all required detail')
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

            alert('Todo has been Successfully Created')
            location.reload()

        })

        .catch((err) => {

            alert('Something went wrong')

        })

})








let todotaskSearch = document.getElementById('Searchtodo');
let todotaskFilter = document.getElementById('FilterTodo');


todotaskFilter.addEventListener('change', TaskfilterFunc);
todotaskSearch.addEventListener('input', TaskfilterFunc);


function TaskfilterFunc(){
    
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

        alert('Please LogIn First.')
    }
}





