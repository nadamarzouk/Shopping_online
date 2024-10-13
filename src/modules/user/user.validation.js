import joi from "joi"

export const createUserSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email( /^[a-zA-Z0-9]{2, }@(yahoo|gamil).com$/).required(), 
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,50}$/).required(),
    phone: joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/).required()

})

export const getUserSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateUserSchema = joi.object({
    name: joi.string().min(1),
    email: joi.string().email( /^[a-zA-Z0-9]{2, }@(yahoo|gamil).com$/), 
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,50}$/),
    phone: joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
    id: joi.string().hex().length(24).required()

})

export const deleteUserSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const changeUserpassSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,50}$/).required(),
})
