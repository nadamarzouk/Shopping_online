import { cartModel } from "../../../database/models/cart.model.js"
import { orderModel } from "../../../database/models/order.model.js"
import { productModel } from "../../../database/models/product.model.js"
import * as factor from "../../handlers/factor.handler.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"
import Stripe from "stripe"
const stripe = new Stripe('sk_test_51Q6zmpP90016ybaKYjXZ8W2cqsHjGiIAI6b4BNJMpeb9XGh0LfapqZaz9tBL8uVt1P8NwMQK82A9E2a4CswobVNS0049J3GCT5')

export const createCashOrder = catchAsyncError( async(req, res, next)=>{
    //1- get cart >> cartID
    const cart = await cartModel.findById (req.params.id ) 
    //2- calc total price
    const totalOrderPrice = cart.totalPriceAfterDiscount?
    cart.totalPriceAfterDiscount : cart.totalPrice
    //3- creat order 
    const order = new orderModel({
        user:req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress
    })
    await order.save()
    if(order) {
        //4- increment sold & decrement quantity
    let options = cart.cartItems.map(item => ({
        updateOne: {
            filter: { _id: item.product },
            update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
        }
    }))
    await productModel.bulkWrite(options)
    // 5- clear user cart
    await cartModel.findByIdAndDelete(req.params.id)
    }
   return res.status(201).json({message : 'success', order})

})

export const getSpecificOrder = catchAsyncError( async(req, res, next)=>{

    let order = await orderModel.findOne({ user: req.user._id }).populate('cartItems.product')
    res.status(201).json({message : 'success', order})

    
})

export const getAllOrders = catchAsyncError( async(req, res, next)=>{

    let orders = await orderModel.find({}).populate('cartItems.product')
    res.status(201).json({message : 'success', orders})

    
})

export const createCheckOutSession = catchAsyncError( async(req, res, next)=>{
     //1- get cart >> cartID
     const cart = await cartModel.findById (req.params.id ) 
     //2- calc total price
     const totalOrderPrice = cart.totalPriceAfterDiscount?
     cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: 'https://route-comm.netlify.app/#/',
        cancel_url: 'https://route-comm.netlify.app/#/cart',
        customer_email: req.user.email,
        client_reference_id:req.params.id,
        metadata: req.body.shippingAddress
    })
    res.status(201).json({message: 'success', session})
    
})