"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB Connection
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});
// Start Server
const startServer = async () => {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
exports.default = app;
