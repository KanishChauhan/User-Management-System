const mysql=require('mysql')

require('dotenv').config()


const con=mysql.createConnection({

connectionLimit: 100,
database:process.env.db_name,
host:process.env.db_host,
user:process.env.db_username,
password:process.env.db_password
});




//VIEW USER
module.exports.view=(req,res)=>{

    // res.render('home')
    con.connect((err)=>{
        if(err){
            console.log('error connecting' + err)
        }
       
        con.query('SELECT email FROM USER WHERE id=1',(err,rows)=>{

            if(!err){
                let removedusers = req.query.removed
                console.log('DATABASE CONNECTED')
                res.render('home',{rows})

            }
            else{
                console.log('error occured')
            }
            console.log(process.env.p)
            // con.destroy()
        })


    })
    
}