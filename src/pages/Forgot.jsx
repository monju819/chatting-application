import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
  let [email, setEmail] = useState("");
  const auth = getAuth();
  let navigate = useNavigate();

  let handleForgot = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Password Reset Link send");

        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("user")) {
          toast(" Plase Enter your Register Email");
        }
      });
  };

  return (
    <>
      <div className="forgot__container">
        <div className="forgot__box">
          <h3 className="forgot__text">Forgot Password</h3>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className="forgot__btn"
            id="standard-basic"
            label="email"
            variant="standard"
          />
          <br />
          <Button onClick={handleForgot} variant="outlined">
            Click Here
          </Button>
        </div>
      </div>
    </>
  );
};

export default Forgot;
