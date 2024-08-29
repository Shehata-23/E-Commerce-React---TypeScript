<<<<<<< HEAD
<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# React.js-E-Commerce
>>>>>>> origin/main
=======
# E-Commerce Frontend Project

## Overview

This project is a feature-rich e-commerce frontend application built with React, TypeScript, and Redux Toolkit. It offers a responsive user interface with a focus on user experience and functionality.

## Spotlight Feature

On the user's birthday, a special celebration card appears with a virtual cake and candle. The unique twist? Users can blow out the candle using their device's microphone! This interactive feature adds a personal touch to the user experience.

## Tech Stack

- React
- TypeScript
- Redux Toolkit for state management
- React Router for routing
- Tailwind CSS for styling

## Features

- User Authentication and Verification
- Protected Routing
- Multiple Payment Methods
- Shopping Cart Functionality
- Wishlist Management
- Order History Tracking
- Detailed Product Pages
- Responsive Design
- Generic, Reusable Components

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory
   ```
   cd your-repo-name
   ```
3. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Start the development server
   ```
   npm run dev
   ```
   or
   ```
   npm run dev
   ```

## Key Components

- Authentication System
- Product Catalog
- Shopping Cart
- Wishlist
- Checkout Process
- User Profile & Order History
- Birthday Celebration Feature

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Ahmed Shehata - a.shehata.cs@gmail.com
>>>>>>> 3082541591a2ece988be769204a77e08132347f2
