import React, { useState } from 'react';
import './Navigation.css';

// PUBLIC_INTERFACE
const Navigation = ({ 
  isAuthenticated, 
  currentUser, 
  onLoginClick, 
  onLogout, 
  onFilterClick, 
  onSearch 
}) => {
  /**
   * Navigation bar component with search, filter, and authentication features
   * @param {boolean} isAuthenticated - Whether user is logged in
   * @param {Object} currentUser - Current user object
   * @param {Function} onLoginClick - Callback to open login modal
   * @param {Function} onLogout - Callback to logout user
   * @param {Function} onFilterClick - Callback to open filter modal
   * @param {Function} onSearch - Callback when search query changes
   */

  const [searchQuery, setSearchQuery] = useState('');

  // PUBLIC_INTERFACE
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // PUBLIC_INTERFACE
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <div className="brand-icon">🍳</div>
          <span className="brand-text">Recipe Explorer</span>
        </div>

        {/* Search bar */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes by ingredients..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>

        {/* Navigation actions */}
        <div className="nav-actions">
          {/* Filter button */}
          <button 
            className="nav-btn filter-btn"
            onClick={onFilterClick}
            aria-label="Open filter"
          >
            <span className="filter-icon">⚙️</span>
            <span className="nav-btn-text">Filter</span>
          </button>

          {/* Authentication section */}
          {isAuthenticated ? (
            <div className="user-section">
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{currentUser?.name || 'User'}</span>
              </div>
              <button 
                className="nav-btn logout-btn"
                onClick={onLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="nav-btn login-btn"
              onClick={onLoginClick}
              aria-label="Login"
            >
              <span className="login-icon">🔐</span>
              <span className="nav-btn-text">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
