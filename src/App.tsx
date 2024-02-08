import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Employees from "./components/Employee";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Pagination from "./components/Pagination";
import {
  useGetEmployeesQuery,
  useCreateEmployeesMutation,
} from "./services/api";
import Box from "@mui/material/Box";

const defaultTheme = createTheme();

export default function App() {
  const navigation = useNavigate();
  const { data, status, error, refetch, isSuccess } = useGetEmployeesQuery();
  const [allEmployees, setAllEmployees] = useState(data);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const navigateToAddEmployee = () => {
    <NavLink to="/AddEmployee">About</NavLink>;

    // navigation("/AddEmployee");
  };

  useEffect(() => {
    async function setOthers() {
      if (isSuccess) {
        setAllEmployees(data);
        setLength(data!.length);
      } else {
        setAllEmployees(data);
      }
    }

    setOthers();
  }, [data]);

  // const [startIndex, setStartIndex] = useState(0);
  // const [endIndex, setEndIndex] = useState(0);
  let startIndex = 0;
  let endIndex = 0;

  if (currentPage === 1) {
    // setStartIndex(0);
    console.log("here");
    startIndex = 0;
    // setEndIndex(10);
    endIndex = 10;
  } else {
    // setStartIndex(currentPage * 10 - 10);
    startIndex = currentPage * 10 - 10;
    //if the current page * 10 is less than the total number of entries:
    //set the end as currentpage * 20
    //else set it as the last item
    if (currentPage * 10 < length && length) {
      // setEndIndex(currentPage * 10);
      endIndex = currentPage * 10 + 10;
    } else {
      // setEndIndex(length);
      endIndex = length;
    }
  }

  // useEffect(() => {
  //   async function setIndex() {
  //     if (currentPage === 1) {
  //       // setStartIndex(0);
  //       console.log("here");
  //       startIndex = 0;
  //       // setEndIndex(10);
  //       endIndex = 10;
  //     } else {
  //       // setStartIndex(currentPage * 10 - 10);
  //       startIndex = currentPage * 10 - 10;
  //       //if the current page * 10 is less than the total number of entries:
  //       //set the end as currentpage * 20
  //       //else set it as the last item
  //       if (currentPage * 10 < length && length) {
  //         // setEndIndex(currentPage * 10);
  //         endIndex = currentPage * 10 + 10;
  //       } else {
  //         // setEndIndex(length);
  //         endIndex = length;
  //       }
  //     }
  //   }

  //   setIndex();
  // }, [currentPage]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: "50px", padding: 20, listStyle: "none" } }}
      />
      <CssBaseline />
      <div className="App container">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/AddEmployee">About</NavLink>
          </div>
        </nav>
        <Outlet />
      </div>
      <div className="App container">
        <AppBar
          position="static"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          style={{ background: "#365271" }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h3"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Employees
            </Typography>
            <Button
              sx={{ my: 1, mx: 1.5 }}
              style={{ background: " #34933b", color: "white" }}
              onClick={() => navigateToAddEmployee()}
            >
              <AddCircleIcon />
              <Typography sx={{ padding: "5px" }}>Add Employee</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Outlet />
      </div>

      <Grid item xs={12} sm={6}>
        {/* End hero unit */}
        <Employees allEmployees={allEmployees} currentPage={currentPage} />
      </Grid>
      <Container maxWidth="md">
        <Grid container>
          <Grid item={true} xs={12} sm={9}>
            <Typography
              gutterBottom
              variant="h6"
              left="10%"
              sx={{ color: "#365271" }}
            >
              Showing{" "}
              <Box component="span" fontWeight="bold">
                {startIndex + 1}-{endIndex}
              </Box>{" "}
              out of{" "}
              <Box component="span" fontWeight="bold">
                {length}{" "}
              </Box>
              entries
            </Typography>
          </Grid>
          <Grid item={true}>
            <Pagination
              length={length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Grid>
        </Grid>
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
