import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCreateEmployeesMutation } from "../services/api";
import { useState } from "react";
import { useGetEmployeesQuery } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const defaultTheme = createTheme();

export default function NewEmployee() {
  const [createEmployees, { isLoading }] = useCreateEmployeesMutation();
  const [input, setInput] = useState("");
  const newLength = useGetEmployeesQuery().data?.length;
  const [user, setUser] = useState({ username: "", salary: 0, department: "" });

  // const onInputChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   console.log("event here", event.target.value);
  //   setInput(event.target.value);
  // };

  const navigation = useNavigate();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     salary: data.get("salary"),
  //     department: data.get("department"),
  //   });
  //   createEmployees({
  //     username: data.get("name"),
  //     salary: data.get("salary"),
  //     // department: data.get("department"),
  //     length: newLength,
  //   });
  //   navigation("/");
  // };

  // const handleChange = (event: any) => {
  //   console.log("change event", event.target.name, event.target.value);
  //   setUser({ ...user, [event?.target.name]: event?.target.value });
  // };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const onSubmitClick = () => {
    // createEmployees({ username: input, length: newLength });
    if (user.username.length > 1) {
      createEmployees({
        username: user.username,
        salary: user.salary,
        department: user.department,
        length: newLength + 1,
      });
      navigation("/");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#365271" }}></Avatar>
          <Typography component="h1" variant="h5">
            Employee details
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            // onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    name="department"
                    required
                    id="department"
                    label="Department"
                    onChange={handleChange}
                  >
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"FC"}>Finance</MenuItem>
                    <MenuItem value={"AD"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  name="salary"
                  autoComplete="salary"
                  onChange={handleChange}
                /> */}
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    required
                    fullWidth
                    id="salary"
                    label="Salary"
                    name="salary"
                    autoComplete="salary"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <button
              // type="submit"
              // fullWidth
              // variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              onClick={onSubmitClick}
            >
              Submit
            </button>
          </Box>
        </Box>
      </Container>
      {/* <input onChange={onInputChange} value={input} />
      <button onClick={onSubmitClick}>Submit</button> */}
    </ThemeProvider>
  );
}
