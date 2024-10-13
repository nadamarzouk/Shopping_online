import { categoryModel } from "../../../database/models/category.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import * as factor from "../../handlers/factor.handler.js" 
import slugify from "slugify"



export const createCategory = catchAsyncError( async(req, res)=>{
   req.body.slug = slugify(req.body.name)
   req.body.image = req.file.filename

    let result = new categoryModel (req.body)
    await result.save()

    res.json({message : 'success', result})
})

export const getAllCategories = catchAsyncError( async(req, res)=>{
    let apiFeatures = new ApiFeatures( categoryModel.find(), req.query)
    .paginate().filter().sort().search().fields()
    //execute query
    let result = await apiFeatures.mongooseQuery
     res.status(200).json({message : 'success', page: apiFeatures.page, result})
})

export const getCategory = catchAsyncError( async(req, res, next)=>{
    const { id } = req.params

    let result = await categoryModel.findById(id)
    !result && next (new AppError ('brand not found', 404))
    result && res.json({message : 'success', result})
})

export const updateCategory =catchAsyncError(async(req, res, next)=>{
    const { id } = req.params
    req.body.slug = slugify(req.body.name)
   req.body.image = req.file.filename

    let result = await categoryModel.findByIdAndUpdate(id, req.body, { new: true})
    !result && next (new AppError ('category not found', 404))
    result && res.json({message : 'success', result})
})

export const deleteCategory = factor.deleteOne( categoryModel )
   