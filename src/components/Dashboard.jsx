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
      <Paper
        component="form"
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search..." }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
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
