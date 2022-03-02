import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import TrackListItem from "./TrackListItem";

const SideBarNavigation = ({ selectTrack }) => {
  const token = useContext(AuthContext);
  const {
    data: savedTracks,
    isLoading,
    errorMessage,
  } = useFetch("items", "/me/tracks?limit=10", token);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component={NavLink} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/search">
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Search"} />
        </ListItemButton>
        <ListItemButton component={NavLink} to="library">
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary={"Your Library"} />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/liked">
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText primary={"Liked Songs"} />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        {savedTracks.length > 0 &&
          savedTracks.map(({ track }) => (
            <TrackListItem
              key={track.uri}
              track={track}
              selectTrack={selectTrack}
              noImage={true}
            />
          ))}
      </List>
    </div>
  );
};

export default SideBarNavigation;
