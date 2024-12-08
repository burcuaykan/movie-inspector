# Movie Inspector Application

This project is a web application that retrieves and displays movies using the OMDB API. Users can search for movies by title, release year, or type, and view detailed information about each movie, including its poster, title, duration, director, cast, etc.

## Features

- **Search Movies**: Search for movies using their titles, release years, or types (e.g., movie, series, episode).
- **Movie List**: Displays search results in a paginated table format.
- **Movie Details**: Click on any movie in the list to view detailed information such as poster, title, duration, director, cast, etc.
- **Responsive Design**: Built with Material-UI components for a modern and responsive user interface.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/) (with TypeScript)
  - [Material-UI](https://mui.com/) (UI components)
  - [Sass](https://sass-lang.com/) (CSS preprocessor for styling)

- **API**:
  - [OMDB API](https://www.omdbapi.com/) for fetching movie data.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation and Running the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## API Integration

This application uses the [OMDB API](https://www.omdbapi.com/) to fetch movie data. Rigth now, the project is using my API key, but if you encounter any problem regarding the API key, you can always update it with your own key. After getting a valid API key from OMDB, update the `Movie.service.ts` file with your API key:

```typescript
const API_KEY = "your_api_key";
