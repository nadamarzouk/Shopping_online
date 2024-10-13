import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [1, 'too short category name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email required'],
        minLength: 1,
        unique: [true, 'email must be unique'],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'minlength 6 characters']
    },
    phone: {
        type: String, 
        required: [true, 'phone number required'],
    },
    profilepic: String,
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: Date, 
    verified:{
        type: Boolean,
        default: false
    },
    wishlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'product' }],
    addresses: [{ 
        city: String,
        street: String,
        phone: String
    }]
}, { timestamps: true})

userSchema.pre('save', function() {       //for create
    this.password = bcrypt.hashSync(this.password, 7)
})

userSchema.pre('findOneAndUpdate', function() {       //for update
    if( this._update.password ) this._update.password =  bcrypt.hashSync(this._update.password, 7)
})

export const userModel = mongoose.model('user', userSchema)