import mongoose from 'mongoose';

const connectDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;

  if (!databaseUri) {
    throw new Error('MONGODB_URI is missing. Add it to the server .env file.');
  }

  const connection = await mongoose.connect(databaseUri);

  console.log(`MongoDB connected: ${connection.connection.host}`);
};

export default connectDatabase;
