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

function Dashboard(props) {
  const [search, setSearch] = useState("");
  const [searchPage, setSearchPage] = useState(0);
  const { data, errorMessage, isLoading } = useFetch(
    `/search`,
    props.token,
    `?q=${search}&offset=${searchPage * 20}&limit=20&type=track`
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
                  />
                }
              />
              <Route path="/library" element={<YourLibrary />} />
              <Route path="/liked" element={<LikedSongs />} />{" "}
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
