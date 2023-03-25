import e from "express"
import  Hotel from '../models/Hotel.js';
import Room from "../models/Room.js";

export const createHotel=async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const updateHotel=async (req, res) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        // console.log(updateHotel)
        res.status(200).json(updateHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deletedHotel=async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        // console.log(deletedHotel)
        res.status(200).json("Deleted the hotel")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getHotel=async (req, res) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        // console.log(getHotel)
        res.status(200).json(getHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const allHotels=async (req, res) => {
    const {limit,min,max,...other}=req.query;    
    try {
        const hotels = await Hotel.find({...other,CheapestPrice:{$gt:min ||1 , $lt:max||10000}}).limit(limit);
        res.status(200).json(hotels)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const countByCity=async (req, res) => {
    const cities=req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const countByType=async (req, res) => {
    try {
        const hotelCount=await Hotel.countDocuments({type:"hotel"});
        const appartmentCount=await Hotel.countDocuments({type:"appartment"});
        const resortCount=await Hotel.countDocuments({type:"resort"});
        const villasCount=await Hotel.countDocuments({type:"villas"});
        const cabinCount=await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"resort",count:resortCount},
            {type:"appartment",count:appartmentCount},
            {type:"villas",count:villasCount},
            {type:"cabin",count:cabinCount},
        ])
        // res.status(200).json("success")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getHotelRooms=async (req,res,next)=>{
    try {
        const hotel= await Hotel.findById(req.params.id)    
        const list=await Promise.all(hotel.rooms.map(roomId=>{
            return Room.findById(roomId)
        }))
        res.status(200).json(list)
        
    } catch (error) {
        next(error)
        
    }

}

