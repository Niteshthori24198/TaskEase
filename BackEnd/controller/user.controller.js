
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config()

const { TodoModel } = require('../model/todo.model');


const { UserModel } = require("../model/user.model");




const UserRegister = async (req, res) => {


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


}




const UserLogin = async (req, res) => {

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


}




const UserProfileGet = async (req, res) => {

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
}




const UserProfileUpdate = async (req, res) => {

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
}





const UserProfileDelete = async (req, res) => {

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
}






// Google Authentication code

const googleAuthentication = async (req, res) => {

    // Successful authentication, redirect home.

    console.log('requested user from gauth ===>', req.user)

    const user = req.user


    let token = jwt.sign({ UserID: user._id }, process.env.SecretKey, { expiresIn: "24h" })

    const frontendURL = "http://127.0.0.1:5501/FrontEnd/index.html"

    const imgSrc = 'https://cdn.kibrispdr.org/data/1750/3-dot-loading-gif-35.gif'
    const imgSrcAlt = 'https://i.pinimg.com/originals/b8/3e/c9/b83ec9d8ac7a6f2dfaa93fa4f150e3b6.gif'

    return res.send(`
                    <a href="${frontendURL}?token=${token}" id="myid" style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #222222; margin: 0; padding: 0; overflow: scroll;">
                        <img style="width:100%;" src="${imgSrc}" alt="${imgSrcAlt}">
                    </a>
                    <script>
                        let a = document.getElementById('myid')
                        setTimeout(()=>{
                            a.click()
                        },5000)
                        console.log(a)
                    </script>
            `)



}



module.exports = {

    UserRegister,
    UserLogin,
    UserProfileGet,
    UserProfileUpdate,
    UserProfileDelete,
    googleAuthentication

}