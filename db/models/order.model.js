const mongoose = require("mongoose")
const validator = require("validator")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    phoneNumbers:[{
        numberType:{
            type:String, 
            trim:true,
            required:true
        },
        phoneNumber:{
            type: String,
            validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
            }
        }
    }],
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
        }
    }],
    shippingAddress: {
        country: {
            type: String,
            trim:true,
            lowercase:true,
            required: true
        },
        city: {
            type: String,
            trim:true,
            lowercase:true,
            required: true
        },
        address: {
            type: String,
            trim:true,
            required: true
        },
        postalCode: {
            type: String,
            trim:true,
            required: true
        }
    },
    paymentMethod: {
        type: String, 
        required: true,
        trim:true,
        lowercase:true,
        enum:["credit card","cash"]
    },
    totalPrice:{
        type: Number,
        default: 0.0
    },
    promoCode: {
        type: String, 
        trim:true,
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order