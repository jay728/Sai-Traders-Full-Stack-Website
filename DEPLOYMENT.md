# Deployment Guide

This guide will help you deploy the Plastic Business Management System to production using Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub account with repository access
- Render account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)
- Gmail account with App Password for email service

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Whitelist IP addresses (0.0.0.0/0 for all IPs or specific Render IPs)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/plastic-business-management?retryWrites=true&w=majority
```

## 🔧 Step 2: Set Up Email Service

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → App Passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

## 🚀 Step 3: Deploy Backend to Render

### Option A: Using Render Dashboard

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `plastic-business-management-api`
   - **Region**: Choose nearest region (e.g., Singapore for India)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong random string (use: `openssl rand -base64 32`)
   - `COMPANY_EMAIL`: Your company email (e.g., saiitrader24@gmail.com)
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password
   - `NODE_ENV`: `production`

6. Click "Create Web Service"
7. Wait for deployment (2-5 minutes)
8. Copy your Render API URL: `https://plastic-business-management-api.onrender.com`

### Option B: Using render.yaml (Automated)

1. Push the `server/render.yaml` file to your repository
2. Connect your GitHub repository to Render
3. Render will automatically detect and use the configuration

## 🌐 Step 4: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard

1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Project Name**: `plastic-business-management`
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your Render API URL (e.g., `https://plastic-business-management-api.onrender.com`)

6. Click "Deploy"
7. Wait for deployment (1-2 minutes)
8. Copy your Vercel URL: `https://plastic-business-management.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🔐 Step 5: Seed Admin User

After backend deployment, seed the admin user:

1. Open your Render service logs
2. Access the Render shell or use a local terminal:
```bash
# Set your Render API URL
export RENDER_API_URL=https://plastic-business-management-api.onrender.com

# Run the seed script (you may need to SSH into Render)
# Or manually create admin via API
```

**Alternative**: Use the admin registration endpoint if available, or manually insert into MongoDB.

## 🧪 Step 6: Test Deployment

### Test Backend
```bash
# Health check
curl https://plastic-business-management-api.onrender.com/api/health

# Test products endpoint
curl https://plastic-business-management-api.onrender.com/api/products
```

### Test Frontend
1. Open your Vercel URL
2. Test navigation between pages
3. Test product browsing
4. Test inquiry submission
5. Test admin login

## 📊 Step 7: Monitor and Maintain

### Render Dashboard
- Monitor service health
- View logs and metrics
- Set up alerts for downtime
- Scale resources if needed

### Vercel Dashboard
- Monitor deployment status
- View analytics
- Set up custom domains
- Configure environment variables

## 🔧 Troubleshooting

### Backend Issues

**Issue**: Database connection failed
- **Solution**: Check MongoDB Atlas connection string and IP whitelist

**Issue**: Email not sending
- **Solution**: Verify Gmail App Password and 2FA is enabled

**Issue**: API returns 404
- **Solution**: Check build logs and ensure all routes are properly configured

### Frontend Issues

**Issue**: API requests failing
- **Solution**: Verify `VITE_API_URL` is set correctly in Vercel environment variables

**Issue**: Images not loading
- **Solution**: Ensure uploads directory is properly handled (may need cloud storage for production)

**Issue**: Routing not working
- **Solution**: Verify `vercel.json` has proper SPA routing configuration

## 🔄 Continuous Deployment

### Automatic Deployments
Both Render and Vercel support automatic deployments when you push to GitHub:

1. **Render**: Automatically deploys on push to main branch
2. **Vercel**: Automatically deploys on push to main branch

### Manual Deployments
```bash
# Render - push to GitHub or use Render CLI
# Vercel - use Vercel CLI
vercel --prod
```

## 📝 Environment Variables Summary

### Backend (Render)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Random secret for JWT tokens
- `COMPANY_EMAIL`: Company email for password reset
- `EMAIL_USER`: Gmail address for email service
- `EMAIL_PASS`: Gmail App Password
- `NODE_ENV`: Set to `production`

### Frontend (Vercel)
- `VITE_API_URL`: Render API URL

## 🌍 Custom Domain Setup

### Vercel Custom Domain
1. Go to Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

### Render Custom Domain (Optional)
1. Go to Render service settings → Custom Domains
2. Add your custom domain
3. Update DNS records

## 💰 Cost Optimization

### Free Tier Limits
- **Render Free**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel Free**: Unlimited deployments, 100GB bandwidth/month
- **MongoDB Atlas Free**: 512MB storage

### Paid Upgrades
Consider paid plans if:
- High traffic expected
- Need consistent performance
- Require additional storage
- Need custom domains

## 📞 Support

For deployment issues:
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com

---

**Deployment Status Checklist:**
- [ ] MongoDB Atlas configured
- [ ] Email service set up
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Admin user seeded
- [ ] All endpoints tested
- [ ] Custom domains configured (optional)
- [ ] Monitoring set up
