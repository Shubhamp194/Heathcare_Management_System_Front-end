import { Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowUpModal from "../component/FollowUpModal";
import HRCard from "../component/HealthRecordCard";
import HealthRecordModal from "../component/HealthRecordModal";
import PatientCard from "../component/PatientCard";
import { baseURL, endPoints } from "../constans";
import routes from "../Router/routes";
import { calculate_age, removeToken } from "../utils/utility";

const PatientHealthRecordForm = () => {
  const { state } = useLocation();
  const navigation = useNavigate();

  const [patientData, setPatientData] = useState(state.data);
  const [citizenData, setCitizenData] = useState(state.data.citizen);
  const [followUps, setFollowUps] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [treatemet, setTreatment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState(false);
  const [pastHealthRec, setPastHealthRec] = useState([]);
  const [showHRModal, setShowHRModal] = useState(false);
  const [healthRec, setHealthRec] = useState({});

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

  const fetchPastHR = () => {
    fetch(baseURL + endPoints["DOCTOR_GET_CONSENTED_DATA"] + citizenData.uhId, {
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
        if (data[0].length > 0) setPastHealthRec(data[0]);
      })
      .catch((e) => console.error(e));
  };

  const handleHRModal = (hr) => {
    setHealthRec(hr);
    // setShowHRModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patientData["fields"] = "";
    patientData["fieldsValues"] = "";
    patientData["conclusion"] = diagnosis;
    patientData["prescription"] = prescription;
    patientData["treatment"] = treatemet;
    patientData["followUps"] = followUps;
    patientData["citizen"] = { uhId: patientData["citizen"]["uhId"] };

    let healthRec = JSON.stringify(patientData);

    fetch(baseURL + endPoints["DOCTOR_SUBMIT_HR"], {
      body: healthRec,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 401) removeToken();
        throw res;
      })
      .then((data) => {
        alert(data);
        navigation(routes.OPD, { replace: true });
      })
      .catch((e) => {
        console.error(e);
      });
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
      <div style={{ margin: "0", height: "1%" }}>
        <button
          style={{
            backgroundColor: "",
            borderRadius: "5px",
            fontSize: "20px",
            width: "70px",
            textAlign: "center",
            height: "30px",
            padding: "0 10px",
            color: "black",
            fontWeight: "bold",

            marginLeft: "5%",
          }}
          onClick={(e) => {
            navigation(-1);
          }}
        >
          Back
        </button>
        <h1
          style={{
            marginLeft: "26%",
            display: "inline-block",

            marginBottom: "0",
          }}
        >
          {" "}
          Patient's Health Record
        </h1>
      </div>
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
      {showHRModal && (
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
          <HealthRecordModal healthRecord />
        </div>
      )}
      <form
        className="healthRecForm"
        style={{
          backgroundColor: "white",
          width: "90vw",
          minHeight: "30vh",
          borderRadius: "20px",
          padding: "20px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
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
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, backgroundColor: "" }}>
              <div className="">
                <label htmlFor="diagnosis">Symptoms / Diagnosis : </label>
                {/* <br />
                <br /> */}
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

              <div className="" style={{ marginTop: "2%" }}>
                <label htmlFor="treatment">Treatment : </label>
                {/* <br />
                <br /> */}
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

              <div className="" style={{ marginTop: "2%" }}>
                <label htmlFor="presciption">Prescription : </label>
                {/* <br />
                <br /> */}
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
            <div
              style={{
                flex: 1,
                backgroundColor: "",
                display: "flex",
                alignContent: !consent ? "center" : "",
                justifyContent: !consent ? "center" : "flex-start",
                flexWrap: "wrap",
                flexDirection: !consent ? "row" : "column",

                // border: "1px solid grey",
              }}
              className="hrContainer"
            >
              {consent ? (
                pastHealthRec.length > 0 ? (
                  <div
                    style={{
                      overflowY: "auto",
                      maxWidth: "613px",
                      minHeight: "424px",
                      maxHeight: "424px",
                    }}
                  >
                    {pastHealthRec.map((v, key) => (
                      <div key={key} style={{ margin: "5px" }}>
                        <HRCard hr={v} modalHandler={handleHRModal} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <h2 style={{ textAlign: "center", marginTop: "25%" }}>
                    No past health records
                  </h2>
                )
              ) : (
                <>
                  <input
                    type="checkbox"
                    style={{ height: "20px", maxWidth: "20px", margin: 0 }}
                    onChange={(e) => {
                      fetchPastHR();
                      setConsent(e.target.checked);
                    }}
                  />
                  &nbsp;Patient consent for past health records?
                </>
              )}
            </div>
          </div>
          <Button
            variant="outlined"
            style={{
              marginTop: "2%",
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
              onClick={handleSubmit}
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
