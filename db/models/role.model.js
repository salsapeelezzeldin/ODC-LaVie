const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    role:{
        type:String, 
        trim:true,
        lowercase:true,
        unique: true,
        required:true
    }, 
    status: {
        type:Boolean,
        default: true
    }
}, {
    timestamps:true
})
roleSchema.virtual("Users", {
    ref:"User",
    localField:"role",
    foreignField:"roles.roleName"
})
// roleSchema.virtual("Urls", {
//     ref:"Url",
//     localField:"role",
//     foreignField:"roleName"
// })

const Role = mongoose.model("Role", roleSchema)
module.exports=Role