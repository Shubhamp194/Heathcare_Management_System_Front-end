import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { baseURL } from "../constans";
import routes from "../Router/routes";

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

  const { setUser } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  // const { state } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = JSON.stringify({ loginId: userName, password });

    fetch(baseURL + "/common/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: obj,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((data) => {
        let _user = data[0];
        let { loginId: role } = data[0];
        role = role.substring(0, 3);
        let doctors = role === "REC" ? data[1] : [];

        setUser(_user);

        if (role === "REC") {
          navigate(routes.ReceptionistDashboard, {
            state: { doctors },
            replace: true,
          });
        } else if (role === "DOC") {
          navigate(routes.DoctorDashboard, { replace: true });
        } else {
          // navigate(routes.SupervisorDashboard)
        }
      })
      .catch((e) => {
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
      {/* <NavBar showBackButton={true} /> */}
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
        {/* <a
          style={{ marginLeft: "23%" }}
          href="https://www.google.com"
          target="_blank"
          rel="noreferrer"
        >
          Forgot Password
        </a> */}
        {/* <div className="form-item">
          <label htmlFor="Username">Username</label>
          <input
            variant="standard"
            placeholder="Username"
            type={"text"}
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <br />
        <input
          variant="standard"
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <i></i>
         */}
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
