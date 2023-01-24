const mysql=require('mysql')

require('dotenv').config()


const con=mysql.createConnection({

connectionLimit: 100,

database:process.env.db_name,
host:process.env.db_host,
user:process.env.db_username,
password:process.env.db_password

});




// VIEW USER
module.exports.view=(req,res)=>{

       
        con.query(`SELECT * FROM USER WHERE status ='ACTIVE'`,(err,rows)=>{

            if(!err){
                let removedusers = req.query.removed
                console.log('DATABASE CONNECTED')
                res.render('home',{rows})
                
            }
            else{
                console.log(err+'error occured')
            }
        })
      
}



module.exports.find=(req,res)=>{
    // con.connect((err)=>{
    //     if(err){
    //         console.log(err)
    //     }

        let searchterm=req.body.search

        // let t=Number.parseInt(searchterm)
        // console.log(isNaN(searchterm))
        if(searchterm.length==1 && !isNaN(searchterm)){
           var qry=`SELECT * FROM USER WHERE id=${searchterm} `
        //    console.log(qry)
        }
        if(searchterm=='active'){
            qry=`SELECT * FROM USER WHERE status='${searchterm}'`
        }
        else if(searchterm.includes('@')){
            
            var qry=`SELECT * FROM USER WHERE email='${searchterm}' `
            // console.log(qry)
        }
        else {

            var qry=`SELECT * FROM USER WHERE first_name like '%${searchterm}%' OR last_name like '%${searchterm}%' OR email like '%${searchterm}%' OR phone like '%${searchterm}%'`
        }
        con.query(qry,(err,rows)=>{

            if(!err){
                res.render('home',{rows})
                // console.log(rows.length)
            }
        })
        
        
        // con.end()
    // })
}

module.exports.add=(req,res)=>{
    // con.connect((err)=>{
    //     if(err){

        //         console.log('error found' +err)
        //     }
        res.render('adduser')
        // con.end()
        // })
    }

module.exports.create=(req,res)=>{
   

        const {first_name,last_name,email,phone,comments}=req.body

        
        con.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments],(err,rows)=>{
            if(!err){
                res.render('adduser',{alert:"USER ADDED SUCCESSFULLY"})
            }
            else{
                console.log(err)
            }
         

            
        })
   

}



module.exports.edit=(req,res)=>{

    con.query(`SELECT * FROM USER WHERE id=${req.params.id}`,(err,rows)=>{

        if(!err){
            // let removedusers = req.query.removed
            console.log('DATABASE CONNECTED')
            res.render('edituser',{rows})
            
        }
        else{
            console.log(err+'error occured')
        }
    })

}

module.exports.change=(req,res)=>{
    const {first_name,last_name,email,phone,comments}=req.body
    // let id=req.body.id
    // console.log(req.paramsid)
    let qry=`UPDATE USER SET first_name ='${first_name}',last_name ='${last_name}',email='${email}',phone='${phone}',comments='${comments}' WHERE id=${req.params.id}`
    con.query(qry,(err,rows)=>{
        if(!err){

               con.query(`SELECT * FROM USER WHERE id=${req.params.id}`,(err,rows)=>{

        if(!err){
            // let removedusers = req.query.removed
            console.log('DATABASE CONNECTED')
            res.render('edituser',{rows,alert:'CHANGES SAVED'})
            
        }
        else{
            console.log(err+'error occured')
        }
    })
        }
        else{
            console.log('error ocurred' +err)
        }
    })
}

//DELETE 
module.exports.delete=(req, res) =>{
    // res.render('delete')

    //THIS IS TO ACTUALL DELETE THE RECORD
    // con.query(`DELETE FROM USER WHERE id=${req.params.id}`,(err,rows)=>{

    //     if(!err){
    //         // let removedusers = req.query.removed
    //         console.log('DATABASE CONNECTED')
    //         res.redirect('/')            
    //     }
    //     else{
    //         console.log(err+'error occured')
    //     }
    // })

    con.query(`UPDATE USER SET status='removed' WHERE id=${req.params.id}`,(err,rows)=>{

            if(!err){
                // let removedusers = req.query.removed
                console.log('DATABASE CONNECTED')
                res.redirect('/')            
            }
            else{
                console.log(err+'error occured')
            }
        })

}