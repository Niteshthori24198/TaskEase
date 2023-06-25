const { Router } = require('express');

const todoRouter = Router();


const {

    AddTodoTask,
    SeachTodoTask,
    GetOneTodoTask,
    UpdateTodoTask,
    DeleteTodo
    
} = require('../controller/todo.controller')



todoRouter.post("/add",AddTodoTask)



todoRouter.get("/get",SeachTodoTask)



todoRouter.get('/getone/:todoID',GetOneTodoTask)



todoRouter.patch("/update/:todoID",UpdateTodoTask)



todoRouter.delete("/delete/:todoID",DeleteTodo)




module.exports = {

    todoRouter

}