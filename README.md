# Spotify web player

## Description

The goal of this project was to build a web music player with React that uses the Spotify Web API. You can search the spotify library for tracks, play them and add them to your favorites.

NOTE: To use the playback feature a [spotify premium](https://developer.spotify.com/documentation/web-playback-sdk/) subscription is required.

<p align="center"><img src="./assets/webplayernew.gif" ></p>

## Usage

To run this project you must first setup a backend that will take care of login redirect to your Spotify account and fetch the necessary access tokens.

1. Git clone the project and from the root folder (containing the package.json) run `npm install`.
2. Go to the `/server` folder and run `npm install` here as well.
3. You will need to login to [Spotify for Developers](https://developer.spotify.com/dashboard/login) and select `create an app`. In the new app overview you will find a `Client ID` and `Client secret`.
4. Create a `.env` file and add
5. After installation run `npm run start` to run the server.
6. After install run `npm run start` to run the react dev server. This will load the project in your browser from `localhost:3000`.

## Structure

The project uses the following folder structure:

```
.
├── server
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── src
│   ├── components
│   │   ├── ConnectedDevices.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── Login.jsx
│   │   ├── MusicSearch.jsx
│   │   ├── NavigationWrapper.jsx
│   │   ├── ResourceRow.jsx
│   │   ├── ResourceTable.jsx
│   │   ├── SideBarNavigation.jsx
│   │   ├── TrackListItem.jsx
│   │   ├── WallPaper.jsx
│   │   └── WebPlayback.jsx
│   ├── context
│   │   ├── authContext.js
│   │   └── dashboardContext.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── LikedSongs.jsx
│   │   ├── Main.jsx
│   │   ├── Search.jsx
│   │   └── YourLibrary.jsx
│   ├── utils
│   │   └── utils.js
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.js
│   ├── constants.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupProxy.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

```

## APIs and libraries

The API I used are :

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)

The libraries / frameworks I used:

- [Reactjs](https://reactjs.org/)
- [Material UI](https://material-ui.com/)

## License

&copy; DanijelCvit 2021
