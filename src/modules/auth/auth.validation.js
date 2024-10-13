import joi from 'joi'

 export const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email( /^[a-zA-Z0-9]{2, }@(yahoo|gamil).com$/).required(), 
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,50}$/).required(),
    phone: joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/).required()

})

 export const signInSchema = joi.object({
     email: joi.string().email( /^[a-zA-Z0-9]{2, }@(yahoo|gamil).com$/).required(), 
      password: joi.string().pattern(/^[A-Z][a-z0-9]{8,50}$/).required(),
})
