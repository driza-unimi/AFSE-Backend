const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.unauthorized();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({username: decoded.username}).lean();

        if (!user) {
            res.clearCookie('token');
            return res.badRequest('User does not exist');
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.unauthorized();
    }
}
