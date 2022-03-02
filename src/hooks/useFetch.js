import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";

const useFetch = (endpoint, token, search = null, searchPage) => {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (endpoint === "/search" && !search) {
      return setData({});
    }

    let query = "";
    if (endpoint === "/search") {
      query = `?q=${search}&type=track&offset=${searchPage * 20}&limit=20`;
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
          if (endpoint === "/search" && searchPage > 0) {
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
  }, [endpoint, token, search, searchPage]);

  return { data, errorMessage, isLoading };
};

export default useFetch;
