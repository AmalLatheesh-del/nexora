# Nexora - Personal Command Center

A modern, elegant, and responsive Personal Command Center that helps you manage and simplify your daily life. Built with React, Tailwind CSS, and Framer Motion for a beautiful, futuristic user experience.

## ✨ Features

### 🏠 Dashboard
- **Real-time Clock & Calendar** - Always know the current time and date
- **Weather Widget** - Stay informed about current weather conditions
- **Daily Motivational Quotes** - Start your day with inspiration
- **Focus Timer** - Pomodoro-style timer with customizable durations (15m, 25m, 45m)
- **Ambient Sounds** - Background sounds for better focus (Rain, Ocean, Forest, White Noise)

### ✅ Task Manager
- **Add, Edit, Delete Tasks** - Full CRUD operations for task management
- **Priority Levels** - Organize tasks by High, Medium, or Low priority
- **Task Filtering** - View All, Active, or Completed tasks
- **Completion Tracking** - Check off tasks and track your progress
- **Statistics Dashboard** - See total, active, and completed tasks at a glance
- **Local Storage** - All tasks saved automatically in your browser

### 📝 Notes & Journal
- **Markdown Support** - Write rich-formatted notes with markdown
- **Live Preview** - Toggle between edit and preview modes
- **Search Functionality** - Quickly find notes by title or content
- **Auto-save** - Notes saved automatically to local storage
- **Markdown Cheatsheet** - Built-in reference guide
- **Timestamps** - Track creation and update times

### 🚀 Quick Launch
- **Favorite Apps** - One-click access to your most-used websites
- **Customizable Icons** - Choose from multiple icon options
- **Color Themes** - Personalize each app with different colors
- **Search Apps** - Quickly find the app you need
- **Pre-configured Apps** - Includes Gmail, YouTube, ChatGPT, GitHub, Twitter, LinkedIn
- **Easy Management** - Add, edit, or remove apps as needed

### ⚙️ Settings
- **Data Management** - Export/Import your data as JSON
- **Storage Monitor** - See how much browser storage you're using
- **Clear Data** - Reset all data with one click
- **Notifications Toggle** - Enable/disable system notifications
- **Privacy Info** - All data stored locally, completely private
- **Theme Toggle** - Switch between light and dark modes

### 🎨 Design Features
- **Light/Dark Mode** - Beautiful themes for any preference
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, minimal, Apple/Notion-inspired interface
- **Custom Scrollbars** - Styled for both light and dark modes
- **Gradient Accents** - Eye-catching color gradients throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd Nexora
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies (optional)**
   ```bash
   cd ../backend
   npm install
   ```

4. **Start the development server**
   ```bash
   cd ../frontend
   npm start
   ```

5. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to `http://localhost:3000`

### Optional: Weather API Setup

To get real weather data instead of mock data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the `frontend` directory
3. Add your API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

### Optional: Firebase Setup

To enable cloud sync and authentication:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Get your Firebase configuration
3. Update `frontend/src/firebase.js` with your credentials
4. Uncomment the Firebase code in the file

## 📁 Project Structure

```
Nexora/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Dashboard.js
│   │   │   ├── TaskManager.js
│   │   │   ├── Notes.js
│   │   │   ├── QuickLaunch.js
│   │   │   └── Settings.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── firebase.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering
- **date-fns** - Date formatting and manipulation
- **Axios** - HTTP client (for API calls)

### Optional Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB/Mongoose** - Database (if needed)
- **Firebase** - Authentication and cloud storage

## 🎯 Usage Tips

### Task Management
- Use priority levels to organize your workload
- Filter tasks to focus on what matters
- Check off tasks to track your daily progress

### Notes & Journal
- Use markdown for rich formatting
- Toggle preview to see how your notes look
- Search through notes to find information quickly

### Focus Timer
- Use 25-minute sessions for optimal productivity
- Take breaks between sessions
- Enable ambient sounds for better concentration

### Quick Launch
- Add your most-used websites for instant access
- Organize apps by color for visual grouping
- Use search when you have many apps

### Data Management
- Export your data regularly as backup
- Import data to restore or transfer to another device
- All data is stored locally for privacy

## 🔒 Privacy & Security

- ✅ All data stored locally in your browser
- ✅ No data sent to external servers (unless Firebase is configured)
- ✅ Complete privacy and control over your information
- ⚠️ Clearing browser data will delete all information
- 💡 Use the export feature to backup your data

## 🎨 Customization

### Changing Colors
Edit `frontend/tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: {
    // Modify these values
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
```

### Adding New Features
The modular component structure makes it easy to add new features:
1. Create a new component in `src/components/`
2. Add a route in `App.js`
3. Add a navigation item in `Navbar.js`

## 🐛 Troubleshooting

### App won't start
- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be v14+)
- Clear npm cache: `npm cache clean --force`

### Data not saving
- Check browser's local storage settings
- Make sure you're not in incognito/private mode
- Try a different browser

### Styling issues
- Make sure Tailwind CSS is properly configured
- Run `npm install` to ensure all dependencies are present
- Clear browser cache and reload

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Deploy!

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to [Netlify](https://netlify.com)
3. Configure redirects if needed

## 📝 Future Enhancements

- [ ] Google Calendar integration
- [ ] Google Drive sync for notes
- [ ] User authentication with Firebase
- [ ] Cloud backup and sync
- [ ] Mobile app version
- [ ] Browser extension
- [ ] Habit tracker
- [ ] Goal setting module
- [ ] Analytics dashboard
- [ ] Collaboration features

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Inspired by modern productivity tools like Notion and Apple's design language

---

**Built with ❤️ for productivity enthusiasts**

Enjoy your Personal Command Center! 🚀
