const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const { JWT_SECRET } = require('../config/env');

const authenticate = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) return res.status(401).json({ message: 'No token provided' });

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findByPk(decoded.id, { include: Role });
        if (!user) return res.status(401).json({ message: 'Invalid token' });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
};

// Role check middleware
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role.name)) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
