"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
// GET all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find()
            .populate('userId', '-password')
            .populate('teamId');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});
// GET activities by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find({ userId: req.params.userId })
            .populate('userId', '-password')
            .populate('teamId');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user activities', error });
    }
});
// GET activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id)
            .populate('userId', '-password')
            .populate('teamId');
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activity', error });
    }
});
// POST create new activity
router.post('/', async (req, res) => {
    try {
        const { userId, activityType, duration } = req.body;
        if (!userId || !activityType || !duration) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const activity = new Activity_1.Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating activity', error });
    }
});
// PUT update activity
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate('userId', '-password').populate('teamId');
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating activity', error });
    }
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error });
    }
});
exports.default = router;
