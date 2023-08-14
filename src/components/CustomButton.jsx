import React from "react";

const CustomButton = (props) => {
  return (
    <props.bName variant="contained" disableRipple>
      {props.title}
    </props.bName>
  );
};

export default CustomButton;
