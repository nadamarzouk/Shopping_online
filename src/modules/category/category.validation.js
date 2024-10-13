import joi from "joi"

export const createCategorySchema = joi.object({
    name: joi.string().min(2).max(20).required()
})

export const getCategorySchem = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateCategorySchema = joi.object({
    name: joi.string().min(2).max(20),
    id: joi.string().hex().length(24).required()

})

export const deleteCategorySchema = joi.object({
    id: joi.string().hex().length(24).required()
})
