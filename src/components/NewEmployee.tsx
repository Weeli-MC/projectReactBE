import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useGetEmployeesQuery } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";
import {
  useCreateEmployeesMutation,
  useUpdateEmployeesMutation,
} from "../services/api";

const defaultTheme = createTheme();

export default function NewEmployee() {
  const { data } = useGetEmployeesQuery();
  const [allEmployees, setAllEmployees] = useState(data);

  const [createEmployees, { isLoading }] = useCreateEmployeesMutation();
  const [updateEmployee] = useUpdateEmployeesMutation();
  const location = useLocation().state;
  const [user, setUser] = useState({
    username: "",
    salary: 0,
    department: `HR`,
  });
  const navigation = useNavigate();
  const [locationState, setLocationState] = useState(null);
  const [newLength, setNewLength] = useState(allEmployees?.length);

  useEffect(() => {
    setLocationState(location);
  }, []);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value =
      name === "salary" ? parseFloat(e.target.value) : e.target.value;
    setUser({ ...user, [name]: value });
  };

  //check if there's no id
  //if yes:
  //- check if it's first time:
  //- else length + 1
  //: if there's id:
  //else PUT
  const onSubmitClick = async () => {
    if (newLength !== undefined) {
      if (newLength > 1) {
        //if the edited is clicked, there is an id
        // if there is no id, post, else put:
        if (locationState === null) {
          createEmployees({
            username: user.username,
            salary: user.salary,
            department: user.department,
            length: newLength + 1,
          }).then((response) => {
            console.log(response);
          });
          navigation("/");
        } else {
          // use ['name'] instead of . to prevent never error
          // id: locationState["id"],
          await updateEmployee({
            id: locationState["id"],
            username: user.username,
            salary: user.salary,
            department: user.department,
          });
          navigation("/");
        }
      }
      //if first POST
      else {
        await createEmployees({
          username: user.username,
          salary: user.salary,
          department: user.department,
          length: 1,
        }).then((response) => {
          console.log(response);
        });
        navigation("/");
      }
    } else navigation("/");
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
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    name="department"
                    required
                    id="department"
                    label="department"
                    onChange={handleChange}
                  >
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"AC"}>Accounting</MenuItem>
                    <MenuItem value={"PS"}>PS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item={true} xs={12}>
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
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <button onClick={() => onSubmitClick()}>Submit</button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
