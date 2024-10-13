
import express from "express"
import * as brand from "./brand.controller.js"
import { validation } from "../../middleware/validation.js"
import { createBrandSchema, getBrandSchema, updateBrandSchema, deleteBrandSchema } from "./brand.validation.js"
import { uploadSinglefile } from "../../middleware/fileUpload.js"
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js"

const brandRouter = express.Router()

brandRouter
.route('/')
.post(protectedRoutes ,allowedTo('admin', 'user'),uploadSinglefile('logo', 'brand'),validation(createBrandSchema),brand.createBrand)
.get(brand.getAllBrands)

brandRouter
.route('/:id')
.get(validation(getBrandSchema),brand.getBrand)
.put(protectedRoutes ,allowedTo('admin'),uploadSinglefile('logo', 'brand'),validation(updateBrandSchema),brand.updateBrand)
.delete(protectedRoutes ,allowedTo('admin'),validation(deleteBrandSchema),brand.deleteBrand)

export default brandRouter