export const getTodaysDateInYYYYMMDDFormatSeperateByhyphen = () => {
  let date = new Date().toLocaleString().split(",")[0].split("/");
  return date[2] + "-" + date[1] + "-" + date[0];
};

export const calculate_age = (dob) => {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};
