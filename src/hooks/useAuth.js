import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("/auth/token");
      const json = await response.json();

      setToken(json.accessToken);
      setExpiresIn(json.expiresIn);
      setRefreshToken(json.refreshToken);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }
    console.log("useEffect Refresh token running...");

    const timer = setInterval(() => {
      const refreshCurrentToken = async () => {
        const response = await fetch("/auth/refresh_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        });
        const json = await response.json();

        console.log("Refreshed token", json);
        setToken(json.accessToken);
        setExpiresIn(json.expiresIn);
      };

      refreshCurrentToken();
    }, (expiresIn - 600) * 1000);

    return () => clearInterval(timer);
  }, [expiresIn, refreshToken]);

  return token;
};

export default useAuth;
