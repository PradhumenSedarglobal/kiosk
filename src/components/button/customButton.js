import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CircularProgress = styled(MuiCircularProgress)(() => ({
  marginLeft: 10,
}));

const MuiCustomButton = ({
  title = "",
  loading = false,
  variant = "",
  disabled = false,
  fullWidth,
  buttonSx = () => {},
  fontWeight,
  size,
  onClick,
  LinkComponent,
  ...rest
}) => (
  <Button
    {...rest}
    LinkComponent={LinkComponent}
    size={size}
    fullWidth={fullWidth}
    disabled={disabled}
    variant={variant}
    onClick={onClick}
    sx={(theme) => ({
      "&.MuiButton-root": {
        borderRadius: "0px",
        color: `${theme.palette.grey[4900]}!important`,
        ...theme.typography.typography16,
        fontFamily: theme.fontFaces.helveticaNeueMedium,
        fontWeight: `${fontWeight}!important`,
        padding: "1rem 100px!important",
        background: (theme) => theme.palette.primary.light,
        ":hover": {
          background: (theme) => `${theme.palette.primary.light}!important`,
        },
        "&.Mui-disabled": {
          background: (theme) => alpha(theme.palette.primary.lighter, 0.65),
        },
      },
      ...buttonSx(theme),
    })}
  >
    {title}
    {loading && <CircularProgress color="inherit" size={20} />}
  </Button>
);

MuiCustomButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.string,
};

export default MuiCustomButton;
