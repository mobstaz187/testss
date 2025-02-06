import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { handleAuthRedirect } from './lib/supabase';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CharacterSelection from './components/CharacterSelection';
import Navigation from './components/Navigation';
import About from './components/About';

const AnimatedRoutes = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(!user);
  
  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/characters" element={<CharacterSelection />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    handleAuthRedirect();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;