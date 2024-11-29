// Rate limiting - Done
// Schema Validation - Done
// Escaping HTML and CSS Protection
// ORM and SQL Injection
// Limiting the payload size
// HTTP response headers using helmet - Done
// Scaling Nodejs server

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { connectDB } from './src/db/index.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://13.233.126.240:5173', 'http://localhost:5173'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },  
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type, Authorization', 
  credentials: true,  
};
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.get('/health', (req, res) => {
  res.send('Server up time: ' + new Date().toLocaleString());
})

// Routes import
import userRouter from './src/routes/user.router.js';

// Routes declaration
app.use('/user', userRouter);
console.log('User routes loaded');

// Database connection and server start
connectDB().then(() => { 
  app.listen(PORT, (req ,res) => { 
    console.log(`Server is running on port ${PORT}`);
  });
})
  .catch((error) => {
    console.log('Error connecting to the database: ', error);
  }
);