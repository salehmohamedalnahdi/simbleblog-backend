const express= require('express')
const app= express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const blogRoutes=require('./routes/blogRoute.js')


app.use('/',blogRoutes)
app.listen(3000,()=>console.log("connecting is done"))















