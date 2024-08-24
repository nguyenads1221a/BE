const express =require('express')

const router =express.Router()

// const userSignUpController = require ("");
import * as controller from "../controller"

router.post("/signup",controller.userSignUpController)

module.exports =router