import connectDatabase from '../config/database.js';
import '../config/env.js';
import User from '../models/User.js';

const seedAdmin = async () => {
  if (!process.env.ADMIN_NAME || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error('Add ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD to .env first.');
  await connectDatabase();
  const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (existingUser) { console.log('Admin user already exists.'); process.exit(0); }
  await User.create({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  console.log('Admin user created successfully.');
  process.exit(0);
};

seedAdmin().catch((error) => { console.error(`Admin seed failed: ${error.message}`); process.exit(1); });
