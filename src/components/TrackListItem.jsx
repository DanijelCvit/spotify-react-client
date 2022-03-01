import React from "react";
import {
  ListItemButton,
  ListItemText,
  ImageListItem,
  List,
} from "@mui/material";

const TrackListItem = ({ track, selectTrack }) => {
  const handleSelectTrack = () => {
    selectTrack(track);
  };

  return (
    <ListItemButton
      onClick={handleSelectTrack}
      key={track.uri}
      component="a"
      href="#simple-list"
    >
      <ImageListItem sx={{ width: "50px", height: "50px", mr: 1 }}>
        <img
          src={`${track.album.images[0].url}?w=${track.album.images[0].width}&h=${track.album.images[0].height}&fit=crop&auto=format`}
          loading="lazy"
        />
      </ImageListItem>
      <ListItemText primary={track.name} secondary={track.artists[0].name} />
    </ListItemButton>
  );
};

export default TrackListItem;
