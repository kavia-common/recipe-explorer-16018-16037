import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

// Mock detailed recipe data
const MOCK_RECIPE_DETAILS = {
  1: {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish featuring eggs, cheese, pancetta, and black pepper. This authentic recipe creates a creamy sauce without using cream, relying instead on the emulsification of eggs and cheese.",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=400&fit=crop",
    ingredients: [
      { name: "spaghetti", amount: "400g", note: "preferably bronze-cut" },
      { name: "eggs", amount: "4 large", note: "room temperature" },
      { name: "pancetta", amount: "150g", note: "diced" },
      { name: "parmesan cheese", amount: "100g", note: "freshly grated" },
      { name: "black pepper", amount: "1 tsp", note: "freshly ground" },
      { name: "salt", amount: "to taste", note: "for pasta water" }
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
      "While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together eggs, grated parmesan, and freshly ground black pepper.",
      "Reserve 1 cup of pasta cooking water before draining the spaghetti.",
      "Add the hot, drained pasta to the skillet with pancetta. Remove from heat.",
      "Quickly pour the egg mixture over the pasta, tossing constantly to create a creamy sauce. Add pasta water as needed.",
      "Serve immediately with additional parmesan and black pepper."
    ],
    cookTime: "20 min",
    prepTime: "10 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    category: "Italian",
    nutrition: {
      calories: 520,
      protein: 24,
      carbs: 45,
      fat: 28
    },
    tags: ["pasta", "traditional", "quick", "comfort food"]
  },
  2: {
    id: 2,
    title: "Chicken Tikka Masala",
    description: "Tender marinated chicken in a rich, creamy tomato-based sauce with aromatic spices. This popular Indian dish is perfect served over basmati rice.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    ingredients: [
      { name: "chicken breast", amount: "500g", note: "cut into chunks" },
      { name: "plain yogurt", amount: "200ml", note: "for marinade" },
      { name: "garam masala", amount: "2 tsp", note: "divided" },
      { name: "tomato sauce", amount: "400ml", note: "canned" },
      { name: "heavy cream", amount: "150ml", note: "" },
      { name: "onion", amount: "1 large", note: "finely chopped" },
      { name: "garlic", amount: "4 cloves", note: "minced" },
      { name: "ginger", amount: "1 inch", note: "grated" },
      { name: "cumin", amount: "1 tsp", note: "" },
      { name: "paprika", amount: "1 tsp", note: "" }
    ],
    instructions: [
      "Marinate chicken in yogurt, 1 tsp garam masala, salt, and pepper for at least 30 minutes.",
      "Heat oil in a large pan over medium-high heat. Cook marinated chicken until golden, about 6-8 minutes. Set aside.",
      "In the same pan, sauté onions until softened, about 5 minutes.",
      "Add garlic, ginger, remaining garam masala, cumin, and paprika. Cook for 1 minute until fragrant.",
      "Pour in tomato sauce and simmer for 10 minutes until thickened.",
      "Stir in cream and return chicken to the pan. Simmer for 5 minutes.",
      "Adjust seasoning and serve hot with basmati rice and naan bread."
    ],
    cookTime: "45 min",
    prepTime: "40 min",
    servings: 4,
    difficulty: "Hard",
    rating: 4.6,
    category: "Indian",
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 12,
      fat: 22
    },
    tags: ["spicy", "creamy", "marinated", "aromatic"]
  }
};

// PUBLIC_INTERFACE
const RecipeDetail = ({ favorites, onToggleFavorite, isAuthenticated }) => {
  /**
   * Recipe detail page component showing full recipe information
   * @param {Array} favorites - Array of favorite recipes
   * @param {Function} onToggleFavorite - Callback to toggle favorite status
   * @param {boolean} isAuthenticated - Whether user is authenticated
   */

  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const recipeData = MOCK_RECIPE_DETAILS[parseInt(id)];
      if (recipeData) {
        setRecipe(recipeData);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  // PUBLIC_INTERFACE
  const isFavorite = () => {
    return recipe && favorites.some(fav => fav.id === recipe.id);
  };

  // PUBLIC_INTERFACE
  const handleFavoriteClick = () => {
    if (isAuthenticated && recipe) {
      onToggleFavorite(recipe);
    }
  };

  // PUBLIC_INTERFACE
  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="recipe-detail-container">
        <div className="loading">Loading recipe details...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <div className="error-state">
          <h2>Recipe not found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      <div className="container">
        {/* Header */}
        <div className="detail-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            ← Back to Recipes
          </button>
          {isAuthenticated && (
            <button 
              className={`favorite-btn-detail ${isFavorite() ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite() ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite() ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          )}
        </div>

        {/* Hero section */}
        <div className="recipe-hero">
          <div className="hero-image-container">
            <img src={recipe.image} alt={recipe.title} className="hero-image" />
            <div className="hero-overlay">
              <div className="recipe-meta-overlay">
                <span className="cook-time-overlay">{recipe.cookTime}</span>
                <span className="difficulty-overlay">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
          
          <div className="hero-content">
            <div className="recipe-title-section">
              <h1 className="recipe-title">{recipe.title}</h1>
              <div className="recipe-rating">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{recipe.rating}</span>
                <span className="rating-text">({Math.floor(recipe.rating * 100)} reviews)</span>
              </div>
            </div>
            
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-quick-info">
              <div className="info-item">
                <span className="info-label">Prep Time</span>
                <span className="info-value">{recipe.prepTime}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Cook Time</span>
                <span className="info-value">{recipe.cookTime}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Servings</span>
                <span className="info-value">{recipe.servings}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Difficulty</span>
                <span className="info-value">{recipe.difficulty}</span>
              </div>
            </div>

            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="recipe-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'ingredients' && (
              <div className="ingredients-section">
                <h3>Ingredients</h3>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-amount">{ingredient.amount}</span>
                      <span className="ingredient-name">{ingredient.name}</span>
                      {ingredient.note && (
                        <span className="ingredient-note">({ingredient.note})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="instructions-section">
                <h3>Instructions</h3>
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="instruction-item">
                      <span className="instruction-number">{index + 1}</span>
                      <p className="instruction-text">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="nutrition-section">
                <h3>Nutrition Information</h3>
                <p className="nutrition-disclaimer">Per serving (approximate values)</p>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories</span>
                    <span className="nutrition-value">{recipe.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Protein</span>
                    <span className="nutrition-value">{recipe.nutrition.protein}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbohydrates</span>
                    <span className="nutrition-value">{recipe.nutrition.carbs}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fat</span>
                    <span className="nutrition-value">{recipe.nutrition.fat}g</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
