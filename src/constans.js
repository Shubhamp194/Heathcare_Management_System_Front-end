const roles = [
  { id: 0, name: "Receptionist" },
  { id: 1, name: "Doctor" },
  { id: 2, name: "Supervisor" },
];

const oneDayInMillis = 86400000;

const baseURL = "http://172.16.201.120:8081";

const endPoints = {
  LOGIN: "/common/login",
  RECEPTION_CREATE_HR: "/receptionist/createHealthRecord",
  RECEPTION_PATIENT_CNFRM: "/receptionist/confirmation?uhId=",
  SUPERVISOR_PATIENT_REASSIGN: "/supervisor/reassign",
  SUPERVISOR_GET_FHW: "/supervisor/getFhws?loginId=",
  SUPERVISOR_ASSIGN_NEW_FHW: "/supervisor/submitAssignment",
  SUPERVISOR_LIST_OF_UNASSIGNED_PATIENT:
    "/supervisor/getUnassignedCitizens?loginId=",
  DOCTOR_SUBMIT_HR: "/doctor/submitHealthRecord",
  DOCTOR_GET_CONSENTED_DATA: "/doctor/getConsentData?uhId=",
  DOCTOR_OPD_CASES: "/doctor/getNewHealthRecords?loginId=",
  DOCTOR_FETCH_PAST_PATIENTS_HRS: "/doctor/getOldHealthRecords?loginId=",
  GET_OTP: "/blackbox/getOtp?loginId=",
  VALIDATE_OTP: "/blackbox/validateOtp",
  RESET_PASSWORD: "/blackbox/resetPassword",
  AUTHENTICATE: "/common/authenticate", //send auth token in req
};

export { endPoints, oneDayInMillis, roles, baseURL };
