import TextField from "@mui/material/TextField";
const Input = ({ label, variant, className }) => {
  return <TextField className={className} label={label} variant={variant} />;
};

export default Input;
