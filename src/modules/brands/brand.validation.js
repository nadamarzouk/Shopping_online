import joi from "joi"

export const createBrandSchema = joi.object({
    name: joi.string().min(2).max(20).required()
})

export const getBrandSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateBrandSchema = joi.object({
    name: joi.string().min(2).max(20),
    id: joi.string().hex().length(24).required()

})

export const deleteBrandSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

