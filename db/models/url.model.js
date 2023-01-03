const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    url:{
        type:String, 
        trim:true,
        required:true
    }, 
    method:{
        type:String, 
        trim:true,
        required:true
    }, 
    query: [], 
    roles: [{
        roleName:{ type:String }
    }]
}, {
    timestamps:true
})

const Url = mongoose.model("Url", urlSchema)
module.exports=Url