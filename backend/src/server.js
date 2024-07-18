import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import process from 'process';
// routers
import userRouter from './api/user_api.js';
// import orgRouter from './api/org_api.js';

const app = express();

// connect to database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('The Backend is running');
});

app.use('/api/user', userRouter);
app.use('/api/org', userRouter);
// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});