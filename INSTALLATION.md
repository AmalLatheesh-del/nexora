## Installation Instructions

Follow these steps to get Nexora running on your machine.

## Prerequisites Check

Before starting, make sure you have:
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)

Check your versions:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Navigate to the Frontend Directory

```bash
cd Nexora/frontend
```

### 2. Install All Dependencies

```bash
npm install
```

This will install:
- react & react-dom (^18.2.0)
- tailwindcss (^3.3.2)
- framer-motion (^10.12.16)
- lucide-react (^0.263.1)
- react-markdown (^8.0.7)
- date-fns (^2.30.0)
- axios (^1.4.0)
- firebase (^9.22.0)
- And all other dependencies

**Note:** Installation may take 2-5 minutes depending on your internet speed.

### 3. Start the Development Server

```bash
npm start
```

The application will:
- Compile the React app
- Start the development server
- Automatically open your browser to `http://localhost:3000`

### 4. Enjoy!

Your Personal Command Center is now running! 🎉

## What Gets Installed?

### Core Dependencies
- **react** - The UI framework
- **react-dom** - React DOM renderer
- **react-scripts** - Build tools and configuration

### Styling & UI
- **tailwindcss** - Utility-first CSS framework
- **autoprefixer** - CSS vendor prefixing
- **postcss** - CSS transformation tool

### Animation & Interaction
- **framer-motion** - Smooth animations and transitions

### Icons & Assets
- **lucide-react** - Beautiful, consistent icons

### Functionality
- **react-markdown** - Render markdown in notes
- **date-fns** - Date formatting and manipulation
- **axios** - HTTP client for API calls

### Optional (Pre-configured)
- **firebase** - For cloud sync and authentication (optional)

## Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Common Installation Issues

### Issue: npm install fails

**Solution 1:** Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2:** Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 is already in use

**Solution:** Use a different port
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

### Issue: Permission errors

**Solution:** Run with appropriate permissions
```bash
# Windows (run as administrator)
# Mac/Linux
sudo npm install
```

### Issue: Slow installation

**Solution:** Use a faster npm registry
```bash
npm install --registry=https://registry.npmjs.org/
```

## Verify Installation

After installation, check that these files exist:
- ✅ `node_modules/` folder (contains all packages)
- ✅ `package-lock.json` (dependency lock file)

## Next Steps

1. ✅ Installation complete
2. 🚀 Run `npm start`
3. 🌐 Open `http://localhost:3000`
4. 🎨 Toggle dark mode
5. ✍️ Add your first task
6. 📝 Create your first note
7. 🚀 Add your favorite apps to Quick Launch

## Need Help?

- Check [QUICKSTART.md](QUICKSTART.md) for usage guide
- Read [README.md](README.md) for full documentation
- Review troubleshooting section in README

---

**Happy productivity!** 🎯
