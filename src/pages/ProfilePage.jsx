import React, { useEffect, useState, useContext } from "react";
import ProfileCard from "../component/ProfileCard";
import NavBar from "../component/Navbar";
import {
  doctorData,
  receptionistData,
  supervisorData,
} from "../utils/profile_data";

import { UserContext } from "../contexts/UserContext";

function ProfilePage() {
  const data = doctorData[0];
  // const { user: data } = useContext(UserContext);

  const id = data.loginId.substring(0, 3);

  let calRole = "Supervisor";
  let imgUrl =
    "https://previews.123rf.com/images/jemastock/jemastock1802/jemastock180210289/96190857-worker-man-supervisor-board-icon-vector-illustration-graphic-design.jpg";
  if (id === "DOC") {
    calRole = "Doctor";
    imgUrl =
      "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000";
  } else if (id === "REC") {
    calRole = "Receptionist";
    imgUrl =
      "https://st2.depositphotos.com/3126965/5325/v/600/depositphotos_53251139-stock-illustration-female-receptionist-is-taking-a.jpg";
  }

  return (
    <div>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>Profile </h1>
      <ProfileCard imgUrl={imgUrl} role={calRole} data={data} />
    </div>
  );
}

export default ProfilePage;
