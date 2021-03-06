import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import DevicesIcon from "@mui/icons-material/Devices";
import Box from "@mui/material/Box";
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ImageListItem from "@mui/material/ImageListItem";
import ListItemText from "@mui/material/ListItemText";
import ComputerIcon from "@mui/icons-material/Computer";
import List from "@mui/material/List";
import useFetch from "../hooks/useFetch.js";
import { AuthContext } from "../context/authContext.js";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";

export default function ConnectedDevices({
  selectedDevice,
  setSelectedDevice,
}) {
  const token = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    data: devices,
    isLoading,
    errorMessage,
  } = useFetch("devices", "/me/player/devices", token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "device-popover" : undefined;

  return (
    <Box sx={{ position: "absolute", right: "0px" }}>
      <IconButton
        onClick={handleClick}
        aria-describedby={id}
        aria-label="connect device"
      >
        <DevicesIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {devices.length > 0 && (
          <List>
            {devices.map((device) => (
              <ListItemButton
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                component="a"
                href="#simple-list"
                selected={selectedDevice === device.id}
              >
                <ImageListItem>
                  <ComputerIcon sx={{ mr: 1 }} fontSize="large" />
                </ImageListItem>
                <ListItemText primary={device.name} secondary={device.type} />
              </ListItemButton>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
        {errorMessage && <Typography>{errorMessage}</Typography>}
      </Popover>
    </Box>
  );
}
