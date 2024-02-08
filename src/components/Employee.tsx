import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "./DeleteModal";

export interface Employee {
  id: number;
  name: string;
  salary: number;
  department: string;
}
const defaultTheme = createTheme();

export default function Employees(props: any) {
  const navigation = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    async function setIndex() {
      if (props.currentPage === 1) {
        setStartIndex(0);
        setEndIndex(10);
      } else {
        setStartIndex(props.currentPage * 10 - 10);
        setEndIndex(props.currentPage * 10 + 10);
      }
    }

    setIndex();
  }, [props.currentPage]);

  const editEmployee = async (params: number) => {
    navigation("/AddEmployee", {
      state: {
        id: params,
      },
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <ul>
      <Grid container spacing={3}>
        {props.allEmployees
          ?.slice(startIndex, endIndex)
          .map((element: Employee) => (
            <Grid item key={element.id} xs={12} sm={6}>
              <Card
                sx={{
                  // height: "100%",
                  display: "flex",
                  // marginLeft: "5%",
                  // marginTop: "5%",
                  // backgroundcolor: "yellow",
                }}
                style={{ backgroundColor: "#eaeaea" }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {element.name}
                  </Typography>
                  <Typography>{element.department}</Typography>
                  <Typography>
                    {element.salary.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  {open ? (
                    <DeleteModal
                      handleOpen={handleOpen}
                      open={open}
                      setOpen={setOpen}
                      empId={element.id}
                    />
                  ) : null}
                  <EditIcon
                    onClick={() => editEmployee(element.id)}
                    style={{ color: "#facc59" }}
                  />
                  <DeleteIcon
                    onClick={() => handleOpen()}
                    style={{ color: "red" }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </ul>
  );
}
