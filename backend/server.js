import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import { registerUser, loginUser } from './controllers/authController.js';

dotenv.config();
const app = express();

connectDB();

// ✅ Correct CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Auth
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);

// Tasks
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));