
import { cartModel } from "../../../database/models/cart.model.js"
import { couponModel } from "../../../database/models/coupon.model.js"
import { productModel } from "../../../database/models/product.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"


function calcTotalPrice(cart){
    console.log({items:cart?.cartItems});
    let totalPrice = 0
    cart.cartItems.forEach( elm => {
        totalPrice += elm.quantity * elm.price 
    })
    cart.totalPrice = totalPrice
}

export const addProductToCart = catchAsyncError( async(req, res, next)=>{

    let product = await productModel.findById(req.body.product)
    if(!product) return next (new AppError('product not found', 404))
    req.body.price = product.price   

    let isCartExist = await cartModel.findOne({ user: req.user._id })
    if(!isCartExist){
        let cart = new cartModel ({
            user: req.user._id,
            cartItems: [ req.body ]
        })
        console.log("nada");
        
        console.log({items:cart?.cartItems});
        calcTotalPrice(cart)

        await cart.save()
        return res.status(201).json({ message : 'success', cart })
    }

    let item = isCartExist.cartItems.find(elm => elm.product == req.body.product )
    if(item){
        item.quantity += req.body.quantity || 1
    } else{
        isCartExist.cartItems.push(req.body)
    }
    calcTotalPrice(isCartExist)

    if(isCartExist.discount){
        isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (  isCartExist.totalPrice * isCartExist.discount ) / 100

    }
    await isCartExist.save()
    res.status(201).json({message : 'success', cart: isCartExist})
})


export const removeProductFromCart =catchAsyncError(async(req, res, next)=>{
    let result = await cartModel.
    findOneAndUpdate( {user: req.user._id} , { $pull: {cartItmes: {_id: req.params.id}}}, { new: true})
    !result && next (new AppError ('item not found', 404))
    calcTotalPrice(result)
    if(result.discount){
        result.totalPriceAfterDiscount = result.totalPrice - (  result.totalPrice * result.decount ) / 100
    }
    result && res.status(200).json({message : 'success', result})
})


export const updateQuantity = catchAsyncError( async(req, res, next)=>{

    let product = await productModel.findById(req.params.id)
    if(!product) return next (new AppError('product not found', 401))

    let isCartExist = await cartModel.findOne({ user: req.user._id })
   
    let item = isCartExist.cartItems.find( (elm) => elm.product == req.params.id )
    if(item){
        item.quantity = req.body.quantity
    }
    calcTotalPrice(isCartExist)
    if(isCartExist.discount){
        isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (  isCartExist.totalPrice * isCartExist.decount ) / 100

    }
    await isCartExist.save()
    res.status(201).json({message : 'success', cart: isCartExist})
})


export const applyCoupon = catchAsyncError( async(req, res, next)=>{
    let coupon = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() }})
    let cart = await cartModel.findOne({ user: req.user._id })

    cart.totalPriceAfterDiscount = cart.totalPrice - ( cart.totalPrice * coupon.discount ) / 100
    cart.discount = coupon.discount

    await cart.save()
    res.status(201).json({ message : 'success', cart })


})


export const getLoggedUserCart = catchAsyncError( async(req, res, next)=>{
    let cartItems = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    
    res.status(201).json({message : 'success', cart: cartItems})
})


export const clearCart = catchAsyncError( async(req, res, next)=>{
    
    const cart = await cartModel.updateOne({ user: req.user._id }, { products: []})
   return res.status(201).json({message : 'success', cart })


})
