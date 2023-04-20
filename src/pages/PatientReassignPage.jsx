import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../component/Navbar";
import { List, ListItem } from "@mui/material";
import { baseURL, endPoints } from "../constans";
import PatientReassignModal from "../component/PatientReassignModal";

const FHWCard = ({ fhw, cnt, handler }) => {
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
          onClick={handler}
          disabled={cnt === 0}
        >
          Reassign
        </button>
      </div>
    </ListItem>
  );
};

const PatientReassignmentPage = () => {
  const [fhws, setFhws] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalObj, setModalObj] = useState({});
  const [reload, setReload] = useState(false);

  const { user } = useContext(UserContext);

  const assignPatientToFHW = (id, list, currentFHW, newList) => {
    let tmp = fhws;

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i]["fieldHealthWorker"]["loginId"] === id) {
        tmp[i]["citizens"] = tmp[i]["citizens"].concat(list);

        break;
      }
    }

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i]["fieldHealthWorker"]["loginId"] === currentFHW) {
        tmp[i]["citizens"] = newList;
        break;
      }
    }

    setFhws(tmp);
  };

  const handleSubmit = (
    currentFHW,
    selectedFHW,
    selectedPatients,
    patients
  ) => {
    setShowModal(false);
    const data = { citizens: [], fieldHealthWorker: {} };
    data["fieldHealthWorker"]["loginId"] = selectedFHW;

    selectedPatients.forEach((p) => {
      data["citizens"].push({ uhId: p });
    });

    let patientList = [];
    let newPatientList = [];
    patients.forEach((p) => {
      if (selectedPatients.indexOf(String(p["uhId"])) !== -1)
        patientList.push(p);
      else newPatientList.push(p);
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      },
    };

    fetch(baseURL + endPoints["SUPERVISOR_PATIENT_REASSIGN"], options)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((response) => {
        assignPatientToFHW(
          selectedFHW,
          patientList,
          currentFHW,
          newPatientList
        );
        setReload(!reload);
      })
      .catch((e) => console.error(e))
      .finally(() => {});
  };

  const handlePatientReassign = (patients, options, fhw) => {
    setModalObj({ patients, options, fhw, fhws, setFhws, handleSubmit });
    setShowModal(true);
  };

  useEffect(() => {
    fetch(baseURL + endPoints["SUPERVISOR_GET_FHW"] + user["loginId"], {
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
    <div style={{ position: "relative" }}>
      {showModal && (
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <PatientReassignModal data={modalObj} setShowModal={setShowModal} />
        </div>
      )}
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
                cnt={obj["citizens"].length}
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
            No Health Worker under your supervision
          </h2>
        )}
      </List>
    </div>
  );
};

export default PatientReassignmentPage;
