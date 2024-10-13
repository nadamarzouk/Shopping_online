
import express from "express"
import * as order from "./order.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const orderRouter = express.Router()

orderRouter
.route('/:id')
.post(protectedRoutes ,allowedTo('user'), order.createCashOrder)


orderRouter.get('/All', order.getAllOrders)
orderRouter.post('/checkout/:id', protectedRoutes ,allowedTo('user'), order.createCheckOutSession)

orderRouter
.route('/')
.get(protectedRoutes ,allowedTo( 'user'), order.getSpecificOrder)

export default orderRouter