import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";

const useFetch = (resource, endpoint, token, query = "") => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const params = new URLSearchParams(query);
  const offset = +params.get("offset");
  const search = params.get("q");
  const type = params.get("type");

  // If search string is different, clear array before appending next result page
  useEffect(() => {
    setData([]);
  }, [search, type]);

  useEffect(() => {
    if (endpoint === "/search" && !search) {
      return setData([]);
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}${endpoint}${query}`, {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        console.log(json);

        if (json.error) {
          setErrorMessage(json.error.message);
        } else {
          setData((prevData) => {
            if (json[resource].items) {
              setHasMore(json[resource].items.length > 0);
              return [...prevData, ...json[resource].items];
            }
            setHasMore(json[resource].length > 0);
            return [...prevData, ...json[resource]];
          });
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setErrorMessage(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [endpoint, token, query, resource]);

  return { data, errorMessage, isLoading, hasMore };
};

export default useFetch;
