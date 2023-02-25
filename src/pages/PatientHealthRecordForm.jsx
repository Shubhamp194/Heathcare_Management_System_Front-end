import React from "react";
import { useLocation } from "react-router-dom";

const PatientHealthRecordForm = () => {
  const { state } = useLocation();

  alert(state.patient.data);

  return <p>patient health record</p>;
};

export default PatientHealthRecordForm;
