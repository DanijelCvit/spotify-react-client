import React, { forwardRef, useState, useContext } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, ListItemText } from "@mui/material";
import { ImageListItem } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { DashboardContext } from "../context/dashboardContext.js";

const ResourceRow = forwardRef(
  ({ row, columns, index, favButton, favAction }, ref) => {
    const [onHover, setOnHover] = useState(false);

    const { player, selectTrack, is_paused, current_track } =
      useContext(DashboardContext);

    const isPlaying = !is_paused && current_track.uri === row.uri;

    const handleOnMouseOver = () => {
      setOnHover(true);
    };

    const handleOnMouseOut = () => {
      setOnHover(false);
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

    return (
      <TableRow
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        ref={ref}
        hover
        role="checkbox"
        tabIndex={-1}
        onDoubleClick={() => selectTrack(row)}
      >
        <TableCell>
          {!is_paused && current_track.uri === row.uri ? (
            <Button
              onClick={handlePauseTrack}
              disableRipple={true}
              sx={{
                color: "black",
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "transparent",
                },
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
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "transparent",
                },
                "&.MuiRippleCircle": { display: "none" },
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  display: onHover ? "block" : "none",
                }}
              />
              <div style={{ display: onHover ? "none" : "block" }}>
                {index + 1}
              </div>
            </Button>
          )}
        </TableCell>

        {columns.map((column, index) => {
          const value = row[column.id];
          return (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{
                display: {
                  xs: index > 0 ? "none" : "table-cell",
                  sm: "table-cell",
                },
              }}
            >
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
                  {column.id === "duration" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        onClick={() => favAction(row)}
                        style={{
                          visibility: onHover ? "visible" : "hidden",
                        }}
                      >
                        {favButton}
                      </div>
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
  }
);

export default ResourceRow;
