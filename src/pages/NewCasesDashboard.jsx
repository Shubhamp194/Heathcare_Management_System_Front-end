import React, { useState, useEffect } from "react";
import NavBar from "../component/Navbar";
import { styled } from "@mui/system";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../Router/routes";

const Block = styled("div")(({ theme }) => ({
  height: "100px",
  margin: "10px",
}));

const NewCasesDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // call api to fetch patients data
  }, []);

  const navigate = useNavigate();

  const handleAttendPatient = () => {
    navigate(routes.HealthRecord, {
      state: { patient: { data: "all the data of patient" } },
    });
  };

  return (
    <>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>Today's Patients</h1>
      <List
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          alignContent: "space-around",
          flexDirection: "column",
        }}
      >
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
        <ListItem
          style={{
            backgroundColor: "white",
            width: "50vw",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Patient's&nbsp;Name"
            secondary="Gender | Age"
          />
          <Button
            variant="outlined"
            style={{ color: "black", border: "1px solid black" }}
            onClick={handleAttendPatient}
          >
            Attend
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default NewCasesDashboard;
