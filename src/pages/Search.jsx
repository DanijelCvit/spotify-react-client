import React, { useEffect, useRef } from "react";
import List from "@mui/material/List";
import TrackListItem from "../components/TrackListItem";

const Search = ({
  data: tracks,
  selectTrack,
  search,
  searchPage,
  setSearchPage,
}) => {
  const trackListElem = useRef();
  const targetListItem = useRef();

  useEffect(() => {
    let options = {
      root: trackListElem.current,
      rootMargin: "50px",
      threshold: 0,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      const isIntersecting = entries[0].isIntersecting;
      if (isIntersecting && search !== "") {
        setSearchPage((prevSearchPage) => prevSearchPage + 1);
      }
    }, options);

    observer.observe(targetListItem.current);
  }, []);
  return (
    <List
      id="trackList"
      ref={trackListElem}
      sx={{
        flexGrow: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px)",
        boxShadow: "none",
        color: "black",
        overflow: "auto",
      }}
    >
      {tracks.length > 0 &&
        tracks.map((track) => (
          <TrackListItem
            key={track.uri}
            track={track}
            selectTrack={selectTrack}
          />
        ))}
      <div ref={targetListItem} style={{ backgroundColor: "orange" }}></div>
    </List>
  );
};

export default Search;
