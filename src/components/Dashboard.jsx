import React from "react";
import { useState } from "react";
import { Container, List, Box } from "@mui/material";
import TrackSearchResult from "./TrackSearchResult.jsx";
import WebPlayback from "./WebPlayback";
import { styled } from "@mui/material/styles";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Dashboard = ({ token }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <List sx={{ flexGrow: 1, overflow: "auto" }}>
        {searchResults.length > 0 &&
          searchResults.map((track) => (
            <TrackSearchResult key={track.uri} track={track} chooseTrack={""} />
          ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <WebPlayback token={token} />
      </Box>
      <WallPaper />
    </Container>
  );
};

export default Dashboard;
