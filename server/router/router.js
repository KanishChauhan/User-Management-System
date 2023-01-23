const express=require('express')
const router = express.Router();
const user=require('../controller/usercontroller');

////////////////////////////////
// console.log(user.view)
router.get('/',user.view)




module.exports=router
