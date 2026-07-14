import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        duration: Number,
      },
    ],
    caloriesBurned: Number,
    targetArea: {
      type: String,
      enum: ['full-body', 'upper-body', 'lower-body', 'cardio', 'core'],
    },
    recommended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);
