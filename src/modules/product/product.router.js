
import express from "express"
import * as product from "./product.controller.js"
import { validation } from "../../middleware/validation.js"
import {createProductSchema, getProductSchema, updateSubCategorySchema,
     deleteProductSchema  } from "./product.validation.js"
import { uploadMixOfFiles } from "../../middleware/fileUpload.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"
let fieldsArray = [{name: 'imgCover', maxCount: 1}, {name: 'images',  maxCount: 10}]
const productRouter = express.Router()

productRouter
.route('/')
.post(protectedRoutes ,allowedTo('admin','user'), uploadMixOfFiles(fieldsArray, 'product'),validation(createProductSchema),product.createProduct)
.get(product.getAllProducts)

productRouter
.route('/:id')
.get(validation(getProductSchema),product.getProduct)
.put(protectedRoutes ,allowedTo('admin'), uploadMixOfFiles(fieldsArray, 'product'), validation(updateSubCategorySchema),product.updateProduct)
.delete(protectedRoutes ,allowedTo('admin'), validation(deleteProductSchema),product.deleteProduct)

export default productRouter