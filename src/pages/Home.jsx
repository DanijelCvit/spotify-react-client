import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../components/Login";
import WebPlayback from "../components/WebPlayback";

const Home = () => {
  const token = useContext(AuthContext);

  return <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>;
};

export default Home;
