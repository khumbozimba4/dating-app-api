

import mongoose from 'mongoose';

  const db = mongoose.connect('mongodb+srv://khumbo:7P4L96dXLzrVGMXH@cluster0.olgbq.mongodb.net/EfricaDatingDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default db;
