import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import process from 'process';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
// router
import postApi from './api/post-api.js';
import deleteApi from './api/delete-api.js';
import updateApi from './api/update-api.js';
import getApi from './api/get-api.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';



const app = express();
// Swagger setup
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Eco-Friends Backend API',
        version: '1.0.0',
        description: 'Eco-Friends Backend API',
      },
    },
    apis: ['./src/api/*.js', './src/server.js'], // Path to the API docs
  };

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
// TODO:create-user, login, logout endpoints have been reviewed but the others need review
const swaggerDocs = JSON.parse(fs.readFileSync(path.resolve('./docs/swagger.json'), 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/post', postApi);
app.use('/api/delete', deleteApi);
app.use('/api/put', updateApi);
app.use('/api/get', getApi);

// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});