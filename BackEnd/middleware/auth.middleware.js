require('dotenv').config();

const jwt = require('jsonwebtoken');

const {BlacklistModel} = require('../model/blacklist.model')



const Auth = async (req,res,next) =>{

    if(!req.headers['authorization']){

        return res.status(400).send({
            "msg":"Invalid Access.",
            "result":false
        })

    }

    const token = req.headers['authorization'].split(' ')[1];
   

    if(token){

        try {


            const isTokenBlacklisted = await BlacklistModel.findOne({token:token})

            if(isTokenBlacklisted){
                return res.status(400).send({
                    "error":"Token is BlackListed !!"
                })
            }


            const decoded = jwt.verify(token, process.env.SecretKey);

            if(decoded){

                req.body.UserID = decoded.UserID;
    
                next()
    
            }
    
            else{
    
                return res.status(400).send({
                    "msg":"Kindly Login First"
                })
    
            }
            
        } catch (error) {

            return res.status(400).send({
                "msg":"Invalid Token"
            })

        }


    }

    else{

        return res.status(400).send({
            "msg":"Kindly Login First"
        })

    }

}





module.exports = {

    Auth

}