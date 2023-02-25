const validateReceptionForm = ({
  name,
  uhaid,
  address,
  pincode,
  contactNo,
  doctorId,
}) => {
  let errors = {};

  if (!name.trim()) {
    errors.name = "Patient Name Required";
  } else if (!/[A-za-z]+/.test(name))
    errors.name = "Only Aplhabest allowed in name";

  if (!uhaid.trim()) {
    errors.name = "HealthID Required";
  } else if (!/[0-9]+/.test(uhaid))
    errors.name = "Only Numbers allowed in healthID";

  if (!address.trim()) {
    errors.name = "Address Required";
  } else if (!/[A-za-z0-9]+/.test(name))
    errors.name = "Only Aplhabest allowed in name";

  return errors;
};
