export const getTodaysDateInYYYYMMDDFormatSeperateByhyphen = () => {
  let date = new Date().toLocaleString().split(",")[0].split("/");
  return date[2] + "-" + date[1] + "-" + date[0];
};

export const calculate_age = (dob) => {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const vitals = [
  "Blood Sugar",
  "Blood Oxygen",
  "Skin Color",
  "Eye Color",
  "Temperature",
  "Inflammation",
];

export const STATES = ["Karnataka"];

export const STATETODISTRICT = {
  Karnataka: ["Bangalore", "Mysore", "Hassan"],
  Gujarat: ["Ahmedabad", "Anand", "Navsari"],
};

export const DISTRICTTOTALUKA = {
  Ahmedabad: ["Ahmedabad", "Ambli", "Bagodara", "Bamsara", "Chaloda"],
  Anand: ["Amrol", "Anand", "Bhalej", "Daheda", "Chikhodra"],
  Navsari: ["Navsari", "Chhapra", "Amalsad", "Asna", "Bilimora"],
  Bangalore: [
    "Bangalore",
    "Bannerghatta",
    "Chickpet",
    "Devasandra",
    "Electronics City",
  ],
  Mysore: ["Anandur", "Badanavalu", "Chikkanerale", "Mysore", "Mundur"],
  Hassan: ["Adagur", "Anekannambadi", "Basavanahalli", "Chilkur", "Hassan"],
};

export const cityWisePincode = {
  Bangalore: 560001,
  Bannerghatta: 560083,
  Chickpet: 560053,
  Devasandra: 560036,
  "Electronics City": 560100,
  Adagur: 573121,
  Anekannambadi: 573210,
  Basavanahalli: 573136,
  Chilkur: 573216,
  Hassan: 573201,
  Anandur: 571130,
  Badanavalu: 571312,
  Chikkanerale: 571102,
  Mysore: 570001,
  Mundur: 571604,
  Ahmedabad: 380001,
  Ambli: 382463,
  Bagodara: 382230,
  Bamsara: 382240,
  Chaloda: 382260,
  Amrol: 388307,
  Anand: 388001,
  Bhalej: 388205,
  Daheda: 388620,
  Chikhodra: 388320,
  Navsari: 396445,
  Chhapra: 396445,
  Amalsad: 396310,
  Asna: 396415,
  Bilimora: 396321,
};
