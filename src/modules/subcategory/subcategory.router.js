import express from "express"
import * as subcategory from "./subcategory.controller.js"
import { validation } from "../../middleware/validation.js"
import { createSubCategorySchema, getSubCategorySchema,
     updateSubCategorySchema, deleteSubCategorySchema  } from "./subcategory.validation.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"     

const subCategoryRouter = express.Router( {mergeParams: true} )

subCategoryRouter
.route('/')
.post(protectedRoutes ,allowedTo('admin','user'),validation(createSubCategorySchema),subcategory.createSubCategory)
.get(subcategory.getAllSubCategories)

subCategoryRouter
.route('/:id')
.get(validation(getSubCategorySchema),subcategory.getSubCategory)
.put(protectedRoutes ,allowedTo('admin'),validation(updateSubCategorySchema),subcategory.updateSubCategory)
.delete(protectedRoutes ,allowedTo('admin'),validation(deleteSubCategorySchema),subcategory.deleteSubCategory)

export default subCategoryRouter