const mysql=require('mysql')

// require('dotenv').config()


const con=mysql.createConnection({

connectionLimit: 100,
database:'user_management_system',
host:'localhost',
user:"root",
password:'Kanish2225!'
});


//VIEW USER
module.exports.view=(req,res)=>{

    res.render('home')
    con.connect((err)=>{
        if(err){
            console.log('error connecting' + err)
        }
       
        con.query('SELECT email FROM USER WHERE id=1',(err,rows)=>{

            if(!err){
                let removedusers = req.query.removed
                res.render('home',{rows})

            }
            else{
                console.log('error occured')
            }
            console.log(rows)
            con.destroy()
        })

    })
    
}