import { baseURL } from "../constans";
import React, { useState } from "react";

const PatientReassignModal = ({ data, setShowModal }) => {
  const { patients, options: fhws, fhw, handleSubmit } = data;

  const [selectedFHW, setSelectedFHW] = useState("");
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [cnt, setCnt] = useState(0);

  const handlePatientSelect = (e) => {
    let tmp = selectedPatients;
    let val = cnt;

    if (e.target.checked) {
      tmp.push(e.target.value);
      val++;
    } else {
      tmp = tmp.filter((id) => id !== e.target.value);
      val--;
    }
    setCnt(val);
    setSelectedPatients(tmp);
  };

  return (
    <div
      style={{
        zIndex: 2,
        position: "fixed",
        top: "10%",
        left: "30%",
        width: "40vw",
        height: "430px",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "16px",
      }}
      className="App"
    >
      <span
        style={{
          fontSize: "40px",
          float: "right",
          marginRight: "15px",
          marginTop: "0px",
          cursor: "pointer",
        }}
        onClick={(e) => setShowModal(false)}
      >
        &times;
      </span>
      <h2
        style={{
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        Reassign Patients
      </h2>
      <p>{selectedPatients.length + " Patients selected"}</p>
      <div
        style={{
          flexWrap: "nowrap",
          justifyContent: "center",
          display: "flex",
          backgroundColor: "",
          marginTop: "2%",
          padding: "1%",
          alignItems: "center",
        }}
      >
        <input
          name="currentFHW"
          type="text"
          value={fhw["fname"] + " " + fhw["lname"]}
          style={{ height: "17px" }}
          disabled
        />
        <span style={{ margin: "0 2%" }}>To</span>
        <select
          name="fhws"
          style={{
            marginLeft: "0%",
            padding: "0.5% 2%",
            borderRadius: "5px",
            width: "185px",
          }}
          value={selectedFHW}
          required
          onChange={(e) => setSelectedFHW(e.target.value)}
        >
          {[
            <option value="" key="-1" style={{ fontSize: "14px" }}>
              Select FHW
            </option>,
          ].concat(
            fhws.map((usr) => {
              const { citizen } = usr;
              return (
                <option
                  value={usr["loginId"]}
                  key={usr["loginId"]}
                  style={{ fontSize: "14px" }}
                >
                  {citizen["fname"] + " " + citizen["lname"]}
                </option>
              );
            })
          )}
        </select>

        <button
          style={{
            marginLeft: "2%",
            padding: "0.5% 2%",
            borderRadius: "5px",
            border: "1px solid",
          }}
          disabled={selectedFHW === "" || cnt === 0}
          onClick={(e) =>
            handleSubmit(
              "FHW" + fhw["uhId"],
              selectedFHW,
              selectedPatients,
              patients
            )
          }
        >
          submit
        </button>
      </div>
      <div
        style={{
          marginTop: "3vh",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {patients.map((p) => {
          return (
            <div key={p["uhId"]}>
              <input
                type="checkbox"
                value={p["uhId"]}
                onChange={handlePatientSelect}
              />
              <span>{p["fname"] + " " + p["lname"]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientReassignModal;
