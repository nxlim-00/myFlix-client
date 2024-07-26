# myFlix-client

## Project Overview

myFlix is a frontend application for the movie database movie_api I built a few weeks ago. It allows users to browse movies, view detailed information about each movie, manage their profile, and maintain a list of their favorite movies. The application is built using React and React Bootstrap, with React Router for client-side routing.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Movie Browsing**: Browse through a collection of movies fetched from the backend API.
- **Movie Details**: View detailed information about a specific movie.
- **User Profile**: View and update user profile information.
- **Favorite Movies**: Add or remove movies from a list of favorites.
- **Search Functionality**: Search for movies by title using a search bar in the navigation.

## Dependencies

- React
- React Router
- React Bootstrap
- Bootstrap
- Fetch API for HTTP requests

## File Structure

```plaintext
src/
│
├── components/
│   ├── movie-card/
│   │   └── movie-card.jsx
│   ├── movie-view/
│   │   └── movie-view.jsx
│   ├── login-view/
│   │   └── login-view.jsx
│   ├── signup-view/
│   │   └── signup-view.jsx
│   ├── navigation-bar/
│   │   └── navigation-bar.jsx
│   ├── profile-view/
│   │   ├── profile-view.jsx
|   |   ├── profile-view.scss
|   |   ├── user-info.jsx
│   │   └── favorite-mov-page.jsx
│   └── main-view/
│       ├── main-view.jsx
│       └── main-view.scss
│
├── index.jsx
├── index.html
└── index.scss
```


## Components

### MainView

The main entry point of the application, responsible for routing and managing the application's state.

### NavigationBar

The `NavigationBar` component provides the top navigation bar with links to different routes and a search bar.

### MovieCard

The `MovieCard` component displays individual movie information and allows users to add or remove movies from their favorites.


## Usage

- **Signup**: Navigate to the signup page to create a new account.
- **Login**: Navigate to the login page to access your account.
- **Browse Movies**: View the list of available movies.
- **View Movie Details**: Click on a movie card to see detailed information.
- **Manage Favorites**: Add or remove movies from your favorites list.
- **Update Profile**: Update your user profile information from the profile page.
- **Search**: Use the search bar to filter movies by title.


## Deployment

1. Build the application for production:

   ```sh
   npm run build
   ```

2. Deploy the `build` directory to your preferred web server or hosting service.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Hosting

This project is hosted on Netlify: https://myflixx-movie-app.netlify.app

## License

This project is licensed under the MIT License.
