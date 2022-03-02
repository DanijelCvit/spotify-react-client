import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";

const useFetch = (resource, endpoint, token, query = "") => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(query);
  const offset = +params.get("offset");
  const search = params.get("q");

  // If search string is different, clear array before appending next result page
  useEffect(() => {
    setData([]);
  }, [search]);

  useEffect(() => {
    if (endpoint === "/search" && !search) {
      return setData([]);
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
        console.log(json);

        if (json.error) {
          setErrorMessage(json.error.message);
        } else {
          setData((prevData) => {
            if (json[resource].items) {
              return [...prevData, ...json[resource].items];
            }
            return [...prevData, ...json[resource]];
          });
        }
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token, query, resource]);

  console.log(data);
  return { data, errorMessage, isLoading };
};

export default useFetch;
