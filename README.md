# 🐱 Cat Catalog

A modern web application showcasing cat breeds from around the world with detailed information and beautiful images.

**[🔗 View Live Demo](https://cat-catalog-it22219916-harshamal-vishwajiths-projects.vercel.app/)**

![Cat Catalog View](public/catCatalogView.png)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Acknowledgements](#-acknowledgements)

## 🌟 Overview

Cat Catalog is a Next.js application that provides an interactive interface for browsing and exploring various cat breeds. Users can view detailed information about each breed, including origin, life span, and description, along with beautiful images.

## ✨ Features

- **Comprehensive Breed List**: Browse through a catalog of cat breeds from around the world
- **Detailed Breed Pages**: View detailed information about each cat breed
- **Search Functionality**: Quickly find breeds by name
- **Advanced Filtering**: Filter breeds by origin and other parameters
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes based on preference
- **Auto-Sliding Image Gallery**: View multiple images of each cat breed in a carousel
- **Loading Skeletons**: Enhanced user experience during content loading
- **Client-Side Filtering**: Filter cat breeds by origin on the client side

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Jest** - Testing framework
- **Axios** - HTTP client for API requests
- **next-themes** - Theme management for Next.js
- **React Icons** - Icon library
- **The Cat API** - External API for cat breed data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- API key from [TheCatAPI](https://thecatapi.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/harshamalvishwajith/Cat-catalog.git
cd Cat-catalog
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Create a `.env.local` file in the root directory with your API key:

```
NEXT_PUBLIC_CAT_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

5. Open http://localhost:3000 in your browser.

## 📂 Project Structure

```
cat-catalog/
├── app/                      # Next.js App Router
│   ├── breedDetail/          # Breed detail page
│   │   └── [id]/             # Dynamic route for breed details
│   ├── components/           # Reusable components
│   │   ├── ImageSlider.tsx   # Image carousel component
│   │   ├── PawPrints.tsx     # Simple background animation
│   │   └── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── services/             # API services
│   │   ├── catApiService.ts  # Cat API integration
│   │   └── __tests__/        # Unit tests for services
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Home page component
│   └── providers.tsx         # Theme provider
├── public/                   # Static assets
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup file
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔌 API Integration

The application integrates with [The Cat API](https://thecatapi.com/) to fetch breed data. The API service is implemented in `catApiService.ts` and provides the following functions:

- `getCatBreeds`: Fetches a list of cat breeds with optional filtering
- `getCatBreedById`: Fetches details for a specific breed
- `getCatImageByBreedId`: Fetches images for a specific breed

Example usage:

```typescript
// Fetch all breeds
const breeds = await getCatBreeds();

// Fetch a specific breed
const breed = await getCatBreedById("abys");

// Fetch images for a breed
const images = await getCatImageByBreedId("abys", 5);
```

## 🧪 Testing

The project uses Jest for unit testing. Tests are located in the `__tests__` directories.

Run tests:

```bash
pnpm test
# or
npm test
```

Run tests in watch mode:

```bash
pnpm test:watch
# or
npm run test:watch
```

## 🌐 Deployment

The application can be deployed to Vercel or any other platform that supports Next.js.

Deploy to Vercel:

```bash
vercel
```

## 🔮 Future Improvements

- Add breed comparison feature
- Implement user accounts for saving favorite breeds
- Add breed characteristics visualization
- Implement server-side pagination for better performance
- Add more advanced filtering options
- Support for multiple languages
- Add accessibility improvements

## 🙏 Acknowledgements

- [The Cat API](https://thecatapi.com/) for providing the cat breed data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting

Built by [Harshamal Gunathilaka](https://harshamal.me)
