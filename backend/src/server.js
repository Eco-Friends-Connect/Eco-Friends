import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import process from 'process';
// router
import postApi from './api/post-api.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const app = express();

// connect to database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize firebase
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);


app.use((req, res, next) => {
    req.auth = auth;
    req.storage = storage;
    next();
}
);

// routes
app.get('/', (req, res) => {
    res.send('The Backend is running');
});

app.use('/api/post', postApi);

// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});