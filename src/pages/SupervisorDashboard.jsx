import React from "react";
import NavBar from "../component/Navbar";
import styled from "@emotion/styled";
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

const SupervisorDashboard = () => {
  const navigation = useNavigate();

  return (
    <>
      <NavBar showBackButton={false} />
      <Container>
        <Card
          onClick={(e) => {
            navigation(routes.AssignFWH);
          }}
        >
          <div style={{}}>FHW Assignment</div>
        </Card>
        <Card onClick={(e) => navigation(routes.ReassignPatient)}>
          <div>Reassign Patients</div>
        </Card>
        <Card onClick={(e) => navigation(routes.FHWAnalytics)}>
          <div>FHW Analytics</div>
        </Card>
      </Container>
    </>
  );
};
export default SupervisorDashboard;
