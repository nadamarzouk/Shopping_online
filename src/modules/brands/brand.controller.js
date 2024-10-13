
import { brandModel } from "../../../database/models/brand.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"
import slugify from "slugify"



export const createBrand = catchAsyncError( async(req, res)=>{
    req.body.slug = slugify(req.body.name)
     req.body.logo = req.file.filename

    let result = new brandModel (req.body)
    await result.save()

    res.json({message : 'success', result})
})

export const getAllBrands = catchAsyncError( async(req, res)=>{
    let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate().filter().sort().search().fields()
    //execute query
    let result = await apiFeatures.mongooseQuery
     res.status(200).json({message : 'success', page: apiFeatures.page, result})
})

export const getBrand = catchAsyncError( async(req, res, next)=>{
    const { id } = req.params

    let result = await brandModel.findById(id)
    !result && next (new AppError ('brand not found', 404))
    result && res.json({message : 'success', result})
})

export const updateBrand =catchAsyncError(async(req, res, next)=>{
    const { id } = req.params
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let result = await brandModel.findByIdAndUpdate(id, req.body, { new: true})
    !result && next (new AppError ('brand not found', 404))
    result && res.json({message : 'success', result})
})

export const deleteBrand = factor.deleteOne( brandModel )