import { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SideBarNavigation from "./SideBarNavigation";
import MusicSearch from "./MusicSearch";
import { useLocation } from "react-router-dom";
import { DashboardContext } from "../context/dashboardContext.js";

const NavigationWrapper = ({ drawerWidth }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { search, handleSearch, selectTrack, ...otherProps } =
    useContext(DashboardContext);

  const { window } = otherProps;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(40px)",
          boxShadow: "none",
          color: "black",
        }}
      >
        <Toolbar sx={{ justifyContent: { sm: "center" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {location.pathname === "/" && (
            <MusicSearch search={search} handleSearch={handleSearch} />
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(40px)",
              boxShadow: "none",
              color: "black",
            },
          }}
        >
          <SideBarNavigation selectTrack={selectTrack} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(40px)",
              boxShadow: "none",
              color: "black",
            },
          }}
          open
        >
          <SideBarNavigation selectTrack={selectTrack} />
        </Drawer>
      </Box>
    </>
  );
};

NavigationWrapper.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavigationWrapper;
