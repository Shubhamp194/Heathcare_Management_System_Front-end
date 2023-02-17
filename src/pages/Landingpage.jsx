import React from "react";
import RoleCard from "../component/RoleCard";
import styled from "@emotion/styled";
import { roles } from "../constans";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "32vh 20vw",
  gap: "50px",
}));

const LandingPage = () => {
  return (
    <Container className="roleCardContainer">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role.name} />
      ))}
    </Container>
  );
};

export default LandingPage;
