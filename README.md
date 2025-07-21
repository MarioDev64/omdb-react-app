# 🎬 OMDB React App

A modern React application for searching movies and series using the OMDB API. Built with TypeScript, React Router, and Tailwind CSS following Clean Architecture principles.

## ✨ Features

- 🔍 **Real-time search** for movies and series
- 🎯 **Advanced filters** by content type
- 📱 **Responsive design** with Tailwind CSS
- 🌙 **Dark mode** included
- ⚡ **Infinite pagination** for results
- 🎨 **Modern UI** with reusable components
- 🏗️ **Clean Architecture** for maintainable code
- 📊 **Complete details** for movies and series
- 🚀 **TypeScript** for enhanced type safety
- 🎭 **Smooth animations** with Framer Motion
- 🔄 **State management** with Zustand
- 🛡️ **API validation** with Zod schemas
- 🎪 **Heroicons** for beautiful icons

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## 🛠️ Technologies Used

- **React 19** - Latest React with Hooks and TypeScript
- **React Router v7** - Client-side routing and navigation
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Declarative animations
- **Zod** - Runtime schema validation
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons
- **Prettier** - Code formatting and consistency
- **Husky** - Git hooks for code quality
- **Commitizen** - Conventional commit messages

## 📸 Screenshots

### 🖥️ Desktop View

#### Light Mode

![Desktop Light Mode](https://github.com/MarioDev64/omdb-react-app/blob/main/public/desktop_light.png)

#### Dark Mode

![Desktop Dark Mode](https://github.com/MarioDev64/omdb-react-app/blob/main/public/desktop_dark.png)

### 📱 Mobile View

#### Light Mode

![Mobile Light Mode](https://github.com/MarioDev64/omdb-react-app/blob/main/public/mobile_light.png)

#### Dark Mode

![Mobile Dark Mode](https://github.com/MarioDev64/omdb-react-app/blob/main/public/mobile_dark.png)

## 🚀 Initial Setup

### 📋 Prerequisites

1. **Get your OMDB API Key:**
   - Go to [OMDB API](https://www.omdbapi.com/apikey.aspx)
   - Request a free API key
   - You'll receive the key via email

### ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository>
   cd omdb-react-app
   ```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure the API Key:**
   - Create a `.env` file in the project root
   - Add your API key:

   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser:**
   - The application will be available at `http://localhost:5173`

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Lint code (formatting + type checking)
npm run lint

# Commit with conventional commits
npm run commit
```

## 🏗️ Project Structure

```
app/
├── components/          # 🎨 Presentation Layer
│   ├── ui/             # Reusable UI components
│   ├── search/         # Search components
│   └── details/        # Detail components
├── shared/             # 🔧 Shared utilities
│   ├── schemas/        # Zod schemas for validation
│   ├── types/          # TypeScript type definitions
│   └── services/       # API services
├── api/                # 📡 Data Layer
│   └── core/           # HTTP client and API core
├── hooks/              # 🎣 Domain Layer
│   ├── useSearch.ts
│   └── useMovieDetails.ts
├── stores/             # 🗄️ State management
│   ├── useSearchStore.ts
│   └── useMovieDetailsStore.ts
├── contexts/           # 🌐 React contexts
│   └── ThemeContext.tsx
└── routes/             # 🛣️ Application pages
```

## 📦 Production Build

Create a production build:

```bash
npm run build
```

## 🚀 Deployment

### 🐳 Docker Deployment

To build and run using Docker:

```bash
docker build -t omdb-react-app .

# Run the container
docker run -p 3000:3000 omdb-react-app
```

The containerized application can be deployed on any platform that supports Docker:

- **AWS ECS**
- **Google Cloud Run**
- **Azure Container Apps**
- **Digital Ocean App Platform**
- **Fly.io**
- **Railway**

### 🛠️ Manual Deployment

If you're familiar with Node.js application deployment, the integrated server is ready for production.

Make sure to deploy the result of `npm run build`:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server code
```

## 🎨 Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for modern and responsive design. Includes:

- **Responsive design** for all devices
- **Dark mode** with smooth transitions
- **Reusable components** with Tailwind
- **Smooth animations** and transitions
- **Modern UI patterns** and best practices

## 🔧 Implemented Features

### ✅ **Search and Filters**

- Real-time search with debouncing
- Filters by type (movies/series/both)
- Infinite pagination
- Error handling and loading states
- Skeleton loaders for better UX

### ✅ **Navigation**

- React Router for page navigation
- Dynamic routes for movie details
- Fixed header with back button
- Smooth page transitions

### ✅ **UI/UX Design**

- Responsive design with Tailwind CSS
- Dark mode with theme context
- Accessible components
- Loading states and error handling
- Modern animations with Framer Motion

### ✅ **Clean Architecture**

- Clear separation of concerns
- Custom hooks for business logic
- Separated API services
- Reusable components
- Zod validation for API responses

### ✅ **State Management**

- Zustand for global state
- React Context for theme management
- Optimized re-renders
- Persistent theme preferences

### ✅ **API Integration**

- Custom HTTP client with fetch
- Zod schema validation
- Error handling and retry logic
- CORS handling for OMDB API

---

Built with ❤️ using React Router and TypeScript.
