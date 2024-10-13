
import express from "express"
import * as review from "./review.controller.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const reviewRouter = express.Router()

reviewRouter
.route('/')
.post(protectedRoutes ,allowedTo('user'), review.createReview)
.get(review.getAllReviews)

reviewRouter
.route('/:id')
.get(review.getReview)
.put(protectedRoutes ,allowedTo('user'), review.updateReview)
.delete(protectedRoutes ,allowedTo('admin', 'user'), review.deleteReview)

export default reviewRouter