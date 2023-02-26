import React from "react";
import { ListItem, ListItemText, Button } from "@mui/material";

const PatientCard = ({ handler, name, gender, age }) => {
  const calculate_age = (dob) => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

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
          calculate_age(new Date(age))
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
