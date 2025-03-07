import Button from "@mui/material/Button";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CircularProgress = styled(MuiCircularProgress)(() => ({
  marginLeft: 10,
}));

const CustomButton = ({
  title = "",
  loading = "",
  variant = "",
  color = "",
  onClick = () => {},
  disabled = false,
}) => (
  <Button
    disabled={disabled}
    color={color}
    variant={variant}
    type="button"
    onClick={onClick}
  >
    {title}
    {loading && <CircularProgress color="inherit" size={20} />}
  </Button>
);

CustomButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.any,
};

export default CustomButton;
