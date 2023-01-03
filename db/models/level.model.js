const mongoose = require("mongoose")

const levelSchema = mongoose.Schema({
    level:{
        type:String, 
        trim:true,
        lowercase:true,
        unique: true,
        required:true
    }
}, {
    timestamps:true
})

const Level = mongoose.model("Level", levelSchema)
module.exports = Level