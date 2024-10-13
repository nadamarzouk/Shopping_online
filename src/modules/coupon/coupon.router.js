
import express from "express"
import * as coupon from "./coupon.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const couponRouter = express.Router()

couponRouter
.route('/')
.post(protectedRoutes ,allowedTo('user'), coupon.createCoupon)
.get(coupon.getAllCoupon)

couponRouter
.route('/:id')
.get(coupon.getCoupon)
.put(protectedRoutes ,allowedTo('user'), coupon.updateCoupon)
.delete(protectedRoutes ,allowedTo('admin', 'user'), coupon.deleteCoupon)

export default couponRouter