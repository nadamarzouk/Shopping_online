
import express from "express"
import * as cart from "./cart.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const cartRouter = express.Router()

cartRouter
.route('/')
.post(protectedRoutes ,allowedTo('user'), cart.addProductToCart)
.get(protectedRoutes ,allowedTo('user'), cart.getLoggedUserCart)

cartRouter.post('/couponApply', protectedRoutes ,allowedTo('user'), cart.applyCoupon)
cartRouter.patch('/clear',  protectedRoutes ,allowedTo('user'), cart.clearCart)

cartRouter
.route('/:id')
.delete(protectedRoutes ,allowedTo('admin', 'user'), cart.removeProductFromCart)
.put(protectedRoutes ,allowedTo('admin', 'user'), cart.updateQuantity)

export default cartRouter