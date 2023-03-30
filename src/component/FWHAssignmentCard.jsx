import React, { useState } from "react";
import { ListItem, Button } from "@mui/material";

const FHWAssignmentCard = ({ fhws, patient, handleAssignFHW }) => {
  const [fhw, setFhw] = useState("");

  const handleFHWChange = (e) => {
    setFhw(e.target.value);
  };

  return (
    <ListItem
      style={{
        backgroundColor: "white",
        width: "65vw",
        borderRadius: "10px",
        display: "flex",
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
        alignContent: "center",
        padding: "1%",
      }}
    >
      <div
        className="patientDataContainer"
        style={{ flex: "3", fontSize: "18px" }}
      >
        {patient["fname"] + " " + patient["lname"]}
      </div>
      <div>
        <select
          className="fhwList"
          style={{ padding: "5px", fontSize: "14px", borderRadius: "5px" }}
          value={fhw}
          onChange={handleFHWChange}
          required
        >
          {[
            <option key="-1" value="">
              {"Select FHW"}
            </option>,
          ].concat(
            fhws.map((f, id) => {
              const { citizen } = f;
              return (
                <option key={id} value={f["loginId"]}>
                  {citizen["fname"] + " " + citizen["lname"]}
                </option>
              );
            })
          )}
        </select>

        <Button
          variant="contained"
          style={{
            marginLeft: "10px",
            color: "black",
            border: "1px solid black",
          }}
          onClick={(e) => handleAssignFHW(patient["uhId"], fhw)}
          disabled={fhw.length === 0}
        >
          Submit
        </Button>
      </div>
    </ListItem>
  );
};

export default FHWAssignmentCard;
