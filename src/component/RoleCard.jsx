import React from "react";

import styled from "@emotion/styled";
import routes from "../Router/routes";
import { useNavigate } from "react-router-dom";

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
}));

const RoleCard = ({ role }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.LoginPage);
  };

  return (
    <Card className="roleCard" onClick={handleClick}>
      <h1 style={{ margin: "0" }}>{role}</h1>
    </Card>
  );
};

export default RoleCard;
