"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
