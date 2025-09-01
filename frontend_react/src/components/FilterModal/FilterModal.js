import React, { useState, useEffect } from 'react';
import './FilterModal.css';

// PUBLIC_INTERFACE
const FilterModal = ({ currentFilters, onApplyFilters, onClose }) => {
  /**
   * Filter modal component based on the Figma filter design
   * @param {Object} currentFilters - Current filter settings
   * @param {Function} onApplyFilters - Callback to apply selected filters
   * @param {Function} onClose - Callback to close modal
   */

  const [filters, setFilters] = useState({
    time: 'All',
    rate: null,
    category: 'All',
    ...currentFilters
  });

  useEffect(() => {
    setFilters({
      time: 'All',
      rate: null,
      category: 'All',
      ...currentFilters
    });
  }, [currentFilters]);

  // PUBLIC_INTERFACE
  const handleChipSelect = (group, value) => {
    setFilters(prev => ({
      ...prev,
      [group]: value
    }));
  };

  // PUBLIC_INTERFACE
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setFilters({
      time: 'All',
      rate: null,
      category: 'All',
      searchQuery: ''
    });
  };

  // PUBLIC_INTERFACE
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const timeOptions = ['All', 'Newest', 'Oldest', 'Popularity'];
  const rateOptions = [5, 4, 3, 2, 1];
  const categoryOptions = [
    'All', 'Cereal', 'Vegetables', 'Local Dish', 'Fruit', 
    'Breakfast', 'Chinese', 'Spanish', 'Dinner', 'Italian', 'Indian', 'Dessert'
  ];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="filter-modal modal-content">
        <div className="filter-header">
          <h2 className="filter-title">Filter Search</h2>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Close filter"
          >
            ✕
          </button>
        </div>

        <div className="filter-content">
          {/* Time section */}
          <section className="filter-section">
            <h3 className="section-label">Time</h3>
            <div className="chips-container">
              {timeOptions.map(option => (
                <button
                  key={option}
                  className={`chip ${filters.time === option ? 'chip-solid' : 'chip-outline'}`}
                  onClick={() => handleChipSelect('time', option)}
                  aria-pressed={filters.time === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          {/* Rating section */}
          <section className="filter-section">
            <h3 className="section-label">Minimum Rating</h3>
            <div className="chips-container">
              {rateOptions.map(rating => (
                <button
                  key={rating}
                  className={`chip rating-chip ${filters.rate === rating ? 'chip-solid' : 'chip-outline'}`}
                  onClick={() => handleChipSelect('rate', filters.rate === rating ? null : rating)}
                  aria-pressed={filters.rate === rating}
                >
                  <span className="rate-text">{rating}</span>
                  <span className="star" aria-hidden="true">⭐</span>
                </button>
              ))}
            </div>
          </section>

          {/* Category section */}
          <section className="filter-section">
            <h3 className="section-label">Category</h3>
            <div className="chips-container">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  className={`chip ${filters.category === category ? 'chip-solid' : 'chip-outline'}`}
                  onClick={() => handleChipSelect('category', category)}
                  aria-pressed={filters.category === category}
                >
                  {category === 'Dinner' && <span className="chip-icon">🍽️</span>}
                  {category}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="filter-actions">
          <button 
            className="btn btn-secondary reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            className="btn btn-primary apply-btn"
            onClick={handleApplyFilters}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
