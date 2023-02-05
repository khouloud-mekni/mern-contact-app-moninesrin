const userSchema = require('../models/User')
const router = require("express").Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require("dotenv").config()
/*************** Sign up User **********/ 
router.post("/register", async (req,res)=>{
    try {
        const {userName, email, password}=req.body
        console.log(userName, email, password)
        //checking the fields
        if(!userName || !email || !password){
           res.status(400).json({msg:"all fields are required"})
        }else{

        
        //checking if the user exists
        const existingUser = await userSchema.findOne({email})
        if(existingUser){
            res.status(400).json({msg: "User already exists"})
        }
        else{
        //hashing password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)


            const user = await userSchema.create({
                userName,
                email, 
                password:hashedPassword, 
            })
            res.status(200).json({status:true , msg:"Account has been Created", data:user})
        }
    }  
    } catch (err) {
        console.log(err)
        res.status(500).json({status:false , msg:err})
    }
})
/********** Login User *********** */

router.post("/login", async(req,res)=>{
    try {
        const {email , password}=req.body;
        if(!email || !password){
            res.status(400).json({status: false, msg:"All Fields are required !"})
        }else{
            const user = await userSchema.findOne({email})
            if(user){
                const verifyPassword = await bcrypt.compare(password, user.password)
                if(verifyPassword){
                    //generate Token
                    const token = await jwt.sign({id:user._id}, process.env.SECRET_KEY)
                    res.status(200).json({status: true , msg:"Logged in", data:user, token: token})
                }else{
                    res.status(400).json({status: false, msg:"Incorrect Password, try again! "})
                }

            }else{
                res.status(400).json({status: false, msg:"Your email or password do not match, Please try again! "})
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false, msg: err})
        
    }
})

module.exports=router