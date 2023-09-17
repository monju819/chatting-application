import React, { useEffect, useState } from "react";
import groupimg from "../assets/group-img.png";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
const Userlist = () => {
  let [userslist, setUserslist] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);
  console.log(userInfo);
  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserslist(arr);
    });
  }, []);

  let handleFriendRequest = (info) => {
    set(push(ref(db, "friendrequest")), {
      whosendname: userInfo.displayName,
      whosendid: userInfo.uid,
      whoreceivedname: info.username,
      whoreceivedid: info.userid,
    });
  };

  return (
    <div className="box">
      <h3>User List</h3>
      {userslist.map((item) => (
        <div className="list">
          <img src={groupimg} />
          <h4>{item.username}</h4>
          <Button onClick={() => handleFriendRequest(item)} variant="contained">
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Userlist;
