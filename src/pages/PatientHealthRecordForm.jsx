import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getTodaysDateInYYYYMMDDFormatSeperateByhyphen as today,
  calculate_age,
} from "../utils/utility";

const PatientHealthRecordForm = () => {
  const { state } = useLocation();

  const [patientData, setPatientData] = useState(state.data);
  const [citizenData, setCitizenData] = useState(state.data.citizen);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
  };

  return (
    <div
      className="healthRecFormContainer"
      style={{
        display: "flex",
        alignContent: "center",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
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
      >
        <div
          className="demographicDetails"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "space-between",
            // justifyContent: "space-evenly",
          }}
        >
          <div className="col1" style={{ flex: 1 }}>
            <div className="form-item">
              <label htmlFor="patientName">Patient's Name : </label>
              <input
                name="patientName"
                disabled={true}
                value={citizenData.fname + " " + citizenData.lname}
              />
            </div>

            {/* <br />
            <br /> */}
            <div className="form-item">
              <label htmlFor="healthID">Unique HealthID : </label>
              <input name="healthID" disabled={true} value={citizenData.id} />
            </div>
          </div>
          <div className="col2" style={{ flex: 2 }}>
            <div className="form-item">
              <label htmlFor="gender" style={{}}>
                Gender :{" "}
              </label>
              <input
                name="gender"
                disabled={true}
                value={citizenData.gender === "M" ? "Male" : "Female"}
              />
            </div>
            <div className="form-item">
              <label htmlFor="age">Age : </label>
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
            <label htmlFor="diagnosis">Diagnosis : </label>
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
        </div>
      </form>
    </div>
  );
};

export default PatientHealthRecordForm;
