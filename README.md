# Plastic Business Management System

A comprehensive web-based management system for vacuum metallising business operations. Built with React, Node.js, Express, and MongoDB, this system streamlines product management, customer inquiries, and administrative tasks.

## 🌟 Features

### For Customers
- **Product Catalog**: Browse and view premium vacuum metallised products
- **Inquiry System**: Submit product inquiries with detailed requirements
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Real-time Updates**: Instant status updates on inquiries
- **Contact Integration**: Direct WhatsApp and phone integration for quick communication

### For Administrators
- **Dashboard**: Comprehensive overview of business metrics and activities
- **Product Management**: Add, edit, and delete products with image uploads
- **Inquiry Management**: Track and manage customer inquiries with status updates
- **Order Management**: Process and track orders from inquiry to completion
- **User Authentication**: Secure admin panel with JWT-based authentication
- **Email Notifications**: Automated email notifications for inquiries and updates

### Business Features
- **Multi-finish Support**: Chrome, Rainbow, and custom finish options
- **Budget Management**: Track customer budget ranges and pricing
- **Quick Response**: 2-4 hour response guarantee for customer inquiries
- **Location Integration**: Google Maps integration for business location
- **Business Hours**: Display operating hours and availability status

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Nodemailer**: Email service integration
- **CORS**: Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/your-username/plastic-business-management-system.git
cd plastic-business-management-system
```

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Seed the admin user:
```bash
npm run seed:admin
```

Start the server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

## 🚀 Usage

### Accessing the Application
- **Customer Portal**: Open `http://localhost:5173` in your browser
- **Admin Panel**: Navigate to `/admin/login` and use seeded credentials

### Default Admin Credentials
- **Email**: admin@saitrader.com
- **Password**: admin123

*Note: Change these credentials after first login for security*

## 📁 Project Structure

```
plastic-business-management-system/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── hooks/         # Custom hooks
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── scripts/       # Database scripts
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Inquiries
- `GET /api/inquiries` - Get all inquiries (Admin)
- `GET /api/inquiries/:id` - Get single inquiry (Admin)
- `POST /api/inquiries` - Submit inquiry (Public)
- `PUT /api/inquiries/:id` - Update inquiry status (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order (Admin)
- `POST /api/orders` - Create order from inquiry (Admin)
- `PUT /api/orders/:id` - Update order status (Admin)

## 🎨 Key Features Explained

### Product Management
- Upload product images with automatic optimization
- Categorize products by type and finish
- Set pricing and availability status
- Track product views and inquiries

### Inquiry System
- Collect detailed customer requirements
- Automatic email notifications to admin
- Status tracking (Pending, In Progress, Completed)
- Quick response integration with WhatsApp

### Dashboard
- Real-time statistics and metrics
- Recent inquiries and orders overview
- Product performance analytics
- Quick action buttons for common tasks

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables for API URL

### Backend (Heroku/Render)
1. Push code to your hosting platform
2. Configure environment variables
3. Set up MongoDB Atlas for production database
4. Configure email service credentials

## 📧 Contact

**SAI TRADER**
- **Location**: Babla Compound, Gaibi Nagar, opposite Sana Hotel, Kalyan Road, Bhiwandi - 421308
- **Phone**: +91 96232 55747, +91 79720 39556
- **Email**: saiitrader24@gmail.com
- **WhatsApp**: +91 79720 39556
- **Business Hours**: Mon-Sat, 9AM-6PM

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project for SAI TRADER. External contributions are not currently accepted.

## 📄 Privacy Policy

This system collects customer information solely for business purposes. All data is stored securely and is not shared with third parties.

---

Built with ❤️ for SAI TRADER - Premium Vacuum Metallising Solutions
