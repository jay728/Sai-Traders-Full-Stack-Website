import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find existing admin user
    const existingUser = await User.findOne({ email: 'admin@saitrader.com' });
    
    if (existingUser) {
      // Update password
      existingUser.password = await bcrypt.hash('admin123', 12);
      await existingUser.save();
      console.log('✅ Password reset successfully for existing user');
    } else {
      // Create new admin user
      const newUser = await User.create({
        name: 'Admin',
        email: 'admin@saitrader.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ New admin user created successfully');
    }

    console.log('📧 Email: admin@saitrader.com');
    console.log('🔑 Password: admin123');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdminPassword();
