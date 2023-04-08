import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../component/Navbar";
import { Button, List, ListItem } from "@mui/material";
import { baseURL } from "../constans";

const FHWCard = ({ fhw, cnt }) => {
  return (
    <ListItem
      style={{
        backgroundColor: "white",
        width: "50vw",
        borderRadius: "10px",
        display: "flex",
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
        alignContent: "center",
        padding: "1%",
      }}
    >
      <div style={{ flex: "2" }}>{fhw["fname"] + " " + fhw["lname"]}</div>
      <div>
        <span style={{ color: "#4a4a4a" }}>{"Total Patients " + cnt}</span>
        <button
          style={{
            marginLeft: "15px",
            padding: "5px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid",
            cursor: "pointer",
          }}
        >
          Reassign
        </button>
      </div>
    </ListItem>
  );
};

const PatientReassignmentPage = () => {
  const [fhws, setFhws] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const handlePatientReassign = (patients, fhws, fhw) => {};

  useEffect(() => {
    fetch(baseURL + "/supervisor/getFhws?loginId=" + user["loginId"], {
      method: "GET",
      headers: {
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((data) => {
        data = data[0];
        setFhws(data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>List of health workers</h1>
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
        {loading ? (
          <h2 style={{ marginTop: "25vh" }}>Fethcing Data...</h2>
        ) : fhws.length > 0 ? (
          fhws.map((obj) => {
            const { citizen } = obj["fieldHealthWorker"];

            return (
              <FHWCard
                key={citizen["uhId"]}
                fhw={citizen}
                cnt={obj["fieldHealthWorker"]["citizenAssigned"]}
                handler={(e) =>
                  handlePatientReassign(
                    obj["citizens"],
                    obj["fieldHealthWorkers"],
                    citizen
                  )
                }
              />
            );
          })
        ) : (
          <h2 style={{ marginTop: "25vh" }}>
            No patient in the queue at this moment.
          </h2>
        )}
      </List>
    </div>
  );
};

export default PatientReassignmentPage;
