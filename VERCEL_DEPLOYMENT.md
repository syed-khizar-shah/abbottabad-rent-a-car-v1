# Vercel Deployment Guide

## Required Environment Variables

Add these environment variables in your Vercel project settings:

### Database
- `MONGODB_URI` - Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Authentication
- `JWT_SECRET` - A secure random string for JWT token signing (e.g., generate with `openssl rand -base64 32`)

### Cloudinary (for image uploads)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

### Site URL (Optional - for production)
- `NEXT_PUBLIC_SITE_URL` - Your production site URL (e.g., `https://yourdomain.com`)

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Make sure to select the appropriate environments (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application for changes to take effect

## Common Issues

### API Routes Not Working
- ✅ Check that all environment variables are set in Vercel
- ✅ Verify `MONGODB_URI` is correct and accessible
- ✅ Check Vercel function logs for errors
- ✅ Ensure cookies are being set correctly (check browser DevTools → Application → Cookies)

### Cookies Not Working
- ✅ Cookies are set with `secure: true` in production (HTTPS required)
- ✅ `sameSite: 'lax'` allows cookies to work across your domain
- ✅ Check that your domain is using HTTPS in production

### Database Connection Issues
- ✅ Verify MongoDB connection string is correct
- ✅ Check MongoDB IP whitelist (should allow all IPs or Vercel's IPs)
- ✅ Verify database user has proper permissions

## Testing Production API Routes

After deployment, test your API routes:
- Login: `POST https://yourdomain.com/api/auth/login`
- Get cars: `GET https://yourdomain.com/api/cars`
- Get homepage: `GET https://yourdomain.com/api/homepage`

## Debugging

1. Check Vercel Function Logs:
   - Go to your project → Deployments → Click on a deployment → Functions tab
   - Look for errors in API route logs

2. Check Browser Console:
   - Open DevTools → Network tab
   - Look for failed API requests
   - Check response status codes and error messages

3. Test API Routes Directly:
   - Use Postman or curl to test API endpoints
   - Check if endpoints return proper responses

