import React from "react";
import { Container } from "@mui/material";

const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="App">
        <header className="App-header">
          <a className="btn-spotify" href="/auth/login">
            Login with Spotify
          </a>
        </header>
      </div>
    </Container>
  );
};

export default Login;
