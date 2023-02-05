const ContactSchema = require("../models/Contact")
const router = require("express").Router()
const auth = require("../middleware/auth")

// chaque action avec mon base de donnée oblige un await et une async pour mon callbackfunction

//create contact
router.post("/createContact", async (req , res)=>{
    try {
        const {firstName, lastName, email, phone}= req.body
        const Contact = await ContactSchema.create({firstName, lastName, email, phone})
        res.status(200).json({status:true ,msg:"Contact Created",data:Contact})
    } catch (err) {
        console.log(err)
        res.status(500).json({status:false , msg: err})
    }
})
//read contact
router.get("/contactLists", async(req,res)=>{
    try {
        const contactLists = await ContactSchema.find()
        res.status(200).json({status:true , msg:"My all Contacts List", data:contactLists})
        
    } catch (err) {
    console.log(err)
    res.status(500).json({status:false , msg:err})
        
    }
})
//delete contact
router.delete("/deleteContact/:id", async(req,res)=>{
    try {
        const {id}= req.params
        const contactDel= await ContactSchema.findById(id)

        if(contactDel){
            await ContactSchema.findByIdAndDelete(id)
            res.status(200).json({status: true , msg:"contact has been Deleted", data:contactDel})
        }else{
            res.status(200).json({status:false , msg:"contact not found"})
        }

    } catch (err) {
        res.status(500).json({status:false, msg:err })
    }
})
//update contact
router.put("/updateContact/:id", async (req,res)=>{
    try {
        const{id}= req.params
        const contactUpdate = await ContactSchema.findById(id)
        if(contactUpdate){
            await ContactSchema.findByIdAndUpdate(id , {...req.body},{new:true})
            const contactUpdate = await ContactSchema.findById(id)
            res.status(200).json({status: true , msg:"contact has been Updated",data:contactUpdate})
        }else{
            res.status(200).json({status:false , msg:"contact not found"})
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({status :false , msg: err})
    }

})
router.post("/hello", auth ,async(req,res)=>{
    try {
        res.send("haaaaaaloo")
    } catch (err) {
        res.status(500).json({status: false, msg:err})
        
    }
})


// exporter router 
module.exports = router
