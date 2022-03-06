import React, { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ResourceTable from "../components/ResourceTable";
import { formatDuration } from "../utils/utils.js";
import useFetch from "../hooks/useFetch.js";
import { AuthContext } from "../context/authContext.js";
import { DashboardContext } from "../context/dashboardContext.js";
import FavoriteButton from "../components/FavoriteButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const LikedSongs = () => {
  const token = useContext(AuthContext);
  const { handleFavorite } = useContext(DashboardContext);
  const [likedPage, setLikedPage] = useState(0);
  const { data, isLoading, errorMessage, hasMore } = useFetch(
    "items",
    `/me/tracks?&offset=${likedPage * 20}&limit=20&market=US`,
    token
  );

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    console.log(tracks);
    const updatedTracks = data.map(({ track }) => ({
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
    setTracks(updatedTracks);
  }, [data.length]);

  const deleteTrack = (track) => {
    const newTracks = tracks.filter((item) => item.uri !== track.uri);
    setTracks(newTracks);
    handleFavorite("DELETE", track);
  };

  return (
    <>
      <ResourceTable
        rows={tracks}
        setPage={setLikedPage}
        isLoading={isLoading}
        hasMore={hasMore}
        favButton={
          <FavoriteButton>
            <DeleteOutlineIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </FavoriteButton>
        }
        favAction={deleteTrack}
      />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default LikedSongs;
