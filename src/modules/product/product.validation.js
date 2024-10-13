import joi from "joi"

export const createProductSchema = joi.object({
    title: joi.string().min(2).max(20).required(),
    price: joi.number().min(0).required().required(),
    priceAfterDiscount: joi.number().min(0),
    ratingAvg: joi.number().min(1).max(5),
    ratingCount: joi.number(). min(0),
    description: joi.string().min(5).max(300).required(),
    quantity: joi.number().min(0).required(),
    sold: joi.number().min(0).required(),
    imageCaner:joi.string(),
    images:joi.string(),
    category: joi.string().hex().length(24).required(),
    subcategory: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required()
})

export const getProductSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateSubCategorySchema = joi.object({
    name: joi.string().min(2).max(20),
    id: joi.string().hex().length(24).required(),
    category: joi.string().hex().length(24).required()

})

export const deleteProductSchema = joi.object({
    id: joi.string().hex().length(24).required()
})
