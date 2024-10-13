
import { userModel } from "../../../database/models/user.model.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"




export const addTowishlist =catchAsyncError(async(req, res, next)=>{
    const { product } = req.body
    let result = await userModel.findByIdAndUpdate( req.user._id , { $addToSet: {wishlist: product}}, { new: true})
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.wishlist})
})


export const removeFromwishlist =catchAsyncError(async(req, res, next)=>{
    const { product } = req.body
    let result = await userModel.findByIdAndUpdate( req.user._id , { $pull: {wishlist: product}}, { new: true})
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.wishlist})
})

export const getAlluserwishlist =catchAsyncError(async(req, res, next)=>{
    let result = await userModel.findOne( {_id: req.user._id} ).populate('wishlist')
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.wishlist})
})

