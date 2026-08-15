import connectDatabase from '../config/database.js';
import '../config/env.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Gallery from '../models/Gallery.js';

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const seedData = async () => {
  await connectDatabase();
  console.log('Connected to database');

  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Gallery.deleteMany({});
  console.log('Cleared existing data');

  // Categories from Home.jsx
  const categoriesData = [
    { name: 'Home Decor Items', description: 'Decorative household products', displayOrder: 1 },
    { name: 'Hair & Fashion Accessories', description: 'Fashion clips and claws', displayOrder: 2 },
    { name: 'Artificial Pearls & Beads', description: 'Decorative beads and pearls', displayOrder: 3 },
    { name: 'Cosmetic Packaging', description: 'Caps and containers', displayOrder: 4 },
    { name: 'Caps & Closures', description: 'Product sealing components', displayOrder: 5 },
    { name: 'Gift & Promotional Items', description: 'Promotional products', displayOrder: 6 },
    { name: 'Automotive Parts', description: 'Vehicle components', displayOrder: 7 },
    { name: 'Electrical Components', description: 'Electronic parts', displayOrder: 8 },
    { name: 'Household Products', description: 'Daily use items', displayOrder: 9 },
    { name: 'Custom PP & ABS Parts', description: 'PP and ABS components', displayOrder: 10 },
  ];

  const categories = [];
  for (const catData of categoriesData) {
    const category = await Category.create({
      ...catData,
      slug: generateSlug(catData.name),
      isActive: true,
    });
    categories.push(category);
    console.log(`Created category: ${category.name}`);
  }

  // Products from Products.jsx (Home Decor)
  const decorativeProducts = [
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM (1).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (1).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (2).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (3).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM.jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (1).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (2).jpeg',
    '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (3).jpeg',
  ];

  const homeDecorCategory = categories.find(c => c.name === 'Home Decor Items');
  for (let i = 0; i < decorativeProducts.length; i++) {
    const product = await Product.create({
      name: `Home Decor Product ${i + 1}`,
      slug: generateSlug(`home-decor-product-${i + 1}`),
      category: homeDecorCategory._id,
      description: 'Decorative household product with premium finish',
      material: 'Other',
      finishType: 'Custom',
      images: [decorativeProducts[i]],
      isActive: true,
    });
    console.log(`Created product: ${product.name}`);
  }

  // Products from Products.jsx (Hair Accessories)
  const hairAccessoriesProducts = [
    '/Hair Accessories/1.jpeg',
    '/Hair Accessories/2.jpeg',
    '/Hair Accessories/3.jpeg',
    '/Hair Accessories/4.jpeg',
    '/Hair Accessories/5.jpeg',
  ];

  const hairCategory = categories.find(c => c.name === 'Hair & Fashion Accessories');
  for (let i = 0; i < hairAccessoriesProducts.length; i++) {
    const product = await Product.create({
      name: `Hair Accessory ${i + 1}`,
      slug: generateSlug(`hair-accessory-${i + 1}`),
      category: hairCategory._id,
      description: 'Fashion hair accessory with decorative coating',
      material: 'Other',
      finishType: 'Custom',
      images: [hairAccessoriesProducts[i]],
      isActive: true,
    });
    console.log(`Created product: ${product.name}`);
  }

  // Gallery items from Gallery.jsx
  const galleryData = [
    { title: 'Home Decor Items', type: 'Product', description: 'Decorative household products', image: '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg' },
    { title: 'Hair Accessories', type: 'Product', description: 'Fashion clips and claws', image: '/Hair Accessories/1.jpeg' },
    { title: 'Artificial Pearls', type: 'Product', description: 'Decorative beads and pearls', image: null },
    { title: 'Cosmetic Packaging', type: 'Product', description: 'Caps and containers', image: null },
    { title: 'Caps & Closures', type: 'Product', description: 'Product sealing components', image: null },
    { title: 'Gift Items', type: 'Product', description: 'Promotional products', image: null },
    { title: 'Automotive Parts', type: 'Product', description: 'Vehicle components', image: null },
    { title: 'Electrical Components', type: 'Product', description: 'Electronic parts', image: null },
    { title: 'Household Products', type: 'Product', description: 'Daily use items', image: null },
    { title: 'Custom Parts', type: 'Product', description: 'PP and ABS components', image: null },
  ];

  for (const galleryItem of galleryData) {
    if (galleryItem.image) {
      const gallery = await Gallery.create({
        title: galleryItem.title,
        description: galleryItem.description,
        type: galleryItem.type,
        images: [galleryItem.image],
        isActive: true,
      });
      console.log(`Created gallery item: ${gallery.title}`);
    }
  }

  console.log('Data seeding completed successfully!');
  process.exit(0);
};

seedData().catch((error) => {
  console.error(`Seed failed: ${error.message}`);
  process.exit(1);
});
