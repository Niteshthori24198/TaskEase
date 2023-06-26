const { Router } = require('express');

const userRouter = Router();


const { Auth } = require('../middleware/auth.middleware');


const { UserRegister, UserLogin, UserProfileGet, UserProfileUpdate, UserProfileDelete } = require('../controller/user.controller')



// Unprotected Routes

userRouter.post("/register", UserRegister)


userRouter.post("/login", UserLogin)


// Protected Routes Accessible only after login


userRouter.get('/get', Auth, UserProfileGet)


userRouter.patch('/update', Auth, UserProfileUpdate)


userRouter.delete('/delete', Auth, UserProfileDelete)



module.exports = {
    userRouter
}