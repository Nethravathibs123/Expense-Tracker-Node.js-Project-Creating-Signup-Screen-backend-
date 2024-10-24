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

        // Validate password
        if (!isPasswordValid(password)) {
            if (password.length < 8) {
                return res.status(400).json({ message: 'The password length is too short.' });
            } else if (password.length > 20) {
                return res.status(400).json({ message: 'The password length is too long.' });
            } else {
                return res.status(400).json({ message: 'A password must have at least one lowercase letter, one uppercase letter, and one digit (no other characters allowed).' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        // Respond with the created user (or just a success message)
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
