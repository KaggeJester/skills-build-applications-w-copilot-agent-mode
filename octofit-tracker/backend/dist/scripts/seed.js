"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        console.log('Clearing existing collections...');
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        // Create test users
        console.log('Creating test users...');
        const users = await User_1.User.insertMany([
            {
                username: 'alice_runner',
                email: 'alice@octofit.com',
                password: 'hashed_password_123', // In production, use proper hashing
                profile: {
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                },
            },
            {
                username: 'bob_cyclist',
                email: 'bob@octofit.com',
                password: 'hashed_password_456',
                profile: {
                    firstName: 'Bob',
                    lastName: 'Smith',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                },
            },
            {
                username: 'charlie_swimmer',
                email: 'charlie@octofit.com',
                password: 'hashed_password_789',
                profile: {
                    firstName: 'Charlie',
                    lastName: 'Brown',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                },
            },
            {
                username: 'diana_gym',
                email: 'diana@octofit.com',
                password: 'hashed_password_012',
                profile: {
                    firstName: 'Diana',
                    lastName: 'Prince',
                    avatar: 'https://i.pravatar.cc/150?img=4',
                },
            },
            {
                username: 'eve_walker',
                email: 'eve@octofit.com',
                password: 'hashed_password_345',
                profile: {
                    firstName: 'Eve',
                    lastName: 'Davis',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                },
            },
        ]);
        console.log(`✓ Created ${users.length} users`);
        // Create test teams
        console.log('Creating test teams...');
        const teams = await Team_1.Team.insertMany([
            {
                name: 'The Marathoners',
                description: 'A team dedicated to long-distance running',
                members: [users[0]._id, users[1]._id],
                leader: users[0]._id,
            },
            {
                name: 'Cycle Warriors',
                description: 'Cyclists pushing their limits',
                members: [users[1]._id, users[2]._id, users[3]._id],
                leader: users[1]._id,
            },
            {
                name: 'Fit Squad',
                description: 'General fitness and wellness',
                members: [users[3]._id, users[4]._id, users[0]._id],
                leader: users[3]._id,
            },
        ]);
        console.log(`✓ Created ${teams.length} teams`);
        // Create test activities
        console.log('Creating test activities...');
        const activities = await Activity_1.Activity.insertMany([
            {
                userId: users[0]._id,
                activityType: 'running',
                duration: 45,
                calories: 450,
                distance: 7.5,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                teamId: teams[0]._id,
            },
            {
                userId: users[0]._id,
                activityType: 'running',
                duration: 60,
                calories: 600,
                distance: 10,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                teamId: teams[0]._id,
            },
            {
                userId: users[1]._id,
                activityType: 'cycling',
                duration: 90,
                calories: 800,
                distance: 35,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                teamId: teams[1]._id,
            },
            {
                userId: users[1]._id,
                activityType: 'cycling',
                duration: 120,
                calories: 1000,
                distance: 45,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                teamId: teams[1]._id,
            },
            {
                userId: users[2]._id,
                activityType: 'swimming',
                duration: 50,
                calories: 500,
                distance: 2,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                teamId: teams[1]._id,
            },
            {
                userId: users[3]._id,
                activityType: 'gym',
                duration: 75,
                calories: 550,
                distance: 0,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                teamId: teams[2]._id,
            },
            {
                userId: users[4]._id,
                activityType: 'walking',
                duration: 40,
                calories: 200,
                distance: 4,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                teamId: teams[2]._id,
            },
        ]);
        console.log(`✓ Created ${activities.length} activities`);
        // Create leaderboard entries
        console.log('Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                score: 1050,
                rank: 1,
                totalActivities: 2,
                totalDuration: 105,
                totalCalories: 1050,
            },
            {
                userId: users[1]._id,
                teamId: teams[1]._id,
                score: 1800,
                rank: 1,
                totalActivities: 2,
                totalDuration: 210,
                totalCalories: 1800,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                score: 500,
                rank: 2,
                totalActivities: 1,
                totalDuration: 50,
                totalCalories: 500,
            },
            {
                userId: users[3]._id,
                teamId: teams[2]._id,
                score: 550,
                rank: 1,
                totalActivities: 1,
                totalDuration: 75,
                totalCalories: 550,
            },
            {
                userId: users[4]._id,
                teamId: teams[2]._id,
                score: 200,
                rank: 2,
                totalActivities: 1,
                totalDuration: 40,
                totalCalories: 200,
            },
        ]);
        console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);
        // Create test workouts
        console.log('Creating test workouts...');
        const workouts = await Workout_1.Workout.insertMany([
            {
                title: '5K Runner Training',
                description: 'High-intensity interval training for 5K runners',
                difficulty: 'intermediate',
                duration: 45,
                exercises: [
                    { name: 'Warm-up jog', sets: 1, reps: 1, duration: 5 },
                    { name: 'Sprint intervals', sets: 8, reps: 1, duration: 30 },
                    { name: 'Cool-down walk', sets: 1, reps: 1, duration: 10 },
                ],
                caloriesBurned: 400,
                targetArea: 'cardio',
                recommended: true,
            },
            {
                title: 'Full Body Strength',
                description: 'Complete strength training workout',
                difficulty: 'intermediate',
                duration: 60,
                exercises: [
                    { name: 'Squats', sets: 3, reps: 12, duration: 0 },
                    { name: 'Bench press', sets: 3, reps: 10, duration: 0 },
                    { name: 'Deadlifts', sets: 3, reps: 8, duration: 0 },
                    { name: 'Pull-ups', sets: 3, reps: 8, duration: 0 },
                ],
                caloriesBurned: 450,
                targetArea: 'full-body',
                recommended: true,
            },
            {
                title: 'Core Crusher',
                description: 'Intense core strengthening routine',
                difficulty: 'advanced',
                duration: 30,
                exercises: [
                    { name: 'Planks', sets: 3, reps: 1, duration: 0 },
                    { name: 'Russian twists', sets: 3, reps: 20, duration: 0 },
                    { name: 'Bicycle crunches', sets: 3, reps: 20, duration: 0 },
                ],
                caloriesBurned: 200,
                targetArea: 'core',
                recommended: false,
            },
            {
                title: 'Beginner Yoga Flow',
                description: 'Gentle yoga for beginners',
                difficulty: 'beginner',
                duration: 40,
                exercises: [
                    { name: 'Sun salutations', sets: 1, reps: 5, duration: 0 },
                    { name: 'Downward dog', sets: 3, reps: 1, duration: 0 },
                    { name: 'Warrior pose', sets: 2, reps: 1, duration: 0 },
                ],
                caloriesBurned: 150,
                targetArea: 'full-body',
                recommended: true,
            },
            {
                title: 'Upper Body Blitz',
                description: 'Quick upper body and arms workout',
                difficulty: 'intermediate',
                duration: 30,
                exercises: [
                    { name: 'Push-ups', sets: 3, reps: 15, duration: 0 },
                    { name: 'Dumbbell rows', sets: 3, reps: 12, duration: 0 },
                    { name: 'Shoulder press', sets: 3, reps: 10, duration: 0 },
                ],
                caloriesBurned: 250,
                targetArea: 'upper-body',
                recommended: true,
            },
        ]);
        console.log(`✓ Created ${workouts.length} workouts`);
        console.log('\n✅ Database seeding complete!');
        console.log(`
    Summary:
    - Users: ${users.length}
    - Teams: ${teams.length}
    - Activities: ${activities.length}
    - Leaderboard entries: ${leaderboardEntries.length}
    - Workouts: ${workouts.length}
    
    Test data is ready. You can now:
    1. Start the server: npm run dev
    2. Visit API endpoints at http://localhost:8000/api
    3. Try: curl http://localhost:8000/api/health
    `);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
