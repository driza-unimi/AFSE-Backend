require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authMiddleware = require('./middlewares/authMiddleware');
const authorizeAdmin = require('./middlewares/authorizeAdmin');
const responseExtensions = require('./middlewares/responseExtensions');
const errorHandler = require("./middlewares/errorHandler");

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => await setup())
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

async function setup() {
    const app = express();

    app.use(cookieParser())
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))

    app.use(express.json());
    app.use(responseExtensions);

    app.use('/api/v1', authRoute);

    app.use(authMiddleware);
    // TODO routes
    app.use('/api/v1/user', userRoute);

    app.use(authorizeAdmin);
    app.use('/api/v1/admin', adminRoute);

    app.use(errorHandler);

    app.listen(PORT, () => {
        process.stdout.write('\x1Bc');
        console.log(`[${(new Date()).toLocaleString()}] Server running on http://localhost:${PORT}`);
    });
}