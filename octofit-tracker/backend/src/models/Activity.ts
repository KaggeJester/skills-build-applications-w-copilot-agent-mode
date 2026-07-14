import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'other'],
      required: true,
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    calories: Number,
    distance: Number, // in kilometers
    date: {
      type: Date,
      default: Date.now,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', activitySchema);
