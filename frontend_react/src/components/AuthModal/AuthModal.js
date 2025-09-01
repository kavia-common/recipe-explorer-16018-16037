import React, { useState } from 'react';
import './AuthModal.css';

// PUBLIC_INTERFACE
const AuthModal = ({ onLogin, onClose }) => {
  /**
   * Authentication modal component for user login/signup
   * @param {Function} onLogin - Callback when user successfully logs in
   * @param {Function} onClose - Callback to close modal
   */

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // PUBLIC_INTERFACE
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Math.floor(Math.random() * 1000),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        avatar: null
      };
      
      onLogin(user);
      setLoading(false);
    }, 1500);
  };

  // PUBLIC_INTERFACE
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // PUBLIC_INTERFACE
  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      avatar: null
    };
    onLogin(guestUser);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal modal-content">
        <div className="auth-header">
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back!' : 'Join Recipe Explorer'}
          </h2>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Close authentication modal"
          >
            ✕
          </button>
        </div>

        <div className="auth-content">
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to save your favorite recipes' 
              : 'Create an account to start saving recipes'
            }
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button 
            className="btn btn-secondary guest-btn"
            onClick={handleGuestLogin}
          >
            <span className="guest-icon">👤</span>
            Continue as Guest
          </button>

          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="switch-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
