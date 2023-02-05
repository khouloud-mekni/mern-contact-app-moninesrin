const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ContactSchema = new Schema({
        firstName:{type: String, required: true},
        lastName:{type: String, required: true},
        email:{ type :String, required:true},
        phone:{type: String, required: true },
        user:{id: { type: Schema.Types.ObjectId, required: true }},
})
module.exports= mongoose.model('Contact', ContactSchema)