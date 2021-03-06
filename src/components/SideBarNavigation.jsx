import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import TrackListItem from "./TrackListItem";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const SideBarNavigation = ({ selectTrack }) => {
  const token = useContext(AuthContext);
  const { data, isLoading, errorMessage } = useFetch(
    "items",
    "/me/player/recently-played",
    token
  );

  const uniqueIds = [...new Set(data.map(({ track }) => track.id))];

  const savedTracks = uniqueIds.map((id) => {
    return data.find((item) => item.track.id === id).track;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Toolbar sx={{ flexShrink: "0" }} />
      <Divider sx={{ flexShrink: "0" }} />
      <List sx={{ flexShrink: "0" }}>
        <ListItemButton component={NavLink} to="/">
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Search"} />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/liked">
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText primary={"Liked Songs"} />
        </ListItemButton>
      </List>
      <Divider />
      <List sx={{ height: "100%", overflowY: "auto" }}>
        {savedTracks.length > 0 &&
          savedTracks.map((track) => (
            <TrackListItem
              key={uuidv4()}
              track={track}
              selectTrack={selectTrack}
              noImage={true}
            />
          ))}
      </List>
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </div>
  );
};

export default SideBarNavigation;
