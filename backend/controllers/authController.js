import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Using a fallback string for rapid local testing if .env is missing
const JWT_SECRET = process.env.JWT_SECRET || 'o2h_secret_system_token_key';

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const newUser = await User.create({ email, password });
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ token, email: user.email });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};