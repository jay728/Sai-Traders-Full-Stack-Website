import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const resetSpecificUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find your existing admin user
    const existingUser = await User.findOne({ email: 'jayraut728@gmail.com' });
    
    if (existingUser) {
      // Reset password to a known value
      existingUser.password = await bcrypt.hash('admin123', 12);
      await existingUser.save();
      console.log('✅ Password reset successfully for jayraut728@gmail.com');
      console.log('📧 Email: jayraut728@gmail.com');
      console.log('🔑 Password: admin123');
      console.log('\nYou can now login with these credentials.');
    } else {
      console.log('❌ User jayraut728@gmail.com not found');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetSpecificUser();
