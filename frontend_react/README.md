# Recipe Explorer - React Frontend

A modern, responsive web application for browsing, searching, and saving recipes. Built with React and featuring a clean, mobile-first design inspired by modern UI/UX principles.

## 🚀 Features

- **Browse Recipes**: Explore a collection of delicious recipes with beautiful imagery
- **Smart Search**: Search recipes by ingredients, title, or category
- **Advanced Filtering**: Filter by cooking time, difficulty, rating, and category
- **Favorites System**: Save your favorite recipes (with localStorage persistence)
- **User Authentication**: Mock authentication system with guest mode
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean interface with smooth animations and transitions
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🎨 Design System

The app follows a modern design system with:
- **Colors**: Green primary (#129575), Orange secondary (#ff9800), Pink accent (#e91e63)
- **Typography**: Poppins font family with consistent sizing scale
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **CSS3** - Custom CSS with CSS variables and Grid/Flexbox
- **localStorage** - Client-side data persistence
- **Google Fonts** - Poppins typography

## 📁 Project Structure

```
src/
├── components/
│   ├── SplashScreen/          # App introduction screen
│   ├── Navigation/            # Top navigation with search
│   ├── RecipeList/           # Recipe grid and filtering
│   ├── RecipeDetail/         # Individual recipe view
│   ├── FilterModal/          # Advanced filtering modal
│   └── AuthModal/            # Authentication modal
├── App.js                    # Main app component with routing
├── App.css                   # Global styles and design tokens
├── index.js                  # React app entry point
└── index.css                 # Global CSS reset and base styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-explorer-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App (not recommended)

## 🎯 Usage

### Navigation
- Use the search bar to find recipes by ingredients or name
- Click the filter button to access advanced filtering options
- Login or continue as guest to save favorites

### Recipe Discovery
- Browse recipes in the main grid view
- Click on any recipe card to view detailed information
- Use the heart icon to save recipes to favorites (requires login)

### Filtering
- **Time**: Sort by newest, oldest, or popularity
- **Rating**: Filter by minimum star rating
- **Category**: Filter by cuisine type or meal category

### Favorites
- Login to save recipes to your favorites
- Toggle between "All Recipes" and "Favorites" view
- Favorites are persisted in localStorage

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_NAME="Recipe Explorer"
REACT_APP_VERSION=1.0.0
```

### Design Tokens

The app uses CSS custom properties for consistent theming:

```css
:root {
  --primary-color: #4caf50;
  --secondary-color: #ff9800;
  --accent-color: #e91e63;
  --font-family: "Poppins", Arial, Helvetica, sans-serif;
  /* ... more tokens */
}
```

## 📱 Responsive Design

The app is built with a mobile-first approach:

- **Mobile**: < 480px - Single column layout, condensed navigation
- **Tablet**: 481px - 768px - Two column grid, expanded touch targets
- **Desktop**: > 768px - Multi-column grid, full feature set

## ♿ Accessibility

- Semantic HTML markup
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Reduced motion support

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real recipe API
- **User Profiles**: Extended user management
- **Recipe Creation**: Allow users to add their own recipes
- **Social Features**: Recipe sharing and comments
- **Advanced Search**: Natural language recipe search
- **Offline Support**: PWA with offline functionality
- **Dark Mode**: Theme switching capability

## 🐛 Known Issues

- Recipe data is currently mocked (not connected to real API)
- User authentication is simulated (no real backend)
- Images are from Unsplash (may load slowly on poor connections)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern recipe apps
- Unsplash for recipe photography
- Google Fonts for typography
- React team for the excellent framework

## 📞 Support

For support, email support@recipeexplorer.com or create an issue in the repository.

---

**Built with ❤️ using React and modern web technologies**
