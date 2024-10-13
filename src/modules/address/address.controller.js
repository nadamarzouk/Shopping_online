
import { userModel } from "../../../database/models/user.model.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"




export const addaddress =catchAsyncError(async(req, res, next)=>{
    let result = await userModel.findByIdAndUpdate( req.user._id , { $addToSet: {addresses: req.body}}, { new: true})
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.addresses})
})


export const removeFromaddress =catchAsyncError(async(req, res, next)=>{
    let result = await userModel.findByIdAndUpdate( req.user._id , { $pull: {addresses: {_id: req.body.address}}}, { new: true})
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.addresses})
})

export const getAlluseraddress =catchAsyncError(async(req, res, next)=>{
    let result = await userModel.findOne( {_id: req.user._id} )
    !result && next (new AppError ('review not found', 404))
    result && res.status(200).json({message : 'success', result: result.addresses})
})

