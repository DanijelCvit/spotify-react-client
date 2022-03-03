import React, { useCallback, useEffect, useRef } from "react";
import List from "@mui/material/List";
import TrackListItem from "../components/TrackListItem";
import { LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

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
  return (
    <>
      <List
        ref={observerRootElem}
        sx={{
          flexGrow: 1,
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(40px)",
          boxShadow: "none",
          color: "black",
          overflow: "auto",
        }}
      >
        {data.length > 0 &&
          data.map((track, index) => {
            if (index === data.length - 1) {
              return (
                <TrackListItem
                  key={track.id}
                  track={track}
                  selectTrack={selectTrack}
                  ref={targetListItem}
                />
              );
            }
            return (
              <TrackListItem
                key={uuidv4()}
                track={track}
                selectTrack={selectTrack}
              />
            );
          })}
      </List>
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default Search;
