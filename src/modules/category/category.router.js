import express from "express"
import * as category from "./category.controller.js"
import subCategoryRouter from "../subcategory/subcategory.router.js"
import { validation } from "../../middleware/validation.js"
import { createCategorySchema, getCategorySchem, updateCategorySchema,
     deleteCategorySchema } from "./category.validation.js"
import { uploadSinglefile } from "../../middleware/fileUpload.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const categoryRouter = express.Router()
categoryRouter.use('/:categoryId/subcategories', subCategoryRouter)

categoryRouter
.route('/')
.post(protectedRoutes ,allowedTo('admin'),uploadSinglefile('image', 'category'), validation(createCategorySchema),category.createCategory)
.get(category.getAllCategories)

categoryRouter
.route('/:id')
.get(validation(getCategorySchem), category.getCategory)
.put(protectedRoutes ,allowedTo('admin'),uploadSinglefile('image', 'category'), validation(updateCategorySchema), category.updateCategory)
.delete(protectedRoutes ,allowedTo('admin'),validation(deleteCategorySchema),category.deleteCategory)

export default categoryRouter