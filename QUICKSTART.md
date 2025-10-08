# 🚀 Quick Start Guide

Get your Personal Command Center up and running in 3 minutes!

## Step 1: Install Dependencies

Open your terminal in the `Nexora` directory and run:

```bash
cd frontend
npm install
```

This will install all required packages including:
- React
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- React Markdown
- date-fns
- And more...

## Step 2: Start the Application

While still in the `frontend` directory, run:

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to: **http://localhost:3000**

## Step 3: Explore!

You're all set! Here's what you can do:

### 🏠 Dashboard
- View real-time clock and date
- Check the weather (mock data by default)
- Read your daily motivational quote
- Use the focus timer for productivity
- Play ambient sounds for concentration

### ✅ Tasks
- Click "Tasks" in the navigation
- Add your first task
- Set priority levels (High, Medium, Low)
- Check off completed tasks
- Filter by All, Active, or Completed

### 📝 Notes
- Click "Notes" in the navigation
- Create a new note
- Write in markdown format
- Toggle preview to see formatted text
- Search through your notes

### 🚀 Quick Launch
- Click "Quick Launch" in the navigation
- Add your favorite websites
- Choose custom icons and colors
- Click any app to open it in a new tab

### ⚙️ Settings
- Toggle dark/light mode (also available in navbar)
- Export your data as backup
- Import data from a backup file
- View storage usage
- Clear all data if needed

## 🎨 Toggle Dark Mode

Click the sun/moon icon in the top-right corner of the navigation bar to switch between light and dark themes.

## 💾 Your Data is Safe

All your data is stored locally in your browser's localStorage. Nothing is sent to any server unless you configure Firebase (optional).

## 🔧 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
set PORT=3001 && npm start
```

### Dependencies not installing?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling looks broken?
- Make sure Tailwind CSS is properly installed
- Check that `tailwind.config.js` and `postcss.config.js` exist
- Restart the development server

## 📱 Mobile View

The app is fully responsive! Try resizing your browser window or opening it on your phone/tablet.

## 🎯 Pro Tips

1. **Export your data regularly** - Go to Settings → Export Data to create backups
2. **Use keyboard shortcuts** - Press Enter to add tasks or save notes
3. **Organize with priorities** - Color-code your tasks by importance
4. **Try the focus timer** - Use 25-minute Pomodoro sessions for better productivity
5. **Customize Quick Launch** - Add all your daily-use websites for one-click access

## 🌟 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize colors in `tailwind.config.js`
- Set up weather API for real weather data
- Configure Firebase for cloud sync (optional)
- Deploy to Vercel or Netlify for online access

## ❓ Need Help?

Check the main README.md for:
- Detailed feature documentation
- API setup guides
- Deployment instructions
- Customization options

---

**Enjoy your Personal Command Center!** 🎉

Start by adding your first task or note, and make this hub truly yours!
