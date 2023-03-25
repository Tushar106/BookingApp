import e from "express"
import  User from '../models/User.js';


export const updateUser=async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        // console.log(updateUser)
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deletedUser=async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        // console.log(deletedUser)
        res.status(200).json("Deleted the User")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getUser=async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id)
        // console.log(getUser)
        res.status(200).json(getUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const allUsers=async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}