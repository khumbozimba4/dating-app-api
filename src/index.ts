import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Import your user routes
import { Server, Socket } from 'socket.io';
import http from 'http';

import authRoutes from './routes/AuthRoutes';
import { authenticate } from './middleware/AuthMiddleware';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');

  const db = mongoose.connect('mongodb+srv://khumbo:7P4L96dXLzrVGMXH@cluster0.olgbq.mongodb.net/EfricaDatingDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});