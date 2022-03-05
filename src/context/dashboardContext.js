import { createContext, useContext } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";
import useFetch from "../hooks/useFetch.js";
import { AuthContext } from "./authContext.js";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const token = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [searchPage, setSearchPage] = useState(0);
  const { data, errorMessage, isLoading, hasMore } = useFetch(
    "tracks",
    `/search`,
    token,
    `?q=${search}&offset=${searchPage * 20}&limit=20&type=track&market=US`
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSearchPage(0);
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

  return (
    <DashboardContext.Provider
      value={{
        selectTrack,
        search,
        handleSearch,
        searchPage,
        setSearchPage,
        data,
        errorMessage,
        isLoading,
        hasMore,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
