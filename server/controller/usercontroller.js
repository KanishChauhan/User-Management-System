const mysql=require('mysql')



const con=mysql.createConnection({
    host:process.env.db_host,
    database:process.env.db_name,
    user:process.env.db_username,
    password:process.env.db_password
})


con.connect((err)=>{
    if(err){
        console.log('error connecting' + err)
    }
    else{
        console.log('connection established')
    }
})
// VIEW USER