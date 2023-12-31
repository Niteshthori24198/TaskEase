const express = require('express');

require('dotenv').config()

const cors = require('cors');

const { connection } = require("./DB/db");

const { Auth } = require('./middleware/auth.middleware');

const { userRouter } = require('./routes/user.routes');

const { todoRouter } = require('./routes/todo.routes');

const app = express();

app.use(express.json());

app.use(cors())


app.get('/',(req,res)=>{
    res.send("Welcome To TaskEase.")
})


app.use("/user",userRouter);

app.use(Auth);

app.use("/todo",todoRouter);


app.listen(process.env.port, async ()=>{

    try {

        await connection;

        console.log("connected to DB. Server running!");

    } catch (error) {

        console.log(error);

    }

})



