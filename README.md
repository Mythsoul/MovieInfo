# React Movies App

A modern React application for browsing and searching movies, built with React, Vite, TailwindCSS, and Appwrite.

## Features

- 🎬 Browse popular movies
- 🔍 Search movies with debounce functionality
- 💜 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- 🔐 Backend integration with Appwrite

## Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** TailwindCSS + ShadcnUI Components
- **Backend/BaaS:** Appwrite
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Bun package manager
- Appwrite instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mythsoul/MovieInfo.git
   cd MovieInfo
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

## Project Structure

```
src/
  ├── components/     # UI components
  │   └── ui/        # Reusable UI components
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions
  ├── App.jsx        # Main application component
  └── appwrite.js    # Appwrite configuration
```

## Features in Detail

- **Movie Search:** Implements debounce functionality for efficient API calls
- **UI Components:** Uses ShadcnUI components for a modern look
- **Appwrite Integration:** Tracks search history and trending searches
- **Responsive Design:** Works seamlessly on desktop and mobile devices



## Appwrite setup 
   - Create a project on Appwrite 
   - Create a database 
   - Create a collection 
   - Create attributes : searchTerm string , count number, movie_id string, poster_url string

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
