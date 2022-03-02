import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";

const Main = () => {
  const token = useContext(AuthContext);

  return (
    <>
      {token === "" ? (
        <Login />
      ) : (
        <>
          <Dashboard token={token} />
        </>
      )}
    </>
  );
};

export default Main;
