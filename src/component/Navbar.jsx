import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import routes from "../Router/routes";

const NavBar = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  let buttonStyle = {
    margin: "0px",
    padding: "15px",
    display: "flex",
    justifyContent: showBackButton ? "space-between" : "end",
  };

  // const btnStyle =

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0px",
        left: "0px",
        zIndex: 1,
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
            marginRight: "2%",
          }}
          onClick={(e) => {
            // if (navigate.length > 1) navigate(-1);
            navigate(routes.ProfilePage, { replace: true });
            // console.log("Profile button clicked");
          }}
        >
          My Profile
        </div>

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
            localStorage.removeItem("token");
            setUser(null);
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
