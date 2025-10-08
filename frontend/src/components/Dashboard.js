import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Cloud, 
  Sparkles, 
  Timer,
  Volume2,
  VolumeX
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState(null);
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch motivational quote
  useEffect(() => {
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
      { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
      { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Fetch weather (using a free API - OpenWeatherMap)
  useEffect(() => {
    // For demo purposes, using mock data
    // Replace with actual API call: https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YOUR_API_KEY
    setWeather({
      temp: 24,
      condition: 'Partly Cloudy',
      location: 'Your City'
    });
  }, []);

  // Focus timer countdown
  useEffect(() => {
    let interval;
    if (isTimerRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsTimerRunning(false);
      // Play notification sound or show alert
      alert('Focus session complete! Great job! 🎉');
      setFocusTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {format(currentTime, 'EEEE, MMMM do, yyyy')}
        </p>
      </motion.div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Time Card */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-primary-500" size={24} />
            <h2 className="text-xl font-semibold">Current Time</h2>
          </div>
          <div className="text-5xl font-bold text-primary-500">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          <div className="text-gray-500 dark:text-gray-400 mt-2">
            {format(currentTime, 'a')}
          </div>
        </motion.div>

        {/* Date Card */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="text-primary-500" size={24} />
            <h2 className="text-xl font-semibold">Today</h2>
          </div>
          <div className="text-3xl font-bold">
            {format(currentTime, 'MMMM dd')}
          </div>
          <div className="text-gray-500 dark:text-gray-400 mt-2">
            {format(currentTime, 'EEEE, yyyy')}
          </div>
        </motion.div>

        {/* Weather Card */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Cloud className="text-primary-500" size={24} />
            <h2 className="text-xl font-semibold">Weather</h2>
          </div>
          {weather && (
            <>
              <div className="text-5xl font-bold">{weather.temp}°C</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2">
                {weather.condition}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {weather.location}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div variants={itemVariants} className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-800">
        <div className="flex items-start space-x-3">
          <Sparkles className="text-primary-500 flex-shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-xl font-semibold mb-3">Daily Inspiration</h2>
            {quote && (
              <>
                <p className="text-lg italic mb-2">"{quote.text}"</p>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  — {quote.author}
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Focus & Productivity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Focus Timer */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Timer className="text-primary-500" size={24} />
            <h2 className="text-xl font-semibold">Focus Timer</h2>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-primary-500 mb-6">
              {formatTime(focusTime)}
            </div>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="btn-primary"
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setFocusTime(25 * 60);
                }}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
            <div className="mt-4 flex space-x-2 justify-center">
              <button
                onClick={() => setFocusTime(15 * 60)}
                className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                15m
              </button>
              <button
                onClick={() => setFocusTime(25 * 60)}
                className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                25m
              </button>
              <button
                onClick={() => setFocusTime(45 * 60)}
                className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                45m
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ambient Sounds */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center space-x-3 mb-4">
            {ambientSound ? <Volume2 className="text-primary-500" size={24} /> : <VolumeX className="text-gray-400" size={24} />}
            <h2 className="text-xl font-semibold">Ambient Sounds</h2>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setAmbientSound(!ambientSound)}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                ambientSound
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {ambientSound ? 'Stop' : 'Play'} Rain Sounds
            </button>
            <button className="w-full py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
              Ocean Waves
            </button>
            <button className="w-full py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
              Forest Ambience
            </button>
            <button className="w-full py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
              White Noise
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
