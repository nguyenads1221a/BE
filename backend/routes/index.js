const express =require('express')

const router =express.Router()

 //const userSignUpController = require ("");
  //  const userSignInController=require('../controller/userSignIn')
import * as controller from "../controller"

router.post("/signup", controller.userSignUpController)
router.post("/signIn",controller.userSignInController)

module.exports =router