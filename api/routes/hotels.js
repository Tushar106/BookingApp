import express from 'express';
import  { createHotel, updateHotel, deletedHotel, allHotels, getHotel, countByCity, countByType, getHotelRooms } from '../controllers/hotel.js'; 
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


//Create
router.post("/",verifyAdmin, createHotel);
//update
router.put("/:id",verifyAdmin, updateHotel)
//Delete
router.delete("/:id",verifyAdmin, deletedHotel)
//Get
router.get("/find/:id", getHotel)
//getAll
router.get("/", allHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms);







export default router