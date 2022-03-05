import React, { forwardRef, useState, useContext, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, ListItemText } from "@mui/material";
import { ImageListItem } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { DashboardContext } from "../context/dashboardContext.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BASE_API_URL } from "../constants.js";
import { AuthContext } from "../context/authContext.js";
import { useLocation } from "react-router-dom";

const ResourceRow = forwardRef(({ row, columns, index }, ref) => {
  const location = useLocation();
  const token = useContext(AuthContext);
  const [selected, setSelected] = useState(false);

  const { player, selectTrack, is_paused, current_track } =
    useContext(DashboardContext);

  const isPlaying = !is_paused && current_track.uri === row.uri;
  const handleOnMouseOver = () => {
    setSelected(true);
  };

  const handleOnMouseOut = () => {
    setSelected(false);
  };

  const handleSelectTrack = () => {
    if (row.uri === current_track.uri) {
      return player.togglePlay();
    }
    selectTrack(row);
  };

  const handlePauseTrack = () => {
    player.togglePlay();
  };

  const handleFavorite = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/me/tracks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ids: [row.uri.split(":")[2]],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      ref={ref}
      hover
      role="checkbox"
      tabIndex={-1}
    >
      <TableCell>
        {!is_paused && current_track.uri === row.uri ? (
          <Button
            onClick={handlePauseTrack}
            disableRipple={true}
            sx={{
              color: "black",
              "&.MuiButtonBase-root:hover": { backgroundColor: "transparent" },
              "&.MuiRippleCircle": { display: "none" },
            }}
          >
            <PauseCircleOutlineIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Button>
        ) : (
          <Button
            onClick={handleSelectTrack}
            disableRipple={true}
            sx={{
              color: "black",
              "&.MuiButtonBase-root:hover": { backgroundColor: "transparent" },
              "&.MuiRippleCircle": { display: "none" },
            }}
          >
            <PlayCircleOutlineIcon
              sx={{
                width: "30px",
                height: "30px",
                display: selected ? "block" : "none",
              }}
            />
            <div style={{ display: selected ? "none" : "block" }}>
              {index + 1}
            </div>
          </Button>
        )}
      </TableCell>

      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.id === "title" ? (
              <div style={{ display: "flex" }}>
                <ImageListItem sx={{ width: "50px", height: "50px", mr: 1 }}>
                  <img
                    src={`${value.imageUrl}`}
                    loading="lazy"
                    alt={value.name}
                  />
                </ImageListItem>
                <ListItemText
                  primary={value.name}
                  secondary={value.artistName}
                  secondaryTypographyProps={{
                    color: isPlaying ? "#a17799" : "inherit",
                  }}
                  sx={{ color: isPlaying ? "#a17799" : "inherit" }}
                />
              </div>
            ) : (
              <span style={{ color: isPlaying ? "#a17799" : "inherit" }}>
                {column.id === "duration" && location.pathname !== "/liked" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={handleFavorite}
                      disableRipple={true}
                      sx={{
                        color: "black",
                        "&.MuiButtonBase-root:hover": {
                          backgroundColor: "transparent",
                        },
                        "&.MuiRippleCircle": { display: "none" },
                      }}
                    >
                      <FavoriteBorderIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          display: selected ? "block" : "none",
                        }}
                      />
                    </Button>
                    <span>{value}</span>
                  </div>
                ) : (
                  value
                )}
              </span>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
});

export default ResourceRow;
