import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// GET all leaderboard entries
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 })
      .populate('userId', '-password')
      .populate('teamId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

// GET leaderboard by team
router.get('/team/:teamId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ teamId: req.params.teamId })
      .sort({ score: -1 })
      .populate('userId', '-password')
      .populate('teamId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team leaderboard', error });
  }
});

// GET leaderboard entry for user
router.get('/user/:userId', async (req, res) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate('userId', '-password')
      .populate('teamId');
    
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

// POST create leaderboard entry
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating leaderboard entry', error });
  }
});

// PUT update leaderboard entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('userId', '-password').populate('teamId');
    
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leaderboard entry', error });
  }
});

// DELETE leaderboard entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leaderboard entry', error });
  }
});

export default router;
