import express from "express"
import * as user from "./user.controller.js"
import { validation } from "../../middleware/validation.js"
import { createUserSchema, getUserSchema,
     updateUserSchema, deleteUserSchema, changeUserpassSchema } from "./user.validation.js"
 import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"    

const userRouter = express.Router()

userRouter
.route('/')
.post(protectedRoutes ,allowedTo('admin'),validation(createUserSchema),user.createUser)
.get(user.getAllUsers)

userRouter
.route('/:id')
.get(validation(getUserSchema),user.getUser)
.put(protectedRoutes ,allowedTo('admin'), validation(updateUserSchema),user.updateUser)
.delete(protectedRoutes ,allowedTo('admin'), validation(deleteUserSchema),user.deleteUser)
.patch(protectedRoutes ,allowedTo('admin', 'user'),validation(changeUserpassSchema),user.changeUserPassword)

export default userRouter
