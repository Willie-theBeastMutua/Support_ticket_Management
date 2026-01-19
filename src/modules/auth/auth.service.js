// src/modules/auth/auth.service.js
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');
const Role = require('../../models/role.model');

const SALT_ROUNDS = 10;

const register = async ({ firstName, lastName, email, password, role = 'USER' }) => {
    // Check if email exists
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('Email already registered');

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Find role
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) throw new Error('Invalid role');

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash,
        roleId: userRole.id
    });

    // Attach role for response
    user.Role = userRole;

    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    return user;
};

module.exports = { register, login };
