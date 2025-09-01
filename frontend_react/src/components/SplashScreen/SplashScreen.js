import React, { useEffect } from 'react';
import './SplashScreen.css';

// PUBLIC_INTERFACE
const SplashScreen = ({ onComplete }) => {
  /**
   * Splash screen component that displays the initial app introduction
   * @param {Function} onComplete - Callback when user clicks to continue
   */

  // PUBLIC_INTERFACE
  const handleStartCooking = () => {
    onComplete();
  };

  // Auto-dismiss splash after 3 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      {/* Status bar (decorative) */}
      <div className="status-bar" aria-hidden="true">
        <div className="time">19:27</div>
        <div className="status-icons">
          <div className="cellular"></div>
          <div className="wifi"></div>
          <div className="battery">
            <div className="battery-level"></div>
          </div>
        </div>
      </div>

      {/* Logo and tagline */}
      <section className="logo-cluster" aria-label="App Introduction">
        <div className="logo-box" aria-hidden="true">
          <div className="logo-placeholder">🍳</div>
        </div>
        <div className="logo-caption">100K+ Premium Recipe</div>
      </section>

      {/* Hero text */}
      <section className="hero-text" aria-label="Hero text">
        <h1 className="title">Get{'\n'}Cooking</h1>
        <p className="subtitle">Simple way to find Tasty Recipe</p>
      </section>

      {/* CTA Button */}
      <button 
        className="cta btn-primary" 
        onClick={handleStartCooking}
        aria-label="Start Cooking"
      >
        <span className="cta-label">Start Cooking</span>
        <span className="icon-arrow" aria-hidden="true">
          <i className="arrow-head"></i>
        </span>
      </button>

      {/* Home indicator */}
      <div className="home-indicator" aria-hidden="true">
        <div className="home-line"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
