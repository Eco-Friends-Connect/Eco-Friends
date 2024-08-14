import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import process from 'process';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
// router
import postApi from './api/post-api.js';
import getApi from './api/get-api.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeApp as initializeAdminApp } from 'firebase-admin/app';
import { getStorage } from 'firebase/storage';
import { cert } from 'firebase-admin/app';


const app = express();

// connect to database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize firebase
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const adminConfig = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const adminApp = initializeAdminApp({
    credential: cert(adminConfig)});
const storage = getStorage(firebaseApp);


app.use((req, res, next) => {
    req.auth = auth;
    req.storage = storage;
    req.adminApp = adminApp;
    next();
}
);

// routes
app.get('/', (req, res) => {
    res.send('The Backend is running');
});
// TODO:create-user, login, logout endpoints have been reviewed but the others need review
const swaggerDocs = JSON.parse(fs.readFileSync(path.resolve('./docs/swagger.json'), 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/post', postApi);
app.use('/api/get', getApi);

// environment variables
dotenv.config();
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});