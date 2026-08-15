import connectDatabase from '../config/database.js';
import '../config/env.js';
import Gallery from '../models/Gallery.js';

const addVideoToGallery = async () => {
  await connectDatabase();
  console.log('Connected to database');

  const galleryItem = await Gallery.create({
    title: 'Hair Accessories Production',
    description: 'Hair accessories production process video',
    type: 'Product',
    images: ['/videos/IMG_3066.MOV'],
    isActive: true,
  });

  console.log(`Created gallery item: ${galleryItem.title}`);
  console.log('Video added to gallery successfully!');
  process.exit(0);
};

addVideoToGallery().catch((error) => {
  console.error(`Add video failed: ${error.message}`);
  process.exit(1);
});
