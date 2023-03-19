export const getTodaysDateInYYYYMMDDFormatSeperateByhyphen = () => {
  let date = new Date().toLocaleString().split(",")[0].split("/");
  return date[2] + "-" + date[1] + "-" + date[0];
};

export const calculate_age = (dob) => {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export const vitals = [
  "Blood Sugar",
  "Blood Oxygen",
  "Skin Color",
  "Eye Color",
  "Temperature",
  "Inflammation",
];

export const data = {
  data: {
    id: 602,
    creationDate: "2023-03-14",
    creationTime: "14:37:33",
    currentStreet1: "IIITB",
    currentStreet2: null,
    currentCity: "Bangalore",
    currentState: "Karnataka",
    currentPincode: "560100",
    symptoms: null,
    bodyTemperature: null,
    pulseRate: null,
    respirationRate: null,
    bloodPressure: null,
    prescription: null,
    conclusion: null,
    doctor: {
      loginId: "DOC1",
      citizen: '{city: "Bangalore", dob: "1998-01-23", fieldHealthW…}',
      licenseId: "811966906",
      password: "DOC1",
      hospital: '{city: "Bengaluru", contactNo: "9123456789", id: 2,…}',
    },
    citizen: {
      id: 1,
      fname: "vikram",
      lname: "Rao",
      gender: "M",
      dob: "1998-01-23",
      street1: "303, Royal Palace",
      street2: "15 King Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560023",
      mobileNo: "9876543210",
      govId: "111122223333",
      fieldHealthWorker: null,
    },
    fieldHealthWorker: null,
    status: 0,
  },
};

export const state2 = {
  data: {
    hrId: 2,
    creationDate: "2023-03-17",
    creationTime: "12:12:08",
    fields: "Blood Pressure,Oxygen Level",
    fieldsValues: "120/80 mmHg, 70",
    conclusion: "Oxygen level is low",
    prescription: "Stay Hydrated",
    citizen: {
      uhId: 19,
      fname: "Priya",
      lname: "Gupta",
      gender: "F",
      dob: "1995-03-22",
    },
    followUps: [
      {
        dateOfFollowUp: "2023-18-23",
        instruction: "Measure Blood Pressure and Oxygen level",
        fields: "Blood Pressure,Oxygen Level",
      },
      {
        dateOfFollowUp: "2023-20-23",
        instruction: "Measure Blood Pressure and Oxygen level",
        fields: "Blood Pressure,Oxygen Level",
      },
      {
        dateOfFollowUp: "2023-22-23",
        instruction: "Measure Blood Pressure and Oxygen level",
        fields: "Blood Pressure,Oxygen Level",
      },
    ],
  },
};