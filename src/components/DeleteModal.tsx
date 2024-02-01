import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDeleteEmployeesMutation } from "../services/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DeleteModal(props: any) {
  const [deleteEmployee, { isLoading }] = useDeleteEmployeesMutation();
  const handleClose = async () => {
    props.setOpen(false);
    try {
      deleteEmployee(props.empId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal open={props.open} onClose={handleClose}>
        <Box sx={{ ...style, width: "70%" }}>
          <h2>Warning!</h2>
          <p>Do you want to delete this employee from your database?</p>
          <Button onClick={handleClose}>Confirm</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
