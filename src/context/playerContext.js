import { createContext } from "react";

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  return <PlayerContext.Provider value={{}}>{children}</PlayerContext.Provider>;
};

export default PlayerProvider;
