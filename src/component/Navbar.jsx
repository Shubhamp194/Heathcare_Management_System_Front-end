import React from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../Router/routes";

const NavBar = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  let buttonStyle = {
    margin: "0px",
    padding: "15px",
    display: "flex",
    justifyContent: showBackButton ? "space-between" : "end",
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0px",
        left: "0px",
      }}
    >
      <ul style={buttonStyle}>
        {showBackButton && (
          <div
            style={{
              display: "inline",
              color: "black",
              fontWeight: "bold",
              fontSize: "1.25rem",
              textDecoration: "none",
              backgroundColor: "gray",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (navigate.length > 1) navigate(-1);
            }}
          >
            back
          </div>
        )}
        <div
          style={{
            display: "inline",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.25rem",
            textDecoration: "none",
            backgroundColor: "gray",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            navigate(routes.LandingPage, { replace: true });
          }}
        >
          Logout
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
