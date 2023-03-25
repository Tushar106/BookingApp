import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import mongoose from "mongoose";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom=async (req, res,next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        // console.log(updateHotel)
        res.status(200).json(updateRoom)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const updateRoomAvailable=async (req, res,next) => {
    try {
        await Room.updateOne({"roomNumbers._id":req.params.id},
        {
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            }
        })
        res.status(200).json("Room status updated")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deletedRoom=async (req, res,next) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelid,{$pull: {rooms:req.params.id}})
        } catch (error) {
            next(error)
        }
        // console.log(deletedRoom)
        res.status(200).json("Deleted the room")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getRoom=async (req, res,next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        // console.log(getHotel)
        res.status(200).json(getRoom)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const allRooms=async (req, res,next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}