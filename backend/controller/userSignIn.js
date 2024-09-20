const bcrypt = require('bcrypt')
const userModels = require('../models/userModels')
const jwt = require('jsonwebtoken');


export const userSignInController = async(req,res)=>{
    try{
        const { email , password}=req.body


        if(!email){
                throw new Error("Please provide email")
            }
         if(!password){
            throw new Error("Please provide password")
        }
        const user =await userModels.findOne({email})
        if (!user){
            throw new Error("User not found")
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        console.log("checkPassword",checkPassword)

        if(checkPassword){
                const tokenData= {
                    _id : user._id,
                    email:user.email,
                }
                const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});

                const tokenOpion ={
                    httpOnly : true,
                    secure :true
                }

                res.cookie("token",token,tokenOpion).json({
                    message:"Login successfully",
                    data : token,
                    success :true,
                    error: false
                })

        }else{
            throw new Error("Please check Password")
        }
    
    } catch(err){
        res.json({
            message : err,
            error : true,
            success: false,             
        })
    }

}
