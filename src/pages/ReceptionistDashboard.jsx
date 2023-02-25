import React, { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import { getTodaysDateInYYYYMMDDFormatSeperateByhyphen as today } from "../utils/utility";

const ReceptionistDashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [healthID, setHealthID] = useState("");
  const [timeStamp, setTimeStamp] = useState();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [doctor, setDoctor] = useState(-1);

  const handleDoctorChange = (e) => {
    // alert(e.target.value);
    setDoctor(e.target.value);
  };

  useEffect(() => {
    setTimeStamp(today());
  }, []);

  const clearTheForm = () => {
    setPatientName("");
    setHealthID("");
    setAddress("");
    setPincode("");
    setContactNo("");
    setDoctor("");
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleHealthIDChange = (e) => {
    setHealthID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];

    let obj = {};
    obj["name"] = patientName;
    obj["uhaid"] = healthID;
    obj["address"] = address;
    obj["pincode"] = pincode;
    obj["contactNo"] = contactNo;
    obj["doctorId"] = doctor;

    const healthRecord = JSON.stringify(obj);
    console.log(healthRecord);
    clearTheForm();
  };

  const handlePinCodeChange = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div className="reception">
      <NavBar showBackButton={false} />
      <h1 style={{ textAlign: "center" }}>Reception Dashboard</h1>
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Creat a new case
      </p>

      <div
        className="case-form"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <form
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "75vw",
            minHeight: "60vh",
            padding: "20px",
            marginBottom: "10vh",
          }}
          onSubmit={handleSubmit}
        >
          <div className="form-item">
            <label htmlFor="patientName" style={{ fontSize: "20px" }}>
              Patient Name :{" "}
            </label>
            <input
              type="text"
              name="patientName"
              placeholder="Enter name"
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                flex: "1",
                borderRadius: "9px",
              }}
              onChange={handleNameChange}
              value={patientName}
              required
            />

            <label
              htmlFor="timestamp"
              style={{
                fontSize: "20px",
                marginLeft: "50px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              Date :&nbsp;&nbsp;
            </label>
            <input
              type="date"
              name="timestamp"
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
                maxWidth: "12%",
              }}
              value={timeStamp}
              // onChange={(e) => setTimeStamp(e.target.value)}
              required
              readOnly
            />
          </div>

          {/* Health ID */}

          <div className="form-item">
            <label htmlFor="healthID" style={{ fontSize: "20px" }}>
              Health ID :{" "}
            </label>
            <input
              type="text"
              name="healthId"
              placeholder="Enter Health ID"
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
              }}
              onChange={handleHealthIDChange}
              value={healthID}
              required
            />
          </div>

          {/* Patients address */}

          <div className="form-item" style={{}}>
            <label htmlFor="address" style={{ fontSize: "20px" }}>
              Address :
            </label>
            <textarea
              placeholder="Enter Address"
              name="address"
              cols={35}
              rows={3}
              style={{
                resize: "none",
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
              }}
              onChange={handleAddressChange}
              value={address}
              required
            />
          </div>
          {/* pincode */}
          <div className="form-item">
            <label htmlFor="pincode" style={{ fontSize: "20px" }}>
              Pincode :{" "}
            </label>
            <input
              type="text"
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
              }}
              placeholder="Enter pincode"
              maxLength="6"
              minLength="6"
              onChange={handlePinCodeChange}
              value={pincode}
              required
            />
          </div>

          {/* contact No */}
          <div className="form-item">
            <label htmlFor="contactno" style={{ fontSize: "20px" }}>
              Contact No. :{" "}
            </label>
            <input
              type="text"
              name="contactno"
              value={contactNo}
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
              }}
              placeholder="Only 10 last digits"
              minLength={10}
              maxLength={10}
              onChange={handleContactNoChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="doctorList" style={{ fontSize: "20px" }}>
              Doctor List :{" "}
            </label>
            <select
              name="doctorlist"
              id="doctorlist"
              style={{ width: "15vw", padding: "10px", borderRadius: "9px" }}
              placeholder="blah"
              value={doctor}
              onChange={handleDoctorChange}
              required
            >
              <option>Select Doctor</option>
              <option value={0}>Doctor 1</option>
              <option value={1}>Doctor 2</option>
            </select>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <button
              style={{
                marginTop: "35px",
                width: "150px",
                height: "50px",
                backgroundColor: "rgb(183,223,255)",
                borderRadius: "15px",
                border: "none",
                cursor: "pointer",
                boxShadow: "1px 1px 1px 1px rgba(0,0,155,0.5)",
                fontSize: "1rem",
                fontWeight: "bold",
                zIndex: "1",
              }}
              type={"submit"}
            >
              Create Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
