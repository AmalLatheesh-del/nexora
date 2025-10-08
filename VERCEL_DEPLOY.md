# 🚀 Quick Vercel Deployment Guide

## Prerequisites
- Vercel account (free): https://vercel.com/signup
- Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel Dashboard (Recommended - 5 minutes)

### Step 1: Push to GitHub (if not already done)
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables (Optional - for Firebase)
In Vercel project settings → Environment Variables, add:
```
REACT_APP_FIREBASE_API_KEY=your_value
REACT_APP_FIREBASE_AUTH_DOMAIN=your_value
REACT_APP_FIREBASE_PROJECT_ID=your_value
REACT_APP_FIREBASE_STORAGE_BUCKET=your_value
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_value
REACT_APP_FIREBASE_APP_ID=your_value
REACT_APP_WEATHER_API_KEY=your_value (optional)
```

### Step 4: Deploy
Click **"Deploy"** and wait 2-3 minutes. Done! 🎉

---

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy from Project Root
```bash
cd Hack4Ease
vercel
```

Follow the prompts:
- Set up and deploy: **Yes**
- Which scope: **Your account**
- Link to existing project: **No**
- Project name: **nexora** (or your preferred name)
- In which directory is your code located: **./frontend**

### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## Post-Deployment (If using Firebase)

### Update Firebase Authorized Domains
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add your Vercel domain: `your-app.vercel.app`

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure environment variables are set correctly
- Try: `vercel --force` to clear cache

### Firebase Not Working
- Verify all environment variables are set in Vercel dashboard
- Check that variable names start with `REACT_APP_`
- Redeploy after adding variables

### 404 on Page Refresh
- Already handled in `vercel.json` with rewrites configuration

---

## Useful Commands

```bash
# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Open project in browser
vercel open

# Remove a deployment
vercel rm [deployment-url]
```

---

## Success Checklist
- ✅ App loads at Vercel URL
- ✅ All pages accessible
- ✅ Dark mode works
- ✅ Firebase auth works (if configured)
- ✅ No console errors
- ✅ Mobile responsive

---

## Your App is Live! 🎉
Share your deployment: `https://your-app.vercel.app`

## Next Steps
1. Add a custom domain (optional)
2. Enable Vercel Analytics
3. Set up automatic deployments from GitHub
4. Share with friends!
