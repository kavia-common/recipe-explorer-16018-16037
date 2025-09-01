import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Navigation from './components/Navigation/Navigation';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import FilterModal from './components/FilterModal/FilterModal';
import AuthModal from './components/AuthModal/AuthModal';

// PUBLIC_INTERFACE
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filters, setFilters] = useState({
    time: 'All',
    rate: null,
    category: 'All',
    searchQuery: ''
  });

  // Load favorites and user data from localStorage on app start
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipe_favorites');
    const savedUser = localStorage.getItem('recipe_user');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // PUBLIC_INTERFACE
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // PUBLIC_INTERFACE
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowAuth(false);
    localStorage.setItem('recipe_user', JSON.stringify(user));
  };

  // PUBLIC_INTERFACE
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('recipe_user');
  };

  // PUBLIC_INTERFACE
  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === recipe.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  // PUBLIC_INTERFACE
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilter(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Navigation 
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLoginClick={() => setShowAuth(true)}
          onLogout={handleLogout}
          onFilterClick={() => setShowFilter(true)}
          onSearch={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <RecipeList 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  filters={filters}
                  isAuthenticated={isAuthenticated}
                />
              } 
            />
            <Route 
              path="/recipe/:id" 
              element={
                <RecipeDetail 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  isAuthenticated={isAuthenticated}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {showFilter && (
          <FilterModal
            currentFilters={filters}
            onApplyFilters={applyFilters}
            onClose={() => setShowFilter(false)}
          />
        )}

        {showAuth && (
          <AuthModal
            onLogin={handleLogin}
            onClose={() => setShowAuth(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
