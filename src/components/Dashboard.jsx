import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import WebPlayback from "./WebPlayback";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useFetch from "../hooks/useFetch.js";
import { BASE_API_URL } from "../constants.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationWrapper from "./NavigationWrapper";
import Search from "../pages/Search";
import Home from "../pages/Home";
import LikedSongs from "../pages/LikedSongs";
import YourLibrary from "../pages/YourLibrary";
import { WallPaper } from "./WallPaper";

const drawerWidth = 240;
const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(40px)",
        },
      },
    },
  },
});

function Dashboard(props) {
  const [search, setSearch] = useState("");
  const [searchPage, setSearchPage] = useState(0);
  const { data, errorMessage, isLoading, hasMore } = useFetch(
    "tracks",
    `/search`,
    props.token,
    `?q=${search}&offset=${searchPage * 20}&limit=20&type=track&market=US`
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSearchPage(0);
  };

  const selectTrack = async (track) => {
    try {
      const res = await fetch(`${BASE_API_URL}/me/player/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          uris: [track.uri],
          offset: {
            position: 0,
          },
          position_ms: 0,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Router>
          <NavigationWrapper
            handleSearch={handleSearch}
            drawerWidth={drawerWidth}
            search={search}
            selectTrack={selectTrack}
            {...props}
          />
          <Box
            component="main"
            sx={{
              display: "flex",
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Toolbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/search"
                element={
                  <Search
                    data={data}
                    selectTrack={selectTrack}
                    search={search}
                    searchPage={searchPage}
                    setSearchPage={setSearchPage}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route path="/library" element={<YourLibrary />} />
              <Route path="/liked" element={<LikedSongs />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Box>
              <WebPlayback token={props.token} />
            </Box>
          </Box>
        </Router>
      </Box>
      <WallPaper sx={{ zIndex: -1 }} />
    </ThemeProvider>
  );
}

export default Dashboard;
