import React, { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import { getTodaysDateInYYYYMMDDFormatSeperateByhyphen as today } from "../utils/utility";

const ReceptionistDashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [healthID, sethealthID] = useState("");
  const [timeStamp, setTimeStamp] = useState();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contactNo, setContactNo] = useState("");

  useEffect(() => {
    setTimeStamp(today());
  }, []);

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
    sethealthID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form submitted");
  };

  const handlePinCodeChange = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div className="reception">
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Reception Dashboard</h1>
      <p style={{ textAlign: "center" }}>Creat a new case</p>

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
            borderRadius: "15px",
            width: "50vw",
            minHeight: "60vh",
            padding: "20px",
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
                borderRadius: "9px",
              }}
              onChange={handleNameChange}
              value={patientName}
              required
            />

            <label
              htmlFor="timestamp"
              style={{ fontSize: "20px", marginLeft: "50px" }}
            >
              Date :{" "}
            </label>
            <input
              type="date"
              name="timestamp"
              style={{
                fontSize: "16px",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "9px",
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

          <div
            className="form-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="address" style={{ fontSize: "20px" }}>
              Address :&nbsp;
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
            />

            {/* <label htmlFor="address" style={{ fontSize: "20px" }}>
              Address :{" "}
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Patients Address"
              style={{
                fontSize: "16px",
                padding: "15px",
                border: "1px grey solid",
                borderRadius: "9px",
              }}
              onChange={handleAddressChange}
              value={address}
              required
            /> */}
          </div>
          {/* pincode */}
          <div className="form-group">
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
          <div className="form-group">
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
              placeholder="only 10 last digits"
              minLength={10}
              maxLength={10}
              onChange={handleContactNoChange}
              required
            />
            <div>
              <label htmlFor="doctorList" style={{ fontSize: "20px" }}>
                Doctor List :{" "}
              </label>
              <select
                name="doctorlist"
                style={{ width: "150px", padding: "10px", borderRadius: "9px" }}
                defaultValue={"Select Doctor"}
                placeholder="blah"
              >
                <option>Select Doctor</option>
                <option>Doctor 2</option>
                <option>Doctor 1</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
