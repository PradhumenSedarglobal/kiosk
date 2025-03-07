import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CircularProgress = styled(MuiCircularProgress)(() => ({
  marginLeft: 10,
}));

const SubmitButton = ({
  title,
  loading,
  size,
  variant,
  disabled = false,
  fullWidth,
  buttonSx = () => {},
  fontWeight,
  className,
  type,
  onClick,
  // maxWidth = "300px",
}) => (
  <Button
    fullWidth={fullWidth}
    disabled={disabled}
    variant={variant}
    type={type ? type : "submit"}
    size={size}
    className={className}
    onClick={onClick}
    sx={(theme) => ({
      "&.MuiButton-root": {
        borderRadius: "0px",
        color: "common.black",
        ...theme.typography.typography15,
        fontFamily: `${theme.fontFaces.helveticaNeueBold} !important`,
        ...(fontWeight && { fontWeight: `${fontWeight}!important` }),
        padding: "1rem 5px!important",
        maxWidth: {
          lg: "300px!important",
          md: "300px!important",
          sm: "300px!important",
          xs: "500px!important",
          xxs: "500px!important",
        },
        background: (theme) => theme.palette.primary.light,
        ":hover": {
          background: (theme) => `${theme.palette.warning.dark}`,
          backgroundColor: (theme) => theme.palette.primary.light,
        },
        "&.Mui-disabled": {
          background: (theme) => alpha(theme.palette.primary.lighter, 0.65),
          fontFamily: `${theme.fontFaces.helveticaNeueBold} !important`,
        },
      },
      ...buttonSx(theme),
      fontFamily: `${theme.fontFaces.helveticaNeueBold} !important`,
    })}
  >
    {title}
    {loading && <CircularProgress color="inherit" size={20} />}
  </Button>
);

SubmitButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};

export default SubmitButton;
