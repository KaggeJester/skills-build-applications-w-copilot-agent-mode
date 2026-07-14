"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Team',
    },
}, { timestamps: true });
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
