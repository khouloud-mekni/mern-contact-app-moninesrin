const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth=(req ,res ,next)=>{
//extrat token 
const token = req.header("authorization")
if(!token){
    res.status(400).json({msg:"your are not authorized"})
}
try {
    //verifying token
    const decode= jwt.verify(token, process.env.SECRET_KEY)
    req.user = decode
    next()
} catch (err) {
    console.log(err)
    res.status(500).json({status:false, msg:err})
    
}
}

module.exports=auth






