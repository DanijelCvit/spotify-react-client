import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../constants.js";

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
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json.error) {
          setErrorMessage(json.error.message);
        } else {
          console.log(json);
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
