const express=require('express')
const router = express.Router();
const user=require('../controller/usercontroller');

////////////////////////////////
// console.log(user.view)
router.get('/',user.view)
router.post('/',user.find)
router.get('/adduser',user.add)
router.post('/adduser',user.create)
router.get('/edituser/:id',user.edit)
// router.post('/edituser/:id',user.edit)




module.exports=router
