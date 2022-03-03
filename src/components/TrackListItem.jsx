import React, { forwardRef } from "react";
import { ListItemButton, ListItemText, ImageListItem } from "@mui/material";

const TrackListItem = forwardRef(({ track, selectTrack, noImage }, ref) => {
  const handleSelectTrack = () => {
    selectTrack(track);
  };

  return (
    <ListItemButton
      ref={ref}
      onClick={handleSelectTrack}
      component="a"
      href="#simple-list"
    >
      {!noImage && (
        <ImageListItem sx={{ width: "50px", height: "50px", mr: 1 }}>
          <img
            src={`${track.album.images[0].url}?w=${track.album.images[0].width}&h=${track.album.images[0].height}&fit=crop&auto=format`}
            loading="lazy"
          />
        </ImageListItem>
      )}
      <ListItemText primary={track.name} secondary={track.artists[0].name} />
    </ListItemButton>
  );
});

export default TrackListItem;
