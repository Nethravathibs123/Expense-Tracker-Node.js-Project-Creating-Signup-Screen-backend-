const bcrypt = require('bcryptjs');
const Users = require('../models/user');

function isPasswordValid(str) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,20}$/; // Alphanumeric with at least one lowercase, one uppercase, one digit
    return typeof str === 'string' && pattern.test(str);
}

exports.postAddUsers = async (req, res) => {
    const { username, email, password } = req.body; 
    console.log('Received Data:', req.body);
    
    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'A user with the same email already exists.' });
        }

        // Validate password (assuming this is defined in your code)
        if (!isPasswordValid(password)) {
            return res.status(400).json({ message: 'Password does not meet criteria.' });
        }

        // Hash the password and create the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ username, email, password: hashedPassword });

        return res.status(201).json({
            message: 'User registered successfully.',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
