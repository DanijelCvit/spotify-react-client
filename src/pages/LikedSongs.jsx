import React, { useContext, useState } from "react";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ResourceTable from "../components/ResourceTable";
import { formatDuration } from "../utils/utils.js";
import useFetch from "../hooks/useFetch.js";
import { AuthContext } from "../context/authContext.js";

const LikedSongs = () => {
  const token = useContext(AuthContext);
  const [likedPage, setLikedPage] = useState(0);
  const { data, isLoading, errorMessage, hasMore } = useFetch(
    "items",
    `/me/tracks?&offset=${likedPage * 20}&limit=20&market=US`,
    token
  );

  const tracks = data.map(({ track }) => ({
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

  return (
    <>
      <ResourceTable
        rows={tracks}
        setPage={setLikedPage}
        isLoading={isLoading}
        hasMore={hasMore}
      />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default LikedSongs;
