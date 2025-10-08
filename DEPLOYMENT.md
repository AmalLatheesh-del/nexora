# 🚀 Vercel Deployment Guide

Complete guide to deploy Nexora to Vercel in minutes!

## Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free) - [Sign up here](https://vercel.com/signup)
- ✅ Your code pushed to GitHub

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
cd Nexora
git init
git add .
git commit -m "Initial commit - Nexora Personal Command Center"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexora.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your **nexora** repository
5. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://nexora-xxx.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd Nexora
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: No
- **Project name**: nexora
- **Directory**: `./frontend`
- **Override settings**: No

### Step 4: Add Environment Variables

```bash
vercel env add REACT_APP_FIREBASE_API_KEY
vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN
vercel env add REACT_APP_FIREBASE_PROJECT_ID
vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET
vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID
vercel env add REACT_APP_FIREBASE_APP_ID
```

### Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

## Post-Deployment Setup

### 1. Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Vercel domain: `nexora-xxx.vercel.app`

### 2. Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your custom domain
4. Follow DNS configuration instructions

### 3. Update Firestore Security Rules

Make sure your Firestore rules are production-ready:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /tasks/{taskId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /notes/{noteId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /settings/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Automatic Deployments

Vercel automatically deploys:
- ✅ **Production**: Every push to `main` branch
- ✅ **Preview**: Every push to other branches
- ✅ **Pull Requests**: Automatic preview deployments

## Vercel Configuration

The `vercel.json` file is already configured:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "framework": "create-react-app"
}
```

## Build Settings

If you need to modify build settings in Vercel Dashboard:

**General:**
- Framework Preset: `Create React App`
- Root Directory: `frontend`

**Build & Development Settings:**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key | `AIzaSyC...` |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `nexora.firebaseapp.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID | `nexora-12345` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `nexora.appspot.com` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | `123456789` |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc` |

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Clear cache and rebuild
vercel --force
```

**Error: "Build exceeded maximum duration"**
```bash
# Solution: Optimize build
# Remove unused dependencies
npm prune
```

### Firebase Not Working

**Error: "Firebase not initialized"**
- Check environment variables are set in Vercel
- Verify variable names start with `REACT_APP_`
- Redeploy after adding variables

**Error: "Auth domain not authorized"**
- Add Vercel domain to Firebase authorized domains
- Wait 5 minutes for changes to propagate

### Routing Issues

**Error: "404 on page refresh"**
- Already handled in `vercel.json`
- All routes redirect to `index.html`

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Compression (Gzip/Brotli)
- ✅ Image optimization
- ✅ Edge caching

## Monitoring

View deployment logs:
```bash
vercel logs
```

View production logs:
```bash
vercel logs --prod
```

## Rollback

Rollback to previous deployment:
1. Go to Vercel Dashboard → **Deployments**
2. Find previous successful deployment
3. Click **"..."** → **"Promote to Production"**

## Cost

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments

Perfect for personal projects!

## Quick Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# Open project in browser
vercel open
```

## Success Checklist

After deployment, verify:
- ✅ App loads at Vercel URL
- ✅ Dark mode toggle works
- ✅ All pages accessible
- ✅ Firebase auth works (if configured)
- ✅ Data persists in localStorage
- ✅ Mobile responsive
- ✅ No console errors

## Next Steps

1. **Share your app**: `https://your-app.vercel.app`
2. **Add custom domain**: Make it professional
3. **Enable analytics**: Track usage
4. **Set up monitoring**: Get alerts
5. **Add to portfolio**: Showcase your work!

---

## Example Deployment Output

```bash
$ vercel --prod

Vercel CLI 28.0.0
🔍 Inspect: https://vercel.com/username/nexora/xxx
✅ Production: https://nexora.vercel.app [2m]
📝 Deployed to production. Run `vercel --prod` to overwrite later.
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your Nexora app is now live! 🎉**

Share it with the world: `https://nexora-xxx.vercel.app`
