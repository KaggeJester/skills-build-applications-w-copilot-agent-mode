"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});
// POST create new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password, profile } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const user = new User_1.User({ username, email, password, profile });
        await user.save();
        const { password: _, ...userResponse } = user.toObject();
        res.status(201).json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.default = router;
