import React, { useState } from "react";
import bg from "../assets/registration.png";
import Image from "../components/Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Alert from "@mui/material/Alert";
const Login = () => {
  let [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  let [emailError, setemailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);

  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "email") {
      setemailError("");
    }
    if (e.target.name == "password") {
      setPasswordError("");
    }
  };

  let handleRegistration = () => {
    if (!formData.email) {
      setemailError("Email Required");
    }

    if (!formData.password) {
      setPasswordError("Password Required");
    }

    if (formData.email && formData.password) {
      let pattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(formData.email)) {
        setemailError("invalid Email");
      }

      if (!re.test(formData.password)) {
        setPasswordError("invaild Password");
      }
    }
  };

  return (
    <div className="registration">
      <div className="reg__left">
        <div className="reg__text-container">
          <h1>Get started with easily register</h1>
          <p>Free register and you can enjoy it</p>
          <TextField
            onChange={handleChange}
            className="reg__input"
            name="email"
            type="email"
            label="Email Address"
            variant="outlined"
          />
          {emailError && (
            <Alert className="error" variant="outlined" severity="error">
              {emailError}
            </Alert>
          )}

          <div>
            <TextField
              onChange={handleChange}
              className="reg__input"
              name="password"
              type={open ? "text" : "password"}
              label="Password"
              variant="outlined"
            />

            {open ? (
              <AiFillEye onClick={() => setOpen(false)} className="eye" />
            ) : (
              <AiTwotoneEyeInvisible
                onClick={() => setOpen(true)}
                className="eye"
              />
            )}
          </div>
          {passwordError && (
            <Alert className="error" variant="outlined" severity="error">
              {passwordError}
            </Alert>
          )}
          <Button
            onClick={handleRegistration}
            className="reg__button"
            variant="contained"
          >
            Login to Continue
          </Button>
          <div className="link__container">
            <p>
              <span className="link__text"> Don’t have an account ? </span>

              <Link to="/" className="signup__link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="reg__right">
        <Image src={bg} className="reg__img" />
      </div>
    </div>
  );
};

export default Login;
