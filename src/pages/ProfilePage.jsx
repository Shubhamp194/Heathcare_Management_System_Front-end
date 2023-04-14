import React, { useEffect, useState } from "react";
import ProfileCard from "../component/ProfileCard";
import NavBar from "../component/Navbar";
import {
  doctorData,
  receptionistData,
  supervisorData,
} from "../utils/profile_data";

function ProfilePage() {
  // const [dataFromApi, setDataFromApi] = useState({});

  // useEffect(() => {}, []);

  const data = doctorData[0];

  const id = data.loginId.substring(0, 3);

  let calRole = "Supervisor";
  if (id === "DOC") calRole = "Doctor";
  else if (id === "REC") calRole = "Receptionist";

  return (
    <div>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>Profile </h1>
      <ProfileCard role={calRole} data={data} />
    </div>
  );
}

export default ProfilePage;
