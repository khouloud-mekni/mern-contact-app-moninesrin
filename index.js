const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();

//initializing the app
const app = express()


const PORT = process.env.PORT || 6000
const MONGO_URI = process.env.MONGO_URI
// convert the json format to object
app.use(express.json())

//import routes to use it 
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/authRoutes"))

//listening to port  
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNIG ON PORT ${PORT}`)
})
//connecting to db
mongoose
    .connect(MONGO_URI)
    .then(
        () => { console.log("DB CONNECTED") }
    )
    .catch((err) => {
        console.log(err)
    })
