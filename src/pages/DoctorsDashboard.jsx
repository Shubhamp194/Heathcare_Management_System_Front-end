import React from "react";
import { styled } from "@mui/system";
import NavBar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import routes from "../Router/routes";

const Card = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "20rem",
  height: "10rem",
  overflow: "auto",
  boxShadow: "0px 4px 6px 1px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
  alignContent: "center",
  display: "flex",
  flexWrap: "wrap",
  cursor: "pointer",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: "bold",
}));

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "50px",
  margin: "30vh 0vw ",
}));

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const gotoOPD = () => {
    navigate(routes.OPD);
  };
  const navigateToFollowUps = () => {
    navigate(routes.PastPatientHR);
  };

  return (
    <>
      <NavBar showBackButton={false} />
      <Container>
        <Card onClick={gotoOPD}>OPD</Card>
        <Card onClick={navigateToFollowUps}>Past follow up</Card>
      </Container>
    </>
  );
};

export default DoctorDashboard;
