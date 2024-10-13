import { couponModel } from "../../../database/models/coupon.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"

import qrcode from "qrcode"


export const createCoupon = catchAsyncError( async(req, res, next)=>{
    let result = new couponModel (req.body)
    await result.save()
    res.status(201).json({message : 'success', result})
})

export const getAllCoupon = catchAsyncError( async(req, res)=>{
    let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .paginate().filter().sort().search().fields()
    //execute query
    let result = await apiFeatures.mongooseQuery
     res.status(200).json({message : 'success', page: apiFeatures.page, result})
})

export const getCoupon = catchAsyncError( async(req, res, next)=>{
    const { id } = req.params

    let result = await couponModel.findById(id)
    let url = await qrcode.toDataURL( result.code )
    !result && next (new AppError ('Coupon not found', 404))
    result && res.status(200).json({message : 'success', result, url})
})

export const updateCoupon =catchAsyncError(async(req, res, next)=>{
    const { id } = req.params
    let result = await couponModel.findOneAndUpdate( {id}, req.body, { new: true})
    !result && next (new AppError ('Coupon not found or you are not authorized to perform this action', 404))
    result && res.status(200).json({message : 'success', result})
})

export const deleteCoupon= factor.deleteOne( couponModel )