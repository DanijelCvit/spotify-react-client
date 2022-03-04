import React, { forwardRef, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, ListItemText } from "@mui/material";
import { ImageListItem } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const ResourceRow = forwardRef(({ row, columns, index }, ref) => {
  const [selected, setSelected] = useState(false);

  const handleOnMouseOver = () => {
    setSelected(true);
  };

  const handleOnMouseOut = () => {
    setSelected(false);
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
        <Button
          sx={{
            color: "black",
            "&.MuiButtonBase-root:hover": { backgroundColor: "transparent" },
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
                />
              </div>
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
});

export default ResourceRow;
