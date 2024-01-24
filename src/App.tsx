import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Employees from "./components/Employee";
import { useEffect, useState } from "react";
import { Icon } from "@mui/material";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Pagination from "./components/Pagination";
import {
  useGetEmployeesQuery,
  useCreateEmployeesMutation,
} from "./services/api";

const defaultTheme = createTheme();

export default function App() {
  const navigation = useNavigate();
  const [createEmployees, { isLoading }] = useCreateEmployeesMutation();

  const [allEmployees, setAllEmployees] = useState();
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:8080/employees", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      console.log(response);
      const json = await response.json();
      setLength(json.length);
      setAllEmployees(json);
    }

    fetchMyAPI();
  }, []);

  const navigateToAddEmployee = () => {
    navigation("AddEmployee");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        // color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        style={{ background: "#365271" }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Employees
          </Typography>
          {/* <NewEmployee/> */}
          <Button
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            style={{ background: " #34933b", color: "white" }}
            onClick={navigateToAddEmployee}
          >
            <AddCircleIcon /> Add Employee
          </Button>
        </Toolbar>
      </AppBar>
      <Grid>
        {/* End hero unit */}
        <Employees allEmployees={allEmployees} currentPage={currentPage} />
      </Grid>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        {/* <Grid container spacing={4} justifyContent="space-evenly">
          {length > 0 ? <p>Showing out of {length} entries</p> : null}
        </Grid> */}
        <Pagination
          length={length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
