const authService = require('./auth.service');
const { generateToken } = require('../../utils/jwt');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await authService.register({ firstName, lastName, email, password, role });

        // Generate JWT
        const token = generateToken({ id: user.id, role: user.Role.name });

        res.status(201).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.Role.name
            },
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const user = await authService.login({ email, password });

        const token = generateToken({ id: user.id, role: user.Role.name });

        res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.Role.name
            },
            token
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { register, login };
