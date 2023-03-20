import React, { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import { getTodaysDateInYYYYMMDDFormatSeperateByhyphen as today } from "../utils/utility";
import { baseURL } from "../constans";
import { useLocation } from "react-router-dom";

const ReceptionistDashboard = () => {
  const { state: _state } = useLocation();

  // const [patientName, setPatientName] = useState("");
  const [doctors] = useState(_state["doctors"]);
  const [healthID, setHealthID] = useState("");
  const [timeStamp, setTimeStamp] = useState();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [doctor, setDoctor] = useState("");
  const [state, setState] = useState("");

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleDoctorChange = (e) => {
    // alert(e.target.value);
    setDoctor(e.target.value);
  };

  useEffect(() => {
    setTimeStamp(today());
  }, []);

  const clearTheForm = () => {
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
  // const handleNameChange = (e) => {
  //   setPatientName(e.target.value);
  // };

  const handleHealthIDChange = (e) => {
    setHealthID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {};
    obj["street1"] = address;
    obj["citizen"] = { uhId: healthID };
    obj["city"] = "Bangalore";
    obj["state"] = "Karnataka";
    obj["mobileNo"] = contactNo;
    obj["pincode"] = pincode;
    obj["doctor"] = { loginId: doctor };

    const healthRecord = JSON.stringify(obj);
    fetch(baseURL + "/receptionist/createHealthRecord", {
      body: healthRecord,
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) return res.json();

        throw new Error(res);
      })
      .then((data) => {
        alert("Record created");
        clearTheForm();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  };

  const handlePinCodeChange = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div className="reception">
      <NavBar showBackButton={false} />
      <h1 style={{ textAlign: "center" }}>Reception Dashboard</h1>
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Create a new case
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
            <label
              htmlFor="timestamp"
              style={{
                fontSize: "20px",
                float: "right",
                // marginLeft: "50px",
                // display: "flex",
                // flexWrap: "wrap",
                // justifyContent: "flex-end",
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
          <div className="form-item">
            <label htmlFor="state">State : </label>
            <select
              style={{ width: "15vw", padding: "10px", borderRadius: "9px" }}
              placeholder=""
              name="state"
              value={state}
              required
              onChange={handleStateChange}
            >
              <option>Select State</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Uttarpradesh">Uttarpradesh</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div className="form-item" style={{}}>
            <label htmlFor="address" style={{ fontSize: "20px" }}>
              Address :
            </label>
            <textarea
              placeholder="Enter Full Address (Street,landmark etc)"
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
              {[<option key="-1">Select Doctor</option>].concat(
                doctors.map((d) => {
                  let { fname, lname, uhId } = d["citizen"];
                  return (
                    <option key={uhId} value={d["loginId"]}>
                      {fname + " " + lname}
                    </option>
                  );
                })
              )}
              {/* <option value={"DOC1"}>Doctor 1</option>
              <option value={"DOC2"}>Doctor 2</option> */}
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
                boxShadow: "0px 0px 4px 1px rgba(100,155,155,0.85)",
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
