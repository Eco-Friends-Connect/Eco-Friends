import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import process from 'process';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// router
import postApi from './api/post-api.js';
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
        title: 'My API',
        version: '1.0.0',
        description: 'A description of my API',
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
/**
 * @swagger
 * /:
 *  get:
 *   summary: check if the Backend is running
 *  responses:
 *      200:
 *      description: A message that the Backend is running is Displayed
 */
app.get('/', (req, res) => {
    res.send('The Backend is running');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
app.use('/api/post', postApi);
app.use('/api/get', getApi);

// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});