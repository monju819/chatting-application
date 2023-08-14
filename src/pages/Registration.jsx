import Grid from "@mui/system/Unstable_Grid";

import Heading from "../components/Heading";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Authentication from "../components/Authentication";
const Signup = styled(Button)({
  padding: "19px 0px",
  border: "1px solid",
  borderRadius: "86px",
  backgroundColor: "#5F35F5",
  marginTop: "56px",
});

const Registration = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <div className="reg__left-side">
          <Heading />
          <div className="reg__input-conatiner">
            <Input
              className="reg__input"
              label="Email Address"
              variant="outlined"
            />
            <Input
              className="reg__input"
              label="Full name"
              variant="outlined"
            />
            <Input className="reg__input" label="Password" variant="outlined" />
            <CustomButton bName={Signup} title="Sign up" />
            <Authentication />
          </div>
        </div>
      </Grid>
      <Grid xs={6}>
        <img
          className="reg__img"
          src="assets/pexels-armin-rimoldi-5553946 2.png"
        />
      </Grid>
    </Grid>
  );
};

export default Registration;
