import React from "react";
import { Link } from "react-router-dom";
import routes from "../Router/routes";

const NavBar = () => {
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <ul
        style={{
          margin: "0px",
          padding: "15px",
        }}
      >
        <Link
          to={routes.LandingPage}
          className="nav-item"
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "1.25rem",
            textDecoration: "none",
            backgroundColor: "gray",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Logout
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
