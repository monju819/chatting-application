import React, { useState } from "react";
import bg from "../assets/registration.png";
import Image from "../components/Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
const Registration = () => {
  const auth = getAuth();

  // let [fullName,setFullName]=useState("")
  // let [email,setEmail]=useState("")
  // let [password,setPassword]=useState("")

  let [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  let [emailError, setemailError] = useState("");
  let [fullnameError, setFullnameError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  let [open, setOpen] = useState(false);

  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // setemailError("");
    // setFullnameError("");
    // setPasswordError("");
    if (e.target.name == "fullname") {
      setFullnameError("");
    }
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
    if (!formData.fullname) {
      setFullnameError("FullName Required");
    }
    if (!formData.password) {
      setPasswordError("Password Required");
    }

    if (formData.email && formData.fullname && formData.password) {
      let pattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(formData.email)) {
        setemailError("invalid Email");
      }
      if (formData.fullname.trim().length === 0) {
        setFullnameError("Please enter a valid name ");
      }
      if (!re.test(formData.password)) {
        setPasswordError("invaild Password");
      }
    }
  };

  // createUserWithEmailAndPassword(auth, email, password)

  return (
    <div className="registration">
      <div className="reg__left">
        <div className="reg__text-container">
          <h1>Get started with easily register</h1>
          <p>Free register and you can enjoy it</p>

          <TextField
            onChange={handleChange}
            className="reg__input"
            name="fullname"
            type="text"
            label="Ful name"
            variant="outlined"
          />
          {fullnameError && (
            <Alert className="error" variant="outlined" severity="error">
              {fullnameError}
            </Alert>
          )}

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
            Sign up
          </Button>
          <div className="link__container">
            <p>
              <span className="link__text"> Already have an account ? </span>

              <Link to="/login" className="signup__link">
                Sign In
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

export default Registration;
