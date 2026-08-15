import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createEnvAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'saiitrader24@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SaiiTrader@123';
    const adminName = process.env.ADMIN_NAME || 'SAI TRADER Admin';

    // Check if user already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      console.log(`✅ User ${adminEmail} already exists`);
      console.log('Updating password to match .env configuration...');
      existingUser.password = await bcrypt.hash(adminPassword, 12);
      existingUser.name = adminName;
      await existingUser.save();
      console.log('✅ Password updated successfully');
    } else {
      // Create new admin user
      const newUser = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created successfully from .env configuration');
    }

    console.log('\n📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Name:', adminName);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createEnvAdmin();
