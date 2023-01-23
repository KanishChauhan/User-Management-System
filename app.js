const express=require('express')
const app=express()
const exphbs=require('express-handlebars')
const path=require('path')
const mysql=require('mysql')
const router=require('./server/router/router')


require('dotenv').config()
const port=process.env.port||8000

//parsing middleware
//parese application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse application/json
app.use(express.json())

// static css files
app.use(express.static(path.join(__dirname,'public')))

app.engine('hbs',exphbs.engine({extname:'.hbs'}))
app.set('view engine', 'hbs')

app.use('/',router)


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})


