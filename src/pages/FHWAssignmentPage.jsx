import { List } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FHWAssignmentCard from "../component/FWHAssignmentCard";
import NavBar from "../component/Navbar";
import { baseURL, endPoints } from "../constans";
import { UserContext } from "../contexts/UserContext";

const FHWAssignmentPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAssignFHW = (patientID, fhwID) => {
    if (fhwID === "") return;
    const reqBody = {
      citizen: { uhId: patientID },
      fieldHealthWorker: { loginId: fhwID },
    };

    fetch(baseURL + endPoints["SUPERVISOR_ASSIGN_NEW_FHW"], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((data) => {
        const tmpPatients = patients.filter(
          (p) => p["citizen"]["uhId"] !== patientID
        );
        setPatients(tmpPatients);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // const { user } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const id = user.loginId;

    fetch(baseURL + endPoints["SUPERVISOR_LIST_OF_UNASSIGNED_PATIENT"] + id, {
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
        setPatients(data[0]);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.loginId]);

  return (
    <div>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>Unassigned Patients</h1>
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
        ) : patients.length > 0 ? (
          patients.map((p, id) => {
            return (
              <FHWAssignmentCard
                key={p["citizen"]["uhId"]}
                fhws={p["fieldHealthWorkers"]}
                patient={p["citizen"]}
                handleAssignFHW={handleAssignFHW}
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

export default FHWAssignmentPage;
