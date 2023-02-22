export const getTodaysDateInYYYYMMDDFormatSeperateByhyphen = () => {
  let date = new Date().toLocaleString().split(",")[0].split("/");
  return date[2] + "-" + date[1] + "-" + date[0];
};
