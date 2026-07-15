"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.CODESPACE_NAME = exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = 8000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS configuration for Codespaces and localhost
const corsOptions = {
    origin: (origin, callback) => {
        const CODESPACE_NAME = process.env.CODESPACE_NAME;
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174',
            'http://127.0.0.1:3000',
        ];
        // Add explicit Codespaces frontend URLs when env is available
        if (CODESPACE_NAME) {
            allowedOrigins.push(`https://${CODESPACE_NAME}-5173.app.github.dev`);
            allowedOrigins.push(`https://${CODESPACE_NAME}-5174.app.github.dev`);
            allowedOrigins.push(`https://${CODESPACE_NAME}-3000.app.github.dev`);
        }
        const isCodespacesFrontendOrigin = (() => {
            if (!origin) {
                return false;
            }
            try {
                const { protocol, hostname } = new URL(origin);
                return protocol === 'https:' && /^[a-z0-9-]+-(5173|5174|3000)\.app\.github\.dev$/i.test(hostname);
            }
            catch {
                return false;
            }
        })();
        // Allow requests without origin (like curl or mobile apps)
        if (!origin || allowedOrigins.includes(origin) || isCodespacesFrontendOrigin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// Codespaces-aware API URL support
const CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.CODESPACE_NAME = CODESPACE_NAME;
const baseUrl = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.baseUrl = baseUrl;
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker API is running',
        apiUrl: baseUrl,
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
    });
});
// Start Server
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`OctoFit Tracker API running on http://localhost:${PORT}`);
            console.log(`API Base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
