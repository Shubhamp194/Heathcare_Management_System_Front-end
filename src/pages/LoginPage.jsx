import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { alertMsg, baseURL, endPoints } from "../constans";
import routes from "../Router/routes";
import { removeToken } from "../utils/utility";

const LoginForm = styled("form")(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  width: "500px",
  height: "450px",
  display: "flex",
  boxShadow: "1.25px 1.25px 5px 2px rgba(0,0,0,0.24)",
  borderRadius: "15px",
  gap: "15px",
  flexDirection: "column",
  alignContent: "center",
  flexWrap: "wrap",
}));

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const LoginPage = () => {
  const navigate = useNavigate();

  const { setUser, setGlobalLoader } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  // const { state } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let username = userName;

    if (username.toLowerCase().indexOf("fhw") !== -1) {
      alert(alertMsg["INVALID_ID_PWD"]);
      return;
    }

    const obj = JSON.stringify({ loginId: userName, password });

    fetch(baseURL + endPoints["LOGIN"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: obj,
    })
      .then((res) => {
        if (res.status === 200) {
          let token = res.headers.get("token");
          localStorage.setItem("token", "Bearer " + token);
          return res.json();
        } else if (res.status === 401) removeToken();
        throw res;
      })
      .then((data) => {
        let _user = data[0];
        let { loginId: role } = data[0];
        role = role.substring(0, 3);
        let doctors = role === "REC" ? data[1] : [];
        // localStorage.setItem("doctors", JSON.stringify(doctors));
        setGlobalLoader(false);
        localStorage.setItem("user", JSON.stringify(_user));
        setUser(_user);
        if (role === "REC") {
          navigate(routes.ReceptionistDashboard, {
            state: { doctors },
            replace: true,
          });
        } else if (role === "DOC") {
          navigate(routes.DoctorDashboard, { replace: true });
        } else {
          navigate(routes.SupervisorDashboard, { replace: true });
        }
      })
      .catch((e) => {
        if (e["status"] === 401) alert(alertMsg["INVALID_ID_PWD"]);
        else alert(alertMsg["SOMETHING_WENT_WRONG"]);
        console.error(e);
      });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return loading ? (
    <div>{"loading..."}</div>
  ) : (
    <Container>
      <h1>Login</h1>

      <LoginForm className="loginForm" onSubmit={handleSubmit}>
        <div style={{ marginTop: "20%" }}>
          <label htmlFor="username" style={{ fontWeight: "bold" }}>
            Username : &nbsp;&nbsp;
          </label>
          <input
            type="text"
            name="username"
            value={userName}
            onChange={handleUserNameChange}
            required
            placeholder="Username"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password : &nbsp;&nbsp;
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
          />
        </div>
        <Button
          variant="outlined"
          style={{ width: "30%", marginLeft: "20%", marginTop: "5%" }}
          type="submit"
        >
          Login
        </Button>
        <Link
          style={{ marginLeft: "23%", marginTop: "5%" }}
          to={routes.ForgotPassword}
        >
          Forgot Password?
        </Link>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
