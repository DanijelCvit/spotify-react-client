import React from "react";
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
  console.log(searchPage);
  const tracks = data.map((item) => ({
    id: uuidv4(),
    title: "Test title",
    album: "Test album",
    duration: 1000,
  }));
  return (
    <>
      <ResourceTable
        rows={tracks}
        isLoading={isLoading}
        hasMore={hasMore}
        setSearchPage={setSearchPage}
      />
      {isLoading && <LinearProgress sx={{ mb: 1 }} color="inherit" />}
      {errorMessage}
    </>
  );
};

export default Search;
