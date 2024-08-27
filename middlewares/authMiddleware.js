const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.unauthorized();
        }

        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        console.log(err);
        return res.unauthorized();
    }
}
