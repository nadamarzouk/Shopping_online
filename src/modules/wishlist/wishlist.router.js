
import express from "express"
import * as wishlist from "./wishlist.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"
const wishlistRouter = express.Router()

wishlistRouter
.route('/')
.patch(protectedRoutes ,allowedTo('user'), wishlist.addTowishlist)
.delete(protectedRoutes, allowedTo('user'), wishlist.removeFromwishlist)
.get(protectedRoutes, allowedTo('user'), wishlist.getAlluserwishlist)


export default wishlistRouter