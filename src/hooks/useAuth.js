import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      const hasExpired = auth.expirationDate * 1000 - Date.now() <= 0;
      if (auth.token && !hasExpired) {
        setToken(auth.token);
        setExpiresIn(auth.expirationDate * 1000 - Date.now());
        setRefreshToken(auth.refreshToken);
        return;
      }
    }

    const getToken = async () => {
      const response = await fetch("/auth/token");
      const json = await response.json();

      setToken(json.accessToken);
      setExpiresIn(json.expiresIn);
      setRefreshToken(json.refreshToken);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: json.accessToken,
          expirationDate: Date.now() + json.expiresIn * 1000,
          refreshToken: json.refreshToken,
        })
      );
    };

    getToken();
  }, []);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }
    console.log("setting timer");
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

        setToken(json.accessToken);
        setExpiresIn(json.expiresIn);

        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: json.accessToken,
            expirationDate: Date.now() + json.expiresIn * 1000,
            refreshToken,
          })
        );
      };

      refreshCurrentToken();
    }, (expiresIn - 600) * 1000);

    return () => clearInterval(timer);
  }, [expiresIn, refreshToken]);

  return token;
};

export default useAuth;
