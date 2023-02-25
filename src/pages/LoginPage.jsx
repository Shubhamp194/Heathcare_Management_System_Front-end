import styled from "@emotion/styled";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import NavBar from "../component/Navbar";

const LoginForm = styled("form")(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  width: "500px",
  height: "450px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  boxShadow: "1.25px 1.25px 5px 2px rgba(0,0,0,0.24)",
  borderRadius: "15px",
  gap: "25px",
  flexDirection: "column",
  // marginTop: "2rem",
}));

const Container = styled("div")(({ theme }) => ({
  width: "100vw",
  minHeign: "100vh",
  height: "100%",
  margin: "auto 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "20%",
}));

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(userName + "_" + password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <Container>
      {/* <NavBar showBackButton={true} /> */}
      <h1>Login {state && "As " + state.roleName}</h1>

      <LoginForm className="loginForm" onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          placeholder="Username"
          type={"text"}
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <br />
        <TextField
          variant="standard"
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <i></i>
        <SubmitButton variant="contained" type="submit">
          Login
        </SubmitButton>
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          Forgot Password ?
        </a>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
