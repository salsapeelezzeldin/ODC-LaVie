const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    password:{
        type:String, 
        trim:true,
        minLength: 5,
        required:true
    },
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20
    }, 
    roleName:{
        type:String,
        required: true,
        ref:"Role"
    },
    image:{
        type:String, 
        trim:true
    }, 
    age:{
        type:Number,
        min:1,
        max:100
    },  
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    dOfBirth:{
        type: Date
    }, 
    education:{
        type:String, 
        trim:true,
        lowercase:true
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
    country:{
        type:String, 
        trim:true,
        lowercase:true
    },
    city:{
        type:String, 
        trim:true,
        lowercase:true
    },
    location:{
        type:String, 
        trim:true
    },
    level:{
        type: String,
        trim:true,
        lowercase:true,
        ref: 'Level', 
    }, 
    tokens:[{
        token:{ type:String, required:true}
    }],
    shoppingCart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    CartTotalPrice:{
        type: Number,
        default: 0.0
    },
    bookMarks: [
        // products:[{
        //     product: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         required: true,
        //         ref: 'Product'
        //     }
        // }]
    ]
}, {
    timestamps:true
})

userSchema.pre("save", async function(){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 8)
    }
})
userSchema.statics.loginUser = async(email, password) => {
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const validatePassword = await bcryptjs.compare(password, userData.password)
    if(!validatePassword) throw new Error("invalid password")
    return userData
}
userSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    delete data.tokens
    return data
}
userSchema.methods.generateToken = async function(){
    const userData = this
    const token = jwt.sign({_id: userData._id}, process.env.tokenPassword)
    userData.tokens = userData.tokens.concat({token})
    await userData.save()
    return token
}

const User = mongoose.model("User", userSchema)
module.exports=User