const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_TIME_IN_SECONDS = Number(process.env.JWT_EXPIRE_TIME_IN_SECONDS);

router.post('/signup', asyncMiddleware(async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.badRequest('All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if (existingUser) {
        return res.badRequest("Username or email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        email,
        password: hashedPassword
    });

    await user.save();
    await createUserToken(res, user);

    res.success();
}));

router.post('/login', asyncMiddleware(async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.badRequest('Invalid credentials');
    }

    await createUserToken(res, user);

    res.success('Logged in successfully');
}));

router.post('/logout', asyncMiddleware(async (req, res) => {
    res.clearCookie('token');
    res.success('Logout successful');
}));

async function createUserToken(res, user) {
    const token = jwt.sign(
      {username: user.username, role: user.role},
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE_TIME_IN_SECONDS },
    );

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 3600, //1h --- //1000 * 3600 * 24, // 1 day
    });
}

module.exports = router;