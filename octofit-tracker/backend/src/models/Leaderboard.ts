import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    score: {
      type: Number,
      default: 0,
    },
    rank: Number,
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0, // in minutes
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
