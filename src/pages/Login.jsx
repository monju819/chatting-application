import { useState, useEffect } from "react";
import bg from "../assets/registration.png";
import Image from "../components/Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import google from "../assets/Google.png";
import { activeUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, set, push } from "firebase/database";
const Login = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  let dispatch = useDispatch();

  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  }, []);

  const provider = new GoogleAuthProvider();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [emailError, setemailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);

  let [load, setLoad] = useState(false);

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

  let handleLogIn = () => {
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

      setLoad(true);
      signInWithEmailAndPassword(auth, formData.email, formData.password).then(
        (user) => {
          // if (user.user.emailVerified) {

          navigate("/home");
          dispatch(activeUser(user.user));
          localStorage.setItem("user", JSON.stringify(user.user));

          // }
          // else {
          //   // setemailError("please verify your email");
          //   toast("please verify your email ");
          // }
        }
      );
    }
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((user) => {
      navigate("/home");
      dispatch(activeUser(user.user));
      localStorage.setItem("user", JSON.stringify(user.user));

      // console.log("google", user.user.displayName);
      set(push(ref(db, "users/")), {
        username: user.user.displayName,
        email: user.user.email,
        profile_picture: user.user.photoURL,
      });
    });
  };

  return (
    <div className="registration">
      <div className="reg__left">
        <div className="reg__text-container">
          <h1>Get started with easily register</h1>
          <p>Free register and you can enjoy it</p>
          <Image src={google} onClick={handleGoogle} />
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

          {load ? (
            <Button className="reg__button" variant="contained">
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </Button>
          ) : (
            <Button
              onClick={handleLogIn}
              className="reg__button"
              variant="contained"
            >
              Login to Continue
            </Button>
          )}

          <div className="link__container">
            <p className="link">
              <span className="link__text"> Don’t have an account ? </span>

              <Link to="/" className="signup__link">
                Sign up
              </Link>
            </p>
          </div>
          <div className="link__container">
            <p className="link">
              <span className="link__text"> Forgot Password ? </span>

              <Link to="/forgot" className="signup__link">
                Click Here
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
