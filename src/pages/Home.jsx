import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import GroupList from "../components/GroupList";
import Friendrequest from "../components/Friendrequest";
import Friends from "../components/Friends";
import Mygroups from "../components/Mygroups";
import Userlist from "../components/Userlist";
import Blockedusers from "../components/Blockedusers";
const Home = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <GroupList />
        <Friendrequest />
      </Grid>
      <Grid item xs={4}>
        <Friends />
        <Mygroups />
      </Grid>
      <Grid item xs={4}>
        <Userlist />
        <Blockedusers />
      </Grid>
    </Grid>
  );
};

export default Home;
