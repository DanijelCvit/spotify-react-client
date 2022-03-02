import React from "react";
import Box from "@mui/material/Box";

const LikedSongs = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px)",
        boxShadow: "none",
        color: "black",
        overflow: "auto",
      }}
    >
      Liked
    </Box>
  );
};

export default LikedSongs;
