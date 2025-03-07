import { styled } from "@mui/material/styles";
import MuiFormControl from "@mui/material/FormControl";

const FormControl = styled(MuiFormControl, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})(({ theme, fullWidth }) => ({
  marginBottom: 10,
  width: "100%",
  ...(!fullWidth && {
    width: "50%",
    paddingLeft: 5,
    paddingRight: 5,
  }),
}));

export default FormControl;
