const WorkoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req,res) => {
    //descending
    const workouts = await WorkoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    
    //if you passed id not exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(4040).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //error handling
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }
    //end error handling

    //add to DB
    try {
        const workout = await WorkoutModel.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    //if you passed id not exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(4040).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findOneAndDelete({_id: id})
    
    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}
//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    //if you passed id not exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(4040).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findOneAndUpdate({_id: id},{
        ...req.body
    })
    
    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}