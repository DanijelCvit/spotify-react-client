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
import { useEffect } from "react";
import { BASE_API_URL } from "../constants.js";

export default function ConnectedDevices() {
  const token = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, isLoading, errorMessage } = useFetch(
    "/me/player/devices",
    token
  );

  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!selectedDevice) {
      return;
    }

    const setActiveDevice = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/me/player`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ device_ids: [selectedDevice], play: true }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    setActiveDevice();
  }, [selectedDevice]);

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
        {data.devices?.length > 0 && (
          <List>
            {data.devices.map((device) => (
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
        {errorMessage && <Typography>{errorMessage}</Typography>}
      </Popover>
    </Box>
  );
}
