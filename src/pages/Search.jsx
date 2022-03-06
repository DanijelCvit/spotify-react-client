import React, { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ResourceTable from "../components/ResourceTable";
import { formatDuration } from "../utils/utils.js";
import { DashboardContext } from "../context/dashboardContext.js";
import useFetch from "../hooks/useFetch.js";
import { AuthContext } from "../context/authContext.js";
import FavoriteButton from "../components/FavoriteButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Search = () => {
  const token = useContext(AuthContext);
  const { search, searchPage, setSearchPage, handleFavorite } =
    useContext(DashboardContext);

  const { data, errorMessage, isLoading, hasMore } = useFetch(
    "tracks",
    `/search`,
    token,
    `?q=${search}&offset=${searchPage * 20}&limit=20&type=track&market=US`
  );

  // Filter data to
  const tracks = data.map((track) => ({
    id: uuidv4(),
    title: {
      name: track.name,
      artistName: track.artists[0].name,
      imageUrl: track.album.images[0].url,
    },
    album: track.album.name,
    duration: formatDuration(Math.floor(track.duration_ms / 1000)),
    uri: track.uri,
  }));

  const addFavorite = (track) => {
    handleFavorite("PUT", track);
  };

  return (
    <>
      <ResourceTable
        rows={tracks}
        setPage={setSearchPage}
        isLoading={isLoading}
        hasMore={hasMore}
        favButton={
          <FavoriteButton>
            <FavoriteBorderIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </FavoriteButton>
        }
        favAction={addFavorite}
      />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default Search;
