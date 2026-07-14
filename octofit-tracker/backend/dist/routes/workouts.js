"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
});
// GET recommended workouts
router.get('/recommended', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find({ recommended: true });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching recommended workouts', error });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workout', error });
    }
});
// POST create new workout
router.post('/', async (req, res) => {
    try {
        const { title, duration } = req.body;
        if (!title || !duration) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const workout = new Workout_1.Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating workout', error });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating workout', error });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({ message: 'Workout deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting workout', error });
    }
});
exports.default = router;
