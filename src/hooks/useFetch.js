import { useEffect } from "react";
import { useState } from "react";

const BASE_API_URL = "https://api.spotify.com/v1";

const useFetch = (endpoint, token) => {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${""}`,
          },
        });

        const json = await res.json();

        if (json.error) {
          setErrorMessage(json.error.message);
        } else {
          setData(json);
        }
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  return { data, errorMessage, isLoading };
};

export default useFetch;
