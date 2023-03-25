import express from 'express';
import  {  updateUser, deletedUser, allUsers,  getUser } from '../controllers/User.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user , u are authenticated")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user , u are loged in and u can delete your account ")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin , u are loged in and u can delete all account ")
// })


//update
router.put("/:id",verifyUser, updateUser)
//Delete
router.delete("/:id",verifyUser, deletedUser)
//Get
router.get("/:id",verifyUser, getUser)
//getAll
router.get("/",verifyAdmin, allUsers)





export default router