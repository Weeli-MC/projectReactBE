import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const Pagination = (props: any) => {
  const handlePage = (pageNumber: number) => {
    props.setCurrentPage(pageNumber);
  };

  const getPrevious = () => {
    props.setCurrentPage(props.currentPage - 1);
  };
  const getNext = () => {
    props.setCurrentPage(props.currentPage + 1);
  };

  return (
    <div className="pagination">
      <Typography gutterBottom variant="h5" sx={{ color: "#365271" }}>
        <Button onClick={getPrevious} disabled={props.currentPage <= 1}>
          Previous
        </Button>{" "}
        {props.currentPage}{" "}
        <Button
          onClick={getNext}
          disabled={Math.ceil(props.length! / 10) === props.currentPage}
          sx={{ color: "#365271", fontWeight: "bold" }}
        >
          Next
        </Button>
      </Typography>
    </div>
  );
};

export default Pagination;
