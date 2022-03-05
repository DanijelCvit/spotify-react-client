import React, { useContext } from "react";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ResourceTable from "../components/ResourceTable";
import { formatDuration } from "../utils/utils.js";
import { DashboardContext } from "../context/dashboardContext.js";

const Search = () => {
  const { data, errorMessage, isLoading } = useContext(DashboardContext);

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
  return (
    <>
      <ResourceTable rows={tracks} />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default Search;
