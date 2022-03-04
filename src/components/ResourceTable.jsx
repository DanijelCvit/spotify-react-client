import React, { useCallback, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { ListItemText } from "@mui/material";
import { ImageListItem } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //e3afe0
    backgroundColor: "rgba(243,172,216,0.7)",
    // backgroundImage: "linear-gradient(to right, red , yellow)",

    backdropFilter: "blur(40px)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

const ResourceTable = ({ rows, isLoading, hasMore, setSearchPage }) => {
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

  const textStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

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
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                    <TableRow
                      ref={targetListItem}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "title" ? (
                              <div style={{ display: "flex" }}>
                                <ImageListItem
                                  sx={{ width: "50px", height: "50px", mr: 1 }}
                                >
                                  <img
                                    src={`${value.imageUrl}`}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                                <ListItemText
                                  primary={value.name}
                                  secondary={value.artistName}
                                />
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "title" ? (
                              <div style={{ display: "flex" }}>
                                <ImageListItem
                                  sx={{ width: "50px", height: "50px", mr: 1 }}
                                >
                                  <img
                                    src={`${
                                      value.imageUrl
                                    }?w=${64}&h=${64}&fit=crop&auto=format`}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                                <ListItemText
                                  primaryTypographyProps={{}}
                                  primary={value.name}
                                  secondary={value.artistName}
                                />
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
