import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';

// Mock recipe data
const MOCK_RECIPES = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    description: "Creamy pasta dish with eggs, cheese, and pancetta",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
    ingredients: ["spaghetti", "eggs", "pancetta", "parmesan", "black pepper"],
    cookTime: "20 min",
    difficulty: "Medium",
    rating: 4.8,
    category: "Italian"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    description: "Tender chicken in a creamy tomato-based sauce",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    ingredients: ["chicken", "tomatoes", "cream", "garam masala", "onions"],
    cookTime: "45 min",
    difficulty: "Hard",
    rating: 4.6,
    category: "Indian"
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with homemade vinaigrette",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    ingredients: ["lettuce", "tomatoes", "cucumber", "carrots", "olive oil"],
    cookTime: "10 min",
    difficulty: "Easy",
    rating: 4.2,
    category: "Vegetables"
  },
  {
    id: 4,
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy homemade cookies",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    ingredients: ["flour", "chocolate chips", "butter", "sugar", "eggs"],
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.9,
    category: "Dessert"
  },
  {
    id: 5,
    title: "Beef Stir Fry",
    description: "Quick and healthy beef with vegetables",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    ingredients: ["beef", "broccoli", "bell peppers", "soy sauce", "garlic"],
    cookTime: "15 min",
    difficulty: "Medium",
    rating: 4.4,
    category: "Chinese"
  },
  {
    id: 6,
    title: "Pancakes",
    description: "Fluffy breakfast pancakes with syrup",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
    ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
    cookTime: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    category: "Breakfast"
  }
];

// PUBLIC_INTERFACE
const RecipeList = ({ favorites, onToggleFavorite, filters, isAuthenticated }) => {
  /**
   * Recipe list component that displays recipes in a grid layout with filtering
   * @param {Array} favorites - Array of favorite recipe IDs
   * @param {Function} onToggleFavorite - Callback to toggle recipe favorite status
   * @param {Object} filters - Current filter settings
   * @param {boolean} isAuthenticated - Whether user is authenticated
   */

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'favorites'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecipes(MOCK_RECIPES);
      setLoading(false);
    }, 1000);
  }, []);

  // PUBLIC_INTERFACE
  const getFilteredRecipes = () => {
    let filtered = [...recipes];

    // Filter by view mode
    if (viewMode === 'favorites') {
      filtered = filtered.filter(recipe => 
        favorites.some(fav => fav.id === recipe.id)
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        recipe.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(recipe => 
        recipe.category === filters.category
      );
    }

    // Filter by rating
    if (filters.rate) {
      filtered = filtered.filter(recipe => 
        recipe.rating >= parseInt(filters.rate)
      );
    }

    // Sort by time filter
    if (filters.time === 'Newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (filters.time === 'Oldest') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (filters.time === 'Popularity') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  // PUBLIC_INTERFACE
  const isFavorite = (recipe) => {
    return favorites.some(fav => fav.id === recipe.id);
  };

  if (loading) {
    return (
      <div className="recipe-list-container">
        <div className="loading">Loading delicious recipes...</div>
      </div>
    );
  }

  const filteredRecipes = getFilteredRecipes();

  return (
    <div className="recipe-list-container">
      <div className="container">
        {/* Header section */}
        <div className="list-header">
          <div className="header-content">
            <h1 className="page-title">
              {viewMode === 'favorites' ? 'Your Favorite Recipes' : 'Discover Amazing Recipes'}
            </h1>
            <p className="page-subtitle">
              {filteredRecipes.length} {viewMode === 'favorites' ? 'favorite' : ''} recipes found
            </p>
          </div>
          
          {/* View toggle */}
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              All Recipes
            </button>
            {isAuthenticated && (
              <button
                className={`view-btn ${viewMode === 'favorites' ? 'active' : ''}`}
                onClick={() => setViewMode('favorites')}
              >
                Favorites ({favorites.length})
              </button>
            )}
          </div>
        </div>

        {/* Active filters display */}
        {(filters.searchQuery || filters.category !== 'All' || filters.rate || filters.time !== 'All') && (
          <div className="active-filters">
            <span className="filters-label">Active filters:</span>
            {filters.searchQuery && (
              <span className="filter-tag">Search: "{filters.searchQuery}"</span>
            )}
            {filters.category !== 'All' && (
              <span className="filter-tag">Category: {filters.category}</span>
            )}
            {filters.rate && (
              <span className="filter-tag">Rating: {filters.rate}+ stars</span>
            )}
            {filters.time !== 'All' && (
              <span className="filter-tag">Sort: {filters.time}</span>
            )}
          </div>
        )}

        {/* Recipe grid */}
        {filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={isFavorite(recipe)}
                onToggleFavorite={onToggleFavorite}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No recipes found</h3>
            <p>Try adjusting your search criteria or browse all recipes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// PUBLIC_INTERFACE
const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, isAuthenticated }) => {
  /**
   * Individual recipe card component
   * @param {Object} recipe - Recipe data
   * @param {boolean} isFavorite - Whether recipe is favorited
   * @param {Function} onToggleFavorite - Callback to toggle favorite
   * @param {boolean} isAuthenticated - Whether user is authenticated
   */

  // PUBLIC_INTERFACE
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      onToggleFavorite(recipe);
    }
  };

  // PUBLIC_INTERFACE
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'var(--color-green-light)';
      case 'Medium': return 'var(--secondary-color)';
      case 'Hard': return 'var(--accent-color)';
      default: return 'var(--color-green-medium)';
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card card">
        <div className="card-image-container">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="card-image"
          />
          {isAuthenticated && (
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          <div className="card-overlay">
            <span className="cook-time">{recipe.cookTime}</span>
          </div>
        </div>
        
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{recipe.title}</h3>
            <div className="rating">
              <span className="rating-star">⭐</span>
              <span className="rating-value">{recipe.rating}</span>
            </div>
          </div>
          
          <p className="card-description">{recipe.description}</p>
          
          <div className="card-meta">
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
            >
              {recipe.difficulty}
            </span>
            <span className="category-badge">{recipe.category}</span>
          </div>
          
          <div className="ingredients-preview">
            <span className="ingredients-label">Key ingredients:</span>
            <div className="ingredients-list">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <span key={index} className="ingredient-chip">
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span className="more-ingredients">
                  +{recipe.ingredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeList;
