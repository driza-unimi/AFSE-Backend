module.exports = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.error('Not an admin user.', req.user);
        return res.unauthorized();
    }
    next();
}
