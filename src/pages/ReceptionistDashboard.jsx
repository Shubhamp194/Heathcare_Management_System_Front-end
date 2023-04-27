import React, { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import {
  cityWisePincode,
  getTodaysDateInYYYYMMDDFormatSeperateByhyphen as today,
  removeToken,
} from "../utils/utility";
import { alertMsg, baseURL, endPoints } from "../constans";
import { useLocation } from "react-router-dom";
import CustomizedSnackbars from "../component/SnackBar";
import { STATES, DISTRICTTOTALUKA, STATETODISTRICT } from "../utils/utility";
import PatientDetailDialog from "../component/PatietnDetailModal";
import { encryptString, decryptString } from "../utils/encrypt_decrypt";

const successSnack = {
  state: true,
  message: "Record Created",
  severity: "success",
};

const emptySnack = {
  state: false,
  message: "",
  severity: "info",
};

const failureSnack = {
  state: true,
  message: "Something Went Wrong",
  severity: "error",
};

const ReceptionistDashboard = () => {
  const { state: _state } = useLocation();

  // const [patientName, setPatientName] = useState("");
  const [doctors] = useState(_state["doctors"]);
  const [healthID, setHealthID] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [address, setAddress] = useState("");
  // const [pincode, setPincode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [doctor, setDoctor] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const [snackState, setSnackState] = useState(emptySnack);
  const [showDialog, setShowDialog] = useState(false);
  const [citizen, setCitizen] = useState(null);

  const handleStateChange = (e) => {
    setState(e.target.value);

    setCity("");
    setDistrict("");
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
    // setPincode("");
    setContactNo("");
    setState("");
    setDistrict("");
    setCity("");
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

  const handleSubmitMiddleWare = async (e) => {
    e.preventDefault();

    fetch(baseURL + endPoints["RECEPTION_PATIENT_CNFRM"] + healthID, {
      method: "GET",
      headers: new Headers({
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 401) removeToken();
        throw res;
      })
      .then((data) => {
        // data = JSON.parse(decryptString(data));

        setCitizen({
          ...data[0],
          state,
          district,
          city,
          street1: address,
          pincode: cityWisePincode[city],
          mobileNo: contactNo,
        });

        setShowDialog(true);
      })
      .catch((e) => {
        if (e["status"] === 404) alert(alertMsg["STATUS_404"]);
        else alert(alertMsg["SOMETHING_WENT_WRONG"]);
        console.error(e);
      });
  };

  const handleSubmit = (e) => {
    // fetch patient details to confirm

    e.preventDefault();
    let obj = {};
    obj["street1"] = address;
    obj["citizen"] = { uhId: healthID };
    obj["city"] = city;
    obj["state"] = state;
    obj["district"] = district;
    obj["mobileNo"] = contactNo;
    obj["pincode"] = cityWisePincode[city];
    obj["doctor"] = { loginId: doctor };

    const healthRecord = JSON.stringify(obj);
    fetch(baseURL + endPoints["RECEPTION_CREATE_HR"], {
      body: healthRecord,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token") &&
          localStorage.getItem("token").toString(),
      },
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 401) removeToken();
        throw new Error(res);
      })
      .then((data) => {
        setSnackState(successSnack);
      })
      .catch((e) => {
        setSnackState(failureSnack);
        console.error(e);
      })
      .finally(() => {
        setShowDialog(false);
        clearTheForm();
        setTimeout(() => setSnackState(emptySnack), 4000);
      });
  };

  // const handlePinCodeChange = (e) => {
  //   setPincode(e.target.value);
  // };

  return (
    <div className="reception" style={{ position: "relative" }}>
      {showDialog && (
        <PatientDetailDialog
          citizen={citizen}
          closeModal={setShowDialog}
          handler={handleSubmit}
        />
      )}
      <NavBar showBackButton={false} />
      <CustomizedSnackbars
        {...snackState}
        // state={snackState > 0}
        // message={
        //   snackState > 0 && snackState === 1
        //     ? "record created"
        //     : "something went wrong"
        // }
        // severity={snackState > 0 && snackState === 1 ? "success" : "error"}
      />
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
          onSubmit={handleSubmitMiddleWare}
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
              {[
                <option value={""} key={0}>
                  Select State
                </option>,
              ].concat(
                STATES.map((s, id) => {
                  return (
                    <option key={id + 1} value={s}>
                      {s}
                    </option>
                  );
                })
              )}
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="district">District : </label>
            <select
              style={{ width: "15vw", padding: "10px", borderRadius: "9px" }}
              placeholder=""
              name="district"
              value={district}
              required
              onChange={(e) => {
                setDistrict(e.target.value);
                if (district === "") setCity("");
              }}
            >
              {[
                <option value={""} key={0}>
                  Select District
                </option>,
              ].concat(
                state !== "" &&
                  STATETODISTRICT[state].map((s, id) => {
                    return (
                      <option key={id + 1} value={s}>
                        {s}
                      </option>
                    );
                  })
              )}
            </select>
          </div>

          <div className="form-item">
            <label htmlFor="city">City : </label>
            <select
              style={{ width: "15vw", padding: "10px", borderRadius: "9px" }}
              placeholder=""
              name="city"
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value);
                //if (district === "") setCity("");
              }}
            >
              {[
                <option value={""} key={0}>
                  Select City
                </option>,
              ].concat(
                district !== "" &&
                  DISTRICTTOTALUKA[district].map((s, id) => {
                    return (
                      <option key={id + 1} value={s}>
                        {s}
                      </option>
                    );
                  })
              )}
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
          {/* <div className="form-item">
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
          </div> */}

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
              value={doctor}
              onChange={handleDoctorChange}
              required
            >
              {[
                <option key="-1" value={""}>
                  Select Doctor
                </option>,
              ].concat(
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
