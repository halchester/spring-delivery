import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { getAllRiders } from "../api/query";
import Spinner from "../utils/Spinner/Spinner";
import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "../api/index";

const Setting = () => {
  const { status, data } = useQuery("getAllRiders", getAllRiders);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const viewProfileHandler = (id) => {
    history.push(`/info/${id}`);
  };

  const editProfileHandler = (id) => {
    history.push(`/rider/edit/${id}`);
  };

  const deleteProfileHandler = (id) => {
    setLoading(true);
    axios.delete(`/api/rider/${id}`).then((response) => {
      setLoading(false);
      alert("Rider deleted");
    });
  };

  if (status === "success") {
    var emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  }

  return status === "success" ? (
    <Box>
      <Typography variant="h5" gutterBottom>
        Total Riders : {data.length}
      </Typography>
      <Typography variant="h6">
        Yangon Riders : {data.filter((data) => data.state === "Yangon").length}
      </Typography>

      <Typography variant="h6">
        Mandalay Riders :{" "}
        {data.filter((data) => data.state === "Mandalay").length}
      </Typography>

      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pic</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? <Spinner /> : null}
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((person, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Avatar
                    src={person.picURL}
                    style={{ height: "75px", width: "75px" }}
                  />
                </TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.phoneNumber}</TableCell>
                <TableCell>{person.state}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => viewProfileHandler(person.uniqueId)}
                  >
                    View
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() => editProfileHandler(person.uniqueId)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteProfileHandler(person.uniqueId)}
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    </Box>
  ) : (
    <Spinner />
  );
};

export default Setting;
