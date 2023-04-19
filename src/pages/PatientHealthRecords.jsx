import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../component/Navbar";
import CardButton from "../component/CardButton";
import CardContent from "../component/CardContent";

const PatientHealthRecords = () => {
  const { state } = useLocation();

  const [hrs, setHRs] = useState(state["hrs"]);
  console.log(state);
  return (
    <div>
      <NavBar showBackButton={true} />
      <h2 style={{ textAlign: "center" }}>
        {hrs[0]["citizen"]["fname"] +
          " " +
          hrs[0]["citizen"]["lname"] +
          "'s Health Records"}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        {hrs.map((obj) => {
          const {
            conclusion: symptoms,
            treatment,
            followUps,
            creationDate,
            prescription,
          } = obj;

          return (
            <div
              key={obj["hrId"]}
              style={{
                margin: "5px 0",
                backgroundColor: "rgb(255,255,255)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "2px 2px 3px 1px rgba(0,0,0,0.35)",
                width: "55%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flex: "5",
                  wordBreak: "break-word",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    marginBottom: "5px",
                    color: "rgba(0,0,0,0.65)",
                  }}
                >
                  {new Date(creationDate).toLocaleDateString()}
                </p>
                <CardContent data={symptoms} label={"Symptoms"} />
                <CardContent data={treatment} label={"Treatment"} />
                <CardContent data={prescription} label={"Prescription"} />
                <CardContent
                  data={followUps.length}
                  label={"No. of followups"}
                />
              </div>

              <CardButton
                onClick={(e) => console.log("d")}
                disabled={followUps.length === 0}
              >
                show followups
              </CardButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientHealthRecords;
