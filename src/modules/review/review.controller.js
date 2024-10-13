
import { reviewModel } from "../../../database/models/review.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"



export const createReview = catchAsyncError( async(req, res, next)=>{
    req.body.user = req.user._id

    let isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if(isReview) return next (new AppError ('You created a review befor', 409))

    let result = new reviewModel (req.body)
    await result.save()
    res.status(201).json({message : 'success', result})
})

export const getAllReviews = catchAsyncError( async(req, res)=>{
    let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .paginate().filter().sort().search().fields()
    //execute query
    let result = await apiFeatures.mongooseQuery
     res.status(200).json({message : 'success', page: apiFeatures.page, result})
})

export const getReview = catchAsyncError( async(req, res, next)=>{
    const { id } = req.params

    let result = await reviewModel.findById(id)
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result})
})

export const updateReview =catchAsyncError(async(req, res, next)=>{
    const { id } = req.params
    let result = await reviewModel.findOneAndUpdate({ _id:id, user: req.user._id}, req.body, { new: true})
    !result && next (new AppError ('review not found or you are not authorized to perform this action', 404))
    result && res.status(200).json({message : 'success', result})
})

export const deleteReview = factor.deleteOne( reviewModel )