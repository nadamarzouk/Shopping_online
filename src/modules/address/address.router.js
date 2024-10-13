
import express from "express"
import * as address from "./address.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"
const addressRouter = express.Router()

addressRouter
.route('/')
.patch(protectedRoutes ,allowedTo('user'), address.addaddress)
.delete(protectedRoutes, allowedTo('user'), address.removeFromaddress)
.get(protectedRoutes, allowedTo('user'), address.getAlluseraddress)


export default addressRouter