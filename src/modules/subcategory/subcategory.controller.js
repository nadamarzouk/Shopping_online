
import { subcategoryModel } from "../../../database/models/subcategory.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import slugify from "slugify"



export const createSubCategory = catchAsyncError( async(req, res)=>{
    const{ name, category } = req.body

    let result = new subcategoryModel ({ name, category, slug: slugify(name) })
    await result.save()

    res.json({message : 'success', result})
})

export const getAllSubCategories = catchAsyncError( async(req, res)=>{
    let filter = {} 
    if(req.params.categoryId){
        filter = { category: req.params.categoryId }
    }
    let result = await subcategoryModel.find(filter)
    
    res.json({message : 'success', result})
})

export const getSubCategory = catchAsyncError( async(req, res, next)=>{
    const { id } = req.params

    let result = await subcategoryModel.findById(id)
    !result && next (new AppError ('subcategory not found', 404))
    result && res.json({message : 'success', result})
})

export const updateSubCategory =catchAsyncError(async(req, res, next)=>{
    const { id } = req.params
    const { name, category } = req.body

    let result = await subcategoryModel.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true})
    !result && next (new AppError ('subcategory not found', 404))
    result && res.json({message : 'success', result})
})

export const deleteSubCategory = factor.deleteOne( subcategoryModel )