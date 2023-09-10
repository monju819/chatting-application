import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { activeUser } from "../slices/userSlice";
const Home = () => {
  const auth = getAuth();

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  let handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(activeUser(null));
      localStorage.removeItem("user");
      navigate("/login");
    });
  };
  return (
    <Button onClick={handleLogOut} variant="contained">
      LogOut
    </Button>
  );
};

export default Home;
