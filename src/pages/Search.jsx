import React, { useCallback, useEffect, useRef } from "react";
import List from "@mui/material/List";
import TrackListItem from "../components/TrackListItem";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ResourceTable from "../components/ResourceTable";

const Search = ({
  data,
  selectTrack,
  search,
  searchPage,
  setSearchPage,
  hasMore,
  isLoading,
  errorMessage,
}) => {
  const observer = useRef();
  const observerRootElem = useRef();

  const targetListItem = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setSearchPage((prevSearchPage) => prevSearchPage + 1);
          }
        },
        { root: observerRootElem.current, rootMargin: "50px", threshold: "0.0" }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  console.log(searchPage);
  const tracks = data.map((item) => ({
    id: uuidv4(),
    title: "Test title",
    album: "Test album",
    duration: 1000,
  }));
  return (
    <div
      style={{
        flexGrow: 1,
      }}
      ref={observerRootElem}
    >
      <ResourceTable rows={tracks} ref={targetListItem} />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </div>
  );
};

export default Search;
