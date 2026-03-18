# PokéManager Client 🎮

Frontend application for managing your personal Pokémon collection with battle simulations, XP tracking, and custom Pokémon creation using the PokeAPI.

## ✨ Features

- **Create Custom Pokémon** - Design and add your own Pokémon to your collection
- **Battle System** - Fight your Pokémon against random Pokémon from the official PokeAPI
- **XP & Leveling** - Gain experience and level up your Pokémon through battles
- **Collection Management** - View, edit, and manage your entire Pokémon collection
- **Battle History** - Track all your battles with detailed logs
- **Statistics Dashboard** - Visualize your collection stats and strongest Pokémon
- **LocalStorage Persistence** - Your collection is saved in your browser
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type-safe code for better developer experience
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Next-generation frontend tooling for fast builds and HMR
- **Axios** - Promise-based HTTP client for API requests
- **React Router v6** - Declarative routing for single-page applications
- **LocalStorage API** - Client-side storage for persistence

## 📁 Project Structure

```
pokemanager-client/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, fonts, etc.
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Buttons, loading, errors
│   │   ├── pokemon/             # Pokemon-related components
│   │   └── battle/              # Battle-related components
│   ├── pages/                    # Main application pages
│   │   ├── HomePage.tsx
│   │   ├── CollectionPage.tsx
│   │   ├── BattlePage.tsx
│   │   └── CreatePokemonPage.tsx
│   ├── services/                 # API and external services
│   │   ├── api.ts                # Axios configuration
│   │   ├── pokemonService.ts     # Pokemon CRUD operations
│   │   ├── battleService.ts      # Battle endpoints
│   │   └── pokeApiService.ts     # PokeAPI integration
│   ├── hooks/                     # Custom React hooks
│   │   ├── usePokemon.ts
│   │   ├── useBattle.ts
│   │   └── useLocalStorage.ts
│   ├── types/                      # TypeScript interfaces
│   │   ├── pokemon.types.ts
│   │   ├── battle.types.ts
│   │   └── api.types.ts
│   ├── utils/                       # Helper functions
│   │   ├── battleCalculator.ts
│   │   └── formatters.ts
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                       # Entry point
│   └── index.css                       # Global styles + Tailwind
├── .env                                # Environment variables
├── .env.production                      # Production environment
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js                    # Tailwind configuration
├── tsconfig.json                          # TypeScript configuration
├── tsconfig.node.json
└── vite.config.ts                         # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavFilsDev/pokemanager-client.git
   cd pokemanager-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_POKEAPI_URL=https://pokeapi.co/api/v2
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔌 API Integration

### Backend Endpoints (Your Express Server)

The frontend expects your backend to provide:

```
GET    /api/pokemon              # Get all custom Pokémon
GET    /api/pokemon/:id          # Get specific Pokémon
POST   /api/pokemon              # Create new Pokémon
PUT    /api/pokemon/:id          # Update Pokémon
DELETE /api/pokemon/:id          # Delete Pokémon
POST   /api/battle/random/:id    # Battle against random Pokémon
GET    /api/battle/history        # Get battle history
```

### PokeAPI Integration

- Random opponents are fetched from [PokeAPI](https://pokeapi.co/)
- Used for battle simulations against official Pokémon

## 🎨 UI/UX Features

- **Responsive Grid Layout** - Pokémon cards adapt to screen size
- **Battle Animations** - Visual feedback during battles
- **XP Progress Bars** - Visual representation of level progress
- **Type Badges** - Color-coded Pokémon type indicators
- **Toast Notifications** - User feedback for actions
- **Loading States** - Skeletons and spinners for async operations


## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_POKEAPI_URL` | PokeAPI URL | `https://pokeapi.co/api/v2` |

## 🔮 Future Improvements

- [ ] Multiplayer battles (WebSocket)
- [ ] Pokémon trading between users
- [ ] Tournament mode
- [ ] Achievement badges
- [ ] Dark mode
- [ ] PWA support
- [ ] Unit tests with Jest/React Testing Library

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- [TailwindCSS](https://tailwindcss.com/) for the amazing CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [React](https://reactjs.org/) for the UI library

## 📧 Contact

Fanampinirina Miharisoa David Fils RATIANDRAIBE - miharisoadavidfils.com

Project Link: [https://github.com/DavFilsDev/pokemanager-client](https://github.com/DavFilsDev/pokemanager-client)