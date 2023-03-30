import { List } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import { baseURL } from "../constans";
import { UserContext } from "../contexts/UserContext";

const FHWAssignmentPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const id = user.loginId;

    fetch(baseURL + "/supervisor/getUnassignedCitizens?loginId=" + id, {
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
        console.log(data[0]);
        setPatients(data[0]);

        // data.forEach((obj) => {
        //   console.log("=============");
        //   //   console.log(obj);
        //   console.log(obj["citizen"]);
        //   console.log(obj["fieldHealthWorkers"]);
        // });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          patients.map((p) => {
            return <div>{p["citizen"]["fname"]}</div>;
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
