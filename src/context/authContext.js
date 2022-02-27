import { createContext } from "react";
import useAuth from "../hooks/useAuth.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = useAuth();

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
