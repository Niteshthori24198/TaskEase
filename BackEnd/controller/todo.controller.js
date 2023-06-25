const { TodoModel } = require('../model/todo.model');



const AddTodoTask = async (req,res)=>{

    // const {UserID,TaskName,isCompleted} = req.body;

    try {
        
        const todo = new TodoModel(req.body);

        await todo.save();

        res.status(200).send(todo)


    } catch (error) {
        
        res.status(400).send({
            "msg":error.message

        })

    }

}




const SeachTodoTask = async (req,res)=>{

    const { UserID }  = req.body;

    let { TaskName , isCompleted , Page , Limit } = req.query;

    try {

        TaskName = new RegExp(TaskName , 'i');

        if(isCompleted){

            const todo = await TodoModel.find({UserID , TaskName , isCompleted}).skip(Limit*(Page-1)).limit(Limit);

            res.status(200).send(todo)

        }

        else{

            const todo = await TodoModel.find({UserID ,TaskName}).skip(Limit*(Page-1)).limit(Limit);

            res.status(200).send(todo);

        }
        

    } 
    catch (error) {
        
        res.status(400).send({
            "msg":error.message

        })

    }

}




const GetOneTodoTask = async (req,res)=>{

    const {todoID} = req.params


    const UserID = req.body.UserID

    try {
        
        const verifyTodo = await TodoModel.findOne({_id:todoID});

        if(verifyTodo.UserID === UserID){

            const todo = await TodoModel.findById({_id:todoID});

            res.status(200).send(todo);

        }else{

            res.status(400).send({"msg":"You can't able to get todo of other user"});
            
        }

    } catch (error) {

        res.status(400).send({"error":error.message});  
        
    } 

}




const UpdateTodoTask = async(req,res)=>{


    const {todoID} =  req.params;

    try {
        
        
        const verifytodo = await TodoModel.findById({_id:todoID});

        if(verifytodo.UserID === req.body.UserID){

            await TodoModel.findByIdAndUpdate({_id:todoID},req.body);

            const todo1 = await TodoModel.findById({_id:todoID});

            res.status(200).send({

                "msg": `todo ${todo1} has been updated.`
            }
           );

        }

        else{

            res.status(400).send({
                "msg":"Unauthorized acess detected. Acees Denied"
            })

        }

    } 
    
    catch (error) {
        
        res.status(400).send({
            "msg":error.message

        })

    }

}




const DeleteTodo =  async(req,res)=>{


    const {todoID} =  req.params;

    try {
        
        const todo = await TodoModel.findById({_id:todoID});

        if(todo.UserID === req.body.UserID){

            await TodoModel.findByIdAndDelete({_id:todoID});
    
            res.status(200).send({
                "msg":"Todo has been deleted."
            });
        }

        else{

            res.status(400).send({
                "msg":"Unauthorized acess detected. Acees Denied"
            })

        }

    } 
    
    catch (error) {
        
        res.status(400).send({
            "msg":error.message

        })

    }

}





module.exports = {
    AddTodoTask,
    SeachTodoTask,
    GetOneTodoTask,
    UpdateTodoTask,
    DeleteTodo
}