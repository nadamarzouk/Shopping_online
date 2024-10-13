import express from "express"
import * as auth from './auth.controller.js'
import { validation } from "../../middleware/validation.js"
import { signUpSchema, signInSchema } from "./auth.validation.js"
const authRouter = express.Router()

authRouter.post('/sigup',validation(signUpSchema) ,auth.signUp)
authRouter.post('/sigin',validation(signInSchema) ,auth.signIn)

export default authRouter