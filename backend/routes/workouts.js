const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// routes (react to requests)
// GET all  workouts
router.get('/', getWorkouts)

// GET single workout 
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DLETE a new workout
router.delete('/:id', deleteWorkout)

// UPDATE a new workout
router.patch('/:id', updateWorkout)

//export
module.exports = router