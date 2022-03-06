import { createContext, useContext } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";
import { AuthContext } from "./authContext.js";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [is_paused, setPaused] = useState(false);
  const [player, setPlayer] = useState(undefined);

  const [current_track, setCurrentTrack] = useState({
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
    duration_ms: 0,
  });

  const token = useContext(AuthContext);
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  });
  const [searchPage, setSearchPage] = useState(0);

  const handleSearch = (event) => {
    const query = event.target.value.trim();
    setSearch(query);
    setSearchPage(0);
    localStorage.setItem("search", query);
  };

  const selectTrack = async (track) => {
    try {
      const res = await fetch(`${BASE_API_URL}/me/player/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [track.uri],
          offset: {
            position: 0,
          },
          position_ms: 0,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async (method, row) => {
    try {
      const res = await fetch(`${BASE_API_URL}/me/tracks`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ids: [row.uri.split(":")[2]],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        selectTrack,
        search,
        searchPage,
        setSearchPage,
        handleSearch,
        is_paused,
        current_track,
        setPaused,
        setCurrentTrack,
        player,
        setPlayer,
        handleFavorite,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
