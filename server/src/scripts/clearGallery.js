import connectDatabase from '../config/database.js';
import '../config/env.js';
import Gallery from '../models/Gallery.js';

const clearGallery = async () => {
  await connectDatabase();
  console.log('Connected to database');

  await Gallery.deleteMany({});
  console.log('Cleared all gallery items');

  console.log('Gallery cleared successfully!');
  process.exit(0);
};

clearGallery().catch((error) => {
  console.error(`Clear failed: ${error.message}`);
  process.exit(1);
});
