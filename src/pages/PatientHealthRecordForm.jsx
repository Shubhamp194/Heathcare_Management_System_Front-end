import { Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FollowUpModal from "../component/FollowUpModal";
import { calculate_age } from "../utils/utility";

const PatientHealthRecordForm = ({ state }) => {
  // const { state } = useLocation();

  const [patientData, setPatientData] = useState(state.data);
  const [citizenData, setCitizenData] = useState(state.data.citizen);
  const [followUps, setFollowUps] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [treatemet, setTreatment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
  };

  const addFollowUps = (arr) => {
    arr = arr.concat(followUps);
    arr.sort((a, b) => {
      return (
        new Date(a.dateOfFollowUp).valueOf() -
        new Date(b.dateOfFollowUp).valueOf()
      );
    });
    setFollowUps(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state["fields"] = "";
    state["fieldsValues"] = "";
    state["conclusion"] = diagnosis;
    state["prescription"] = prescription;
    state["treatment"] = treatemet;
    state["followUps"] = followUps;
    console.log(state);
  };

  const handleTreatmentChange = (e) => {
    setTreatment(e.target.value);
  };
  const modalHandler = (e) => {
    setShowModal(true);
  };

  const removeFollowUp = (id) => {
    let arr = [];

    for (let i = 0; i < followUps.length; i++) {
      if (i !== id) arr.push(followUps.at(i));
    }
    setFollowUps(arr);
  };

  return (
    <div
      className="healthRecFormContainer"
      style={{
        display: "flex",
        alignContent: "center",
        flexWrap: "wrap",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {showModal && (
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            bottom: "0px",
            right: "0",
            backgroundColor: "rgba(0,0,0,0.75)",
            zIndex: 1,
            width: "100vw",
            height: "",
          }}
        >
          <FollowUpModal
            setShowModal={setShowModal}
            addFollowUps={addFollowUps}
          />
        </div>
      )}
      <h1 style={{ textAlign: "center" }}> Patient's Health Record</h1>
      <form
        className="healthRecForm"
        style={{
          backgroundColor: "white",
          width: "90vw",
          minHeight: "30vh",
          borderRadius: "20px",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          className="demographicDetails"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <div className="col1" style={{ backgroundColor: "" }}>
            <div className="form-item">
              <label style={{ maxWidth: "50%" }} htmlFor="patientName">
                Patient's Name :{" "}
              </label>
              <input
                style={{}}
                name="patientName"
                disabled={true}
                value={citizenData.fname + " " + citizenData.lname}
              />
            </div>

            {/* <br />
            <br /> */}
            <div className="form-item">
              <label htmlFor="healthID" style={{ maxWidth: "50%" }}>
                Unique HealthID :{" "}
              </label>
              <input name="healthID" disabled={true} value={citizenData.uhId} />
            </div>
          </div>
          <div className="col2" style={{ backgroundColor: "" }}>
            <div className="form-item">
              <label htmlFor="gender" style={{ maxWidth: "35%" }}>
                Gender :{" "}
              </label>
              <input
                name="gender"
                style={{}}
                disabled={true}
                value={citizenData.gender === "M" ? "Male" : "Female"}
              />
            </div>
            <div className="form-item">
              <label htmlFor="age" style={{ maxWidth: "35%" }}>
                Age :{" "}
              </label>
              <input
                name="age"
                disabled={true}
                value={calculate_age(new Date(citizenData.dob)) + " Yr"}
              />
            </div>
          </div>
        </div>
        <div className="healthDetails" style={{ marginTop: "10vh" }}>
          <div className="form-item">
            <label htmlFor="diagnosis">Symptoms / Diagnosis : </label>
            <textarea
              name="diagnosis"
              placeholder="your diagnosis"
              cols={50}
              rows={5}
              value={diagnosis}
              required
              onChange={handleDiagnosisChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="treatment">Treatment : </label>
            <textarea
              name="treatment"
              placeholder="what treatment given..."
              cols={50}
              rows={5}
              required
              value={treatemet}
              onChange={handleTreatmentChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="presciption">Prescription : </label>
            <textarea
              name="prescription"
              placeholder="prescription for patient"
              cols={50}
              rows={5}
              required
              value={prescription}
              onChange={handlePrescriptionChange}
            />
          </div>

          <Button
            variant="outlined"
            style={{
              marginLeft: "38vw",
              fontWeight: "bold",
              border: "2px solid",
            }}
            onClick={modalHandler}
          >
            Create Follow up
          </Button>
          <br />
          <br />
          {followUps.length > 0 && (
            <table align="center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((f, key) => {
                  return (
                    <tr key={key}>
                      <td>{"Follow Up " + (key + 1)}</td>
                      <td>{new Date(f.dateOfFollowUp).toLocaleDateString()}</td>
                      <td>
                        <button onClick={(e) => removeFollowUp(key)}>
                          remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div>
            <Button
              type="submit"
              variant="outlined"
              style={{
                marginLeft: "38vw",
                minWidth: "187px",
                padding: "1px",
                marginTop: "20px",
                marginBottom: "20px",
                height: "37px",
                fontWeight: "bold",
                border: "2px solid",
              }}
            >
              Submit{" "}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientHealthRecordForm;
