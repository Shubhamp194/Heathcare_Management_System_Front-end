import React, { useState } from "react";
import routes from "../Router/routes";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constans";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [OTP, setOTP] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGetOTP = (id) => {
    fetch(baseURL + "/blackbox/getOtp?loginId=" + id, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          setStage(2);
          return;
        }
        throw res;
      })
      .catch((e) => console.error(e));
  };

  const handleValidateOTP = (otp, loginId) => {
    const bodyObj = { loginId, otp };

    fetch(baseURL + "/blackbox/validateOtp", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          res.headers.has("secret") &&
            localStorage.setItem(
              "secret",
              res.headers.get("secret").toString()
            );
          setStage(3);
          return;
        }

        if (res.status === 401) {
          alert("invalid otp");
          setStage(1);
          return;
        }

        throw res;
      })
      .catch((e) => console.error(e));
  };

  const handleSetNewPassword = (loginId, password) => {
    const bodyObj = { loginId, password };

    fetch(baseURL + "/blackbox/resetPassword", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        secret: localStorage.getItem("secret").toString(),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("secret");
          navigate(routes.LoginPage, { replace: true });
        }
        throw res;
      })
      .catch((e) => console.error(e));
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "-30px",
      }}
    >
      {stage === 1 ? (
        <div
          className="otpCardContainer"
          style={{
            width: "30vw",
            minHeight: "45vh",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",

            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "25px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "50px",
            }}
          >
            Forgot Password
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGetOTP(username);
            }}
          >
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                marginLeft: "25%",
                marginTop: "10%",
                width: "50%",
                padding: "5%",
                display: "block",
                borderRadius: "10px",
                border: "1px solid",
                cursor: "pointer",
              }}
            >
              Get OTP
            </button>
            <button
              style={{
                marginLeft: "37%",
                marginTop: "5%",
                width: "25%",
                padding: "2%",
                display: "block",
                borderRadius: "15px",
                border: "1px solid",
                cursor: "pointer",
              }}
              onClick={(e) => navigate(routes.LoginPage, { replace: true })}
            >
              back
            </button>
          </form>
        </div>
      ) : stage === 2 ? (
        <div
          className="validateOtpCardContainer"
          style={{
            width: "30vw",
            height: "45vh",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "25px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "50px",
            }}
          >
            Forgot Password
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleValidateOTP(OTP, username);
            }}
            style={{}}
          >
            <input
              type="text"
              placeholder="Enter username"
              required
              value={username}
              disabled
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Enter OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                marginLeft: "25%",
                marginTop: "10%",
                width: "50%",
                padding: "3%",
                display: "block",
                borderRadius: "10px",
                border: "1px solid",
                cursor: "pointer",
              }}
            >
              Validate OTP
            </button>
            <button
              style={{
                marginLeft: "37%",
                marginTop: "5%",
                width: "25%",
                padding: "2%",
                display: "block",
                borderRadius: "15px",
                border: "1px solid",
                cursor: "pointer",
              }}
              onClick={(e) => setStage(1)}
            >
              back
            </button>
          </form>
        </div>
      ) : (
        <div
          className="resetPasswordContainer"
          style={{
            width: "30vw",
            minHeight: "45vh",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "25px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "50px",
            }}
          >
            Forgot Password
          </span>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (password !== confirmPassword) {
                alert("Password and confirm password are different");
                setPassword("");
                setConfirmPassword("");
                return;
              }

              handleSetNewPassword(username, password);
            }}
            style={{}}
          >
            <input type="text" required value={username} disabled />
            <br />
            <br />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              style={{
                marginLeft: "25%",
                marginTop: "10%",
                width: "50%",
                padding: "3%",
                display: "block",
                borderRadius: "10px",
                border: "1px solid",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
    /*<div>
      {stage === 1 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginTop: "-30px",
          }}
          className="mainContainer"
        >
          <GetOTPCard setStage={setStage} setState={setState} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginTop: "-30px",
          }}
          className="mainContainer"
        >
          <ResetPasswordScreen setStage={setStage} setState={setState} />
        </div>
      )}
    </div>*/
  );
};

export default ForgotPassword;
