import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import WebPlayback from "./WebPlayback";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationWrapper from "./NavigationWrapper";
import Search from "../pages/Search";
import LikedSongs from "../pages/LikedSongs";
import { WallPaper } from "./WallPaper";
import DashboardProvider from "../context/dashboardContext.js";

const drawerWidth = 240;
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false, // No more ripple!
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(40px)",
        },
      },
    },
  },
});

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <DashboardProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Router>
            <NavigationWrapper drawerWidth={drawerWidth} />
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
                <Route path="/" element={<Search />} />
                <Route path="/liked" element={<LikedSongs />} />
                <Route path="*" element={<Search />} />
              </Routes>
              <Box>
                <WebPlayback />
              </Box>
            </Box>
          </Router>
        </Box>
        <WallPaper sx={{ zIndex: -1 }} />
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default Dashboard;
