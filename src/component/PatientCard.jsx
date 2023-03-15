import React from "react";
import { ListItem, ListItemText, Button } from "@mui/material";
import { calculate_age } from "../utils/utility";

const PatientCard = ({ handler, name, gender, age }) => {
  return (
    <ListItem
      style={{
        backgroundColor: "white",
        width: "50vw",
        borderRadius: "10px",
      }}
    >
      <ListItemText
        primary={name}
        secondary={
          (gender === "F" ? "Female" : "Male") +
          " | " +
          calculate_age(new Date(age)) +
          " Yr"
        }
      />
      <Button
        variant="outlined"
        style={{ color: "black", border: "1px solid black" }}
        onClick={handler}
      >
        Attend
      </Button>
    </ListItem>
  );
};

export default PatientCard;
