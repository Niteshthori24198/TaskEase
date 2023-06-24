require('dotenv').config();

const jwt = require('jsonwebtoken');


const Auth = (req,res,next) =>{

    if(!req.headers['authorization']){

        return res.status(400).send({
            "msg":"Invalid Access."
        })

    }

    const token = req.headers['authorization'].split(' ')[1];
   

    if(token){

        try {

            const decoded = jwt.verify(token, process.env.SecretKey);

            if(decoded){

                req.body.UserID = decoded.UserID;
    
                next()
    
            }
    
            else{
    
                res.status(400).send({
                    "msg":"Kindly Login First"
                })
    
            }
            
        } catch (error) {

            res.status(400).send({
                "msg":"Invalid Token"
            })

        }


    }

    else{

        res.status(400).send({
            "msg":"Kindly Login First"
        })

    }

}





module.exports = {

    Auth

}