"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    teamId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Leaderboard = mongoose_1.default.model('Leaderboard', leaderboardSchema);
