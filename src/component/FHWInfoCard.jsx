import React from "react";
import routes from "../Router/routes";
import { useNavigate } from "react-router-dom";

function FHWInfoCard(fhw) {
  const { name, assignedPatients, handleClick } = fhw;
  const navigation = useNavigate();

  const mystyle = {
    // color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    border: "2px solid black",
    margin: "10px",
  };

  return (
    <div>
      <div style={mystyle}>
        <pre>
          Name : {name}, Patients assigned : {assignedPatients}{" "}
          <button
            onClick={handleClick}
            style={{
              float: "right",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid",
            }}
          >
            More info
          </button>
        </pre>
      </div>
    </div>
  );
}

export default FHWInfoCard;
