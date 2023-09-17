import React, { useState } from "react";
import { AiFillHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidLogOut } from "react-icons/bi";
import { activeUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  let [url, setUrl] = useState();
  let userInfo = useSelector((state) => state.activeUser.value);
  let dispatch = useDispatch();
  const auth = getAuth();
  let navigate = useNavigate();
  let handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(activeUser(null));
      localStorage.removeItem("user");
      navigate("/login");
    });
  };

  return (
    <div className="sidebar">
      <img className="sidebar__img" src={userInfo.photoURL} alt="" />
      <h3> {userInfo.displayName} </h3>
      <ul>
        <li
          onClick={() => setUrl("home")}
          className={url == "home" && "active"}
        >
          <Link to="/home">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li
          onClick={() => setUrl("message")}
          className={url == "message" && "active"}
        >
          <Link to="/message">
            <AiFillMessage className="icon" />
          </Link>
        </li>
        <li
          onClick={() => setUrl("notification")}
          className={url == "notification" && "active"}
        >
          <Link to="/notification">
            <IoMdNotifications className="icon" />
          </Link>
        </li>
        <li>
          <Link to="#">
            <AiFillSetting className="icon" />
          </Link>
        </li>
        <li>
          <BiSolidLogOut onClick={handleLogOut} className="icon" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
