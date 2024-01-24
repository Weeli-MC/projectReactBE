import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";

//1.

const Pagination = (props: any) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(props.length / 10); i++) {
    paginationNumbers.push(i);
  }

  const handlePage = (pageNumber: number) => {
    props.setCurrentPage(pageNumber);
  };
  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
