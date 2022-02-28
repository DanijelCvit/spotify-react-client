import React from "react";
import {
  ListItemButton,
  ListItemText,
  ImageListItem,
  List,
} from "@mui/material";

const TrackListItem = ({
  track: { uri, albumUrl, artist, title },
  chooseTrack,
}) => {
  const handlePlay = () => {
    chooseTrack(uri);
  };

  return (
    <ListItemButton
      onClick={handlePlay}
      key={uri}
      component="a"
      href="#simple-list"
    >
      <ImageListItem sx={{ width: "50px", height: "50px", mr: 1 }}>
        <img
          src={`${albumUrl.url}?w=${albumUrl.width}&h=${albumUrl.height}&fit=crop&auto=format`}
          loading="lazy"
        />
      </ImageListItem>
      <ListItemText primary={title} secondary={artist} />
    </ListItemButton>
  );
};

export default TrackListItem;
