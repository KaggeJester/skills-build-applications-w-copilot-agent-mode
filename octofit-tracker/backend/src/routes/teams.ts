import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members', '-password').populate('leader', '-password');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

// GET team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members', '-password')
      .populate('leader', '-password');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
});

// POST create new team
router.post('/', async (req, res) => {
  try {
    const { name, description, leader } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    const team = new Team({ name, description, leader });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
});

// PUT update team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('members', '-password').populate('leader', '-password');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error });
  }
});

// DELETE team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

export default router;
