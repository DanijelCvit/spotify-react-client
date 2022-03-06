import { Button } from "@mui/material";
import React from "react";

const FavoriteButton = ({ children }) => {
  return (
    <Button
      disableRipple={true}
      sx={{
        color: "black",
        "&.MuiButtonBase-root:hover": {
          backgroundColor: "transparent",
        },
        "&.MuiRippleCircle": { display: "none" },
      }}
    >
      {children}
    </Button>
  );
};

export default FavoriteButton;
