import mongoose from 'mongoose';
import connectDatabase from './src/config/database.js';
import Gallery from './src/models/Gallery.js';

const clearGallery = async () => {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
    
    const result = await Gallery.deleteMany({});
    console.log(`Deleted ${result.deletedCount} gallery items`);
    
    console.log('Gallery collection cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing gallery:', error);
    process.exit(1);
  }
};

clearGallery();
