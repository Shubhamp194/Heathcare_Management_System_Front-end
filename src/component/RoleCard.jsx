import React from "react";
import { baseURL, roles } from "../constans";
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
  // const history = useHistory();

  const handleClick = () => {
    /*debugger;
    let data = localStorage.getItem("user");
    let user = data && JSON.parse(data);
    let loginId = user && user["loginId"].substr(0, 3);
    let flag = loginId === "REC" || loginId === "SUP" || loginId === "DOC";
    let doctors = JSON.parse(localStorage.getItem("doctors"));
    if (!data || !flag) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate(routes.LoginPage);
    }

    if (localStorage.getItem("token")) {
      fetch(baseURL + "/common/authenticate", {
        method: "GET",
        headers: { authorization: localStorage.getItem("token") },
      })
        .then((res) => {
          debugger;
          if (res.status === 200) {
            if (loginId === "REC") {
              navigate(routes.ReceptionistDashboard, {
                state: { doctors },
                replace: true,
              });
            } else if (loginId === "DOC") {
              navigate(routes.DoctorDashboard, { replace: true });
            } else if (loginId === "SUP") {
              navigate(routes.SupervisorDashboard, { replace: true });
            } else navigate(routes.LoginPage);
            return;
          }
          throw res;
        })
        .catch((e) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate(routes.LoginPage);
        });
    }
*/
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(routes.LoginPage);

    // without authenticaction as of now
    // if (role === roles[0].name) {
    //   navigate(routes.ReceptionistDashboard, { replace: true });
    // } else if (role === roles[1].name) {
    //   navigate(routes.DoctorDashboard, { replace: true });
    // }
  };

  return (
    <Card className="roleCard" onClick={handleClick}>
      <h1 style={{ margin: "0" }}>{role}</h1>
    </Card>
  );
};

export default RoleCard;
