import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'product title is unique'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    price: {
        type: Number,
        required: [true, 'product price required.'],
        min: 0
    },
    priceAfterDiscount :{
        type: Number,
        min: 0
    },
    ratingAvg: {
        type: Number,
        min: [1, 'rating average must be greater then 1'],
        mix: [5, 'rating average must be less then 5'],
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        minLength: [5, 'too short product description'],
        maxlength: [300, 'too long product description'],
        required: [true, 'product description required.'],
        tirm: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        required: [true, 'product quantity required.'],
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    imgCover: String,
    images: [String],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: [true, 'product category required.'],
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'product subcategory required.'],
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand',
        required: [true, 'product brand required.'],
    },

}, { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} })


productSchema.post('init', (doc) =>{
    doc.imgCover = process.env.BASE_URL + '/product/' + doc.imgCover
    doc.images = doc.images.map((path => process.env.BASE_URL + '/product/' + path))
})


productSchema.virtual('myReview', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
})

productSchema.pre(/^find/, function() {
    this.populate('myReview')
})


export const productModel = mongoose.model('product', productSchema)