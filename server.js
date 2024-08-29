require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

const authMiddleware = require('./middlewares/authMiddleware');
const authorizeAdmin = require('./middlewares/authorizeAdmin');
const responseExtensions = require('./middlewares/responseExtensions');
const errorHandler = require("./middlewares/errorHandler");

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in environment variables.');
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const app = express();

// Setup Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AFSE API',
            version: '1.0.0',
        },
    },
    apis: [
        './docs/*.js',
        './routes/*.js',
    ],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
}));

app.use(responseExtensions);
app.use(express.json(), (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err.message);
        return res.badRequest('Invalid JSON format');
    }
    next();
});

app.use('/api/v1', authRoute);

app.use(authMiddleware);
app.use('/api/v1/user', userRoute);

app.use(authorizeAdmin);
app.use('/api/v1/admin', adminRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    process.stdout.write('\x1Bc'); //console.clear();
    console.log(`[${(new Date()).toLocaleString()}] Server running on http://localhost:${PORT}`);
    console.log(`[${(new Date()).toLocaleString()}] Swagger running on http://localhost:${PORT}/api-docs`);
});
