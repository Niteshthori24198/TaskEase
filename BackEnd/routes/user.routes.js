const { Router } = require('express');

const userRouter = Router();

const { UserModel } = require("../model/user.model");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config()

const { Auth } = require('../midleware/auth.middleware');

const { TodoModel } = require('../model/todo.model');



userRouter.post("/register", async (req, res) => {


    const { Email, Name, Password, Location, Contact } = req.body;

    console.log(req.body);

    bcrypt.hash(Password, 6, async (err, hash) => {

        try {

            const user = new UserModel({ Email, Name, Password: hash, Location, Contact })

            await user.save()

            res.status(200).send({
                "msg": "New User has been Registered Successfully !",
                "User": user
            })


        }
        catch (error) {

            res.status(400).send({ "error": error.message })

        }

    });


})




userRouter.post("/login", async (req, res) => {

    const { Email, Password } = req.body;

    try {

        const user = await UserModel.findOne({ Email });
        console.log(user)


        if (user) {

            bcrypt.compare(Password, user.Password, (err, result) => {

                if (!result) {

                    res.status(400).send({
                        "msg": "Invaid Password"
                    })

                }
                else {

                    res.status(200).send({

                        "msg": "Login Successfull",

                        "token": jwt.sign({ UserID: user._id }, process.env.SecretKey, { expiresIn: '24h' })

                    })

                }

            })

        }

        else {

            res.status(400).send({
                "msg": "Kindly Register First to Access Service."
            })

        }

    } catch (error) {

        res.status(400).send({
            "msg": error.message
        })

    }


})





userRouter.get('/get', Auth, async (req, res) => {

    const { UserID } = req.body;

    try {

        const user = await UserModel.findOne({ _id: UserID });

        if (user) {

            res.status(200).send(user);

        } else {

            res.status(404).send({ "msg": "User Not Found" })

        }

    }

    catch (error) {

        res.status(400).send(
            { "error": error.message }
        )

    }
})





userRouter.patch('/update', Auth, async (req, res) => {

    const { UserID } = req.body;

    try {

        const verifyUser = await UserModel.findOne({ _id: UserID });

        if (verifyUser) {

            await UserModel.findByIdAndUpdate({ _id: UserID }, req.body);

            const user = await UserModel.findOne({ _id: UserID });


            res.status(200).send({
                "msg": "User Data Has been Updated Successfully.",
                "User": user
            });

        } else {

            res.status(404).send('User Not Found');

        }

    }
    catch (error) {

        res.status(400).send({ "error": error.message })

    }
})




userRouter.delete('/delete', Auth, async (req, res) => {

    const { UserID } = req.body;

    try {

        const verifyUser = await UserModel.findOne({ _id: UserID });

        if (verifyUser) {

            await UserModel.findByIdAndDelete({ _id: UserID });

            await TodoModel.deleteMany({ UserID });

            res.status(200).send({

                "msg": `${UserID} user has been deleted successfully.`

            });

        }
        else {

            res.status(404).send({
                "msg": "User doesn't exists"
            });

        }

    }

    catch (error) {

        res.status(400).send({ "error": error.message })

    }
})



module.exports = {
    userRouter
}