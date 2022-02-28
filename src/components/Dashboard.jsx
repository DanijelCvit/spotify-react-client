import React from "react";
import { useState } from "react";
import {
  Container,
  Paper,
  InputBase,
  IconButton,
  List,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrackSearchResult from "./TrackSearchResult.jsx";
import WebPlayback from "./WebPlayback";

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
    </Container>
  );
};

export default Dashboard;
