import {
  useGetEmployeesQuery,
  useDeleteEmployeesMutation,
} from "../services/api";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface Employee {
  id: number;
  name: string;
  salary: number;
  department: string;
}
const defaultTheme = createTheme();

export default function Employees(props: any) {
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3000/employees");
      console.log(response);
      const json = await response.json();
      console.log(json);
      setAllEmployees(json);
    }

    fetchMyAPI();
  }, []);

  // const [deleteEmployee] = useDeleteEmployeesMutation();
  const deleteEmployee = async (params: number) => {
    // console.log(params);
    // await axios.delete("http://localhost:3000/employees", {
    //   params: { id: params },
    // });
    try {
      const response = await axios.delete(
        `http://localhost:3000/employees/${params}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {allEmployees?.map((element: Employee) => (
            <Grid item key={element.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {element.name}
                  </Typography>
                  <Typography>{element.name}</Typography>
                </CardContent>
                <CardActions>
                  <button onClick={() => deleteEmployee(element.id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteEmployee(element.id)}>
                    Delete
                  </button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ul>
  );
}
