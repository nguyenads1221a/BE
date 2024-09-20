import userModels from "../models/userModels";

const User = require("../models/userModels")
const bcrypt = require('bcrypt');
// Store hash in your password DB.

export const userSignUpController = async(req,res) => {
    try {
        const {email, password, name} = req.body
        const user =await userModels.findOne({email})
        console.log("user",user)
        if(user){
            throw new Error("Already user Exit")
        }
         if(!email){
             throw new Error("Please provide email")
         }
         if(!password){
             throw new Error("Please provide password")
         }
         if(!name){
             throw new Error("Please provide name")
         }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);        

        if(!hashPassword){
            throw new Error("Something is wrong")
        }
        
        const payload = {
            ...req.body,
            role:"GENERAL",
            password: hashPassword
        }
        
        const userData = new User(payload)
        const saveUser = await userData.save()        

        res.status(201).json({
            data : saveUser, //thêm token
            success : true,
            error :false, // nên thay bằng mã code: 4003, 4005,...
            message :" User created Successfully !"
        })


    } catch(err){
        
        res.json({
            message : err.message || err ,
            error : true,
            success: false,             
        })
    }
}

// async function userSignUpController(req,res) {
//     try {
//         const {email, password, name} = req.body
//         if(!email){
//             throw new Error("Please provide email")
//         }
//         if(!password){
//             throw new Error("Please provide password")
//         }
//         if(!name){
//             throw new Error("Please provide name")
//         }
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hashPassword = await bcrypt.hashSync(password, salt);

//         if(!hashPassword){
//             throw new Error("Something is wrong")
//         }
        
//         const payload = {
//             ...req.body,
//             password: hashPassword
//         }
        
//         const userData = new userModel(payload)
//         const saveUser = userData.save()

//         res.status(201).json({
//             data : saveUser,
//             success : true,
//             error :false,
//             message :" User created Successfully !"
//         })


//     } catch(err){
//         res.json({
//             message : err,
//             error : true,
//             success: false,

             
//         })
//     }
    
// }

// module.exports = userSignUpController