const express=require('express')
const app=express()
const hbs=require('express-handlebars')
const mysql=require('mysql')

require('dotenv').config()
const port=process.env.port||8000

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})