
require("dotenv").config()

const passport = require("passport");

const crypto = require('crypto')

const randomPassword = (byte = 32) => crypto.randomBytes(byte).toString('hex')

const {UserModel} = require("../model/user.model");



const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({

    clientID: process.env.googleclientid,
    clientSecret: process.env.googleclientsecret,
    callbackURL: "http://localhost:4040/user/auth/google/callback"

},

    async function (accessToken, refreshToken, profile, cb) {

        try {

            let Email = profile._json.email

            console.log("ok")

            const user = await UserModel.findOne({ Email })

            console.log("ok-2")
            console.log(user)

            if (!user) {

                console.log("adding new user")

                let newuser = new UserModel({

                    Email,
                    Name: profile._json.name,
                    Password: randomPassword(),
                    Contact: "1234567890",
                    Location: "XYZ",

                })

                await newuser.save()

                return cb(null, newuser)

            }

            else {

                console.log("user is present in db")

                return cb(null, user)

            }
        }
        catch (error) {

            console.log(error)

        }

        console.log("profile",profile)

    }

));




module.exports = { passport }
