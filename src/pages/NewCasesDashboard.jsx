import React, { useState, useEffect } from "react";
import NavBar from "../component/Navbar";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../Router/routes";
import { baseURL } from "../constans";
import PatientCard from "../component/PatientCard";

const NewCasesDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // call api to fetch patients data
  }, []);

  const navigate = useNavigate();

  const handleAttendPatient = (p) => {
    navigate(routes.HealthRecord, {
      state: { data: p },
    });
  };

  useEffect(() => {
    fetch(baseURL + "/doctor/getNewHealthRecords?loginId=DOC1", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(res);
      })
      .then((data) => {
        setPatients(data[0].length > 0 ? data[0] : []);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <h2 style={{ marginTop: "25vh" }}>Fethcing Data...</h2>
        ) : patients.length > 0 ? (
          patients.map((p) => {
            const { citizen, hrId } = p;
            const { fname, lname, dob, gender } = citizen;

            return (
              <PatientCard
                key={hrId}
                handler={(e) => handleAttendPatient(p)}
                name={fname + " " + lname}
                gender={gender}
                age={dob}
              />
            );
          })
        ) : (
          <h2 style={{ marginTop: "25vh" }}>
            No patient in the queue at this moment.
          </h2>
        )}
      </List>
    </>
  );
};

export default NewCasesDashboard;
