import React from "react";
import { doctorData, supervisorData } from "../utils/profile_data";

function ProfileCard(props) {
  const cardStyle = {
    height: "500px",
    width: "600px",
    border: "2px solid black",
    margin: "auto",
  };

  const detailStyle = {
    margin: "50px",
  };

  const { data, role, imgUrl } = props;
  const showHospital = role === "Supervisor" ? false : true;

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: "center" }}>
        {data.citizen.fname} {data.citizen.lname}
      </h2>
      <div style={detailStyle}>
        <h3>Role : {role}</h3>
        <hr style={{ border: "1px solid black", marginRight: "300px" }} />
        <p>First Name : {data.citizen.fname}</p>
        <p>Last Name : {data.citizen.lname}</p>
        <p>Username : {data.loginId}</p>
        <p>Gender : {data.citizen.gender}</p>
        <p>D.O.B : {data.citizen.dob}</p>
        {showHospital && <p>Hospital : {data.hospital.name}</p>}
      </div>
      <div
        style={{
          border: "2px solid black",
          height: "200px",
          width: "200px",
          position: "absolute",
          top: "38%",
          left: "50%",
        }}
        className="image"
      >
        <img src={imgUrl} style={{ height: "100%" }} alt={role} />
      </div>
    </div>
  );
}

export default ProfileCard;
