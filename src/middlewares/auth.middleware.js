const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
