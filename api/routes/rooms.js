import express from 'express';
import  { createRoom, updateRoom, deletedRoom, allRooms, getRoom, updateRoomAvailable } from '../controllers/Room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


//Create
router.post("/:hotelId",verifyAdmin, createRoom);
//update
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailable)

//Delete
router.delete("/:id/:hotelid",verifyAdmin,deletedRoom)
//Get
router.get("/:id", getRoom)
//getAll
router.get("/", allRooms)





export default router