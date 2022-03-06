import React, { useCallback, useContext, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ResourceRow from "./ResourceRow";
import { DashboardContext } from "../context/dashboardContext.js";

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(243,172,216,0.7)",
    backdropFilter: "blur(40px)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "album", label: "Album", minWidth: 100 },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "right",
  },
];

const ResourceTable = ({
  rows,
  setPage,
  isLoading,
  hasMore,
  favButton,
  favAction,
}) => {
  const { selectTrack } = useContext(DashboardContext);
  // Setting up a observer for last row to trigger infinite scroll
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
            setPage((prevPage) => prevPage + 1);
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

  return (
    <Paper
      ref={observerRootElem}
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px)",
        boxShadow: "none",
        color: "black",
        width: "100%",
        flexGrow: 1,
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ position: "relative" }}>
            <TableRow sx={{ border: 0 }}>
              <StyledTableCell style={{ minWidth: "100px" }}>#</StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows.map((row, index) => {
                if (index === rows.length - 1) {
                  return (
                    <ResourceRow
                      key={row.id}
                      row={row}
                      columns={columns}
                      index={index}
                      ref={targetListItem}
                      selectTrack={selectTrack}
                      favButton={favButton}
                      favAction={favAction}
                    />
                  );
                } else {
                  return (
                    <ResourceRow
                      row={row}
                      columns={columns}
                      index={index}
                      key={row.id}
                      selectTrack={selectTrack}
                      favButton={favButton}
                      favAction={favAction}
                    />
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResourceTable;
