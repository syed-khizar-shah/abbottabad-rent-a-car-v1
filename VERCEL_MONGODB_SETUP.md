# Fix MongoDB Atlas Connection Issues on Vercel

## Problem
You're getting this error:
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Whitelist IP Addresses in MongoDB Atlas

### Option 1: Allow All IPs (Recommended for Vercel)
This is the easiest solution for Vercel deployments since Vercel uses dynamic IP addresses.

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Select your cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"** button
5. Click **"Allow Access from Anywhere"** button (or manually enter `0.0.0.0/0`)
6. Click **"Confirm"**
7. Wait 1-2 minutes for changes to propagate

**Security Note:** Allowing `0.0.0.0/0` allows connections from any IP. This is safe as long as:
- Your MongoDB user has a strong password
- You're using connection string authentication
- Your database user has limited permissions (not admin)

### Option 2: Whitelist Vercel IP Ranges (More Secure)
If you want to be more restrictive, you can whitelist Vercel's IP ranges:

1. Go to MongoDB Atlas → Network Access
2. Click **"Add IP Address"**
3. Add these CIDR blocks:
   - `76.76.21.0/24`
   - `76.223.126.0/24`
   - `76.76.19.0/24`
   - `76.76.20.0/24`

**Note:** Vercel's IP ranges can change, so Option 1 is more reliable.

## Verify Environment Variables in Vercel

Make sure these are set in Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Verify these variables are set:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

3. Make sure they're set for **Production** environment
4. Click **"Save"**
5. **Redeploy** your application

## Test Connection

After updating MongoDB Atlas IP whitelist:

1. Wait 2-3 minutes for changes to propagate
2. Redeploy on Vercel (or it will auto-redeploy)
3. Test your API endpoints:
   - `https://your-domain.vercel.app/api/contact`
   - `https://your-domain.vercel.app/api/location`
   - `https://your-domain.vercel.app/api/homepage`

## Troubleshooting

### Still Getting Connection Errors?
1. Double-check `MONGODB_URI` is correct in Vercel environment variables
2. Verify MongoDB Atlas cluster is running (not paused)
3. Check MongoDB Atlas logs: **Monitoring** → **Logs**
4. Try connecting from MongoDB Compass with the same connection string
5. Make sure you're using the correct connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Click on a function to see logs
5. Look for MongoDB connection errors

## Security Best Practices

1. **Use strong passwords** for MongoDB users
2. **Limit database user permissions** - Don't use admin user for application
3. **Enable MongoDB Atlas authentication** - Always require username/password
4. **Use connection string with authentication** - Never expose connection strings publicly
5. **Regular backups** - Set up automated backups in MongoDB Atlas

