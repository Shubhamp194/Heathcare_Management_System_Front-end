import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PatientHealthRecordForm = () => {
  const { state } = useLocation();

  const [patientData, setPatientData] = useState(state.data);
  const [citizenData, setCitizenData] = useState(state.data.citizen);
  return (
    <div>
      <p>Patient name : {citizenData.fname + " " + citizenData.lname}</p>
    </div>
  );
};

export default PatientHealthRecordForm;
