import React, { useState, useEffect } from "react";
import "./App.css";
import useAuth from "./hooks/useAuth.js";
import AuthProvider from "./context/authContext";
import Main from "./pages/Main";

const App = () => {
  const token = useAuth();

  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
