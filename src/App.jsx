import React, { useState, useEffect } from "react";
import "./App.css";
import useAuth from "./hooks/useAuth.js";
import AuthProvider from "./context/authContext";
import Home from "./pages/Home";

const App = () => {
  const token = useAuth();

  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
