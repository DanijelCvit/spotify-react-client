import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";

const useFetch = (endpoint, token, query = "") => {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(query);
  const offset = +params.get("offset");
  const search = params.get("q");

  useEffect(() => {
    if (endpoint === "/search" && !search) {
      return setData({});
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}${endpoint}${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json.error) {
          setErrorMessage(json.error.message);
        } else {
          if (endpoint === "/search" && offset > 0) {
            setData((prevData) => {
              return {
                tracks: {
                  items: [...prevData.tracks.items, ...json.tracks.items],
                },
              };
            });
          } else {
            setData(json);
          }
        }
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token, query]);

  return { data, errorMessage, isLoading };
};

export default useFetch;
