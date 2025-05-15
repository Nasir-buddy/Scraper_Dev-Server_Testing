import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return mongoose;
  }
  try {
    const uri = process.env.MONGODB_URI;
    console.log(uri,"uri");
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME,
    });

    isConnected = true;
    console.log(isConnected,"isConnected");
    console.log('Connected to MongoDB using Mongoose');
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

