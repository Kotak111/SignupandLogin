const express = require('express')
const app = express()
const port = 5000
require("dotenv").config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./config/db")
const UserRoutes=require("./Routes/UserRoute")
const dataRoute=require("./Routes/Dataroute")
// app.use("/api/user",UserRoutes)
app.use("/api/user",UserRoutes)
app.use("/api/data",dataRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))