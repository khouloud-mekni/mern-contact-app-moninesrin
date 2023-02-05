const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    userName:{ type:String},
    email:{type: String, required: true , unique:true},
    password:{type: String, required: true},
},
{timestamps:true},
)
module.exports=mongoose.model('user',userSchema)