const express=require('express')
const router = express.Router();
const user=require('../controller/usercontroller');

////////////////////////////////
// console.log(user.view)
// router.get('/',user.view)

router.get('/', function(req, res){
    res.render('home')
})


module.exports=router
