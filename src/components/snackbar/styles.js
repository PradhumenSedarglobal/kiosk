// @mui
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function StyledNotistack() {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";
  const isRtl = theme.direction == "rtl";
  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        ".notistack-SnackbarContainer.z-alert": {
          ziIndex: 10000,
        },
        "#__next": {
          ".notistack-SnackbarContainer.z-alert": {
            ziIndex: 10000,
          },

          ".notistack-MuiContent": {
            direction: isRtl ? "rtl" : "ltr",
            width: "100%",
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
            color: isLight
              ? theme.palette.common.white
              : theme.palette.grey[800],
            backgroundColor: isLight
              ? theme.palette.grey[900]
              : theme.palette.common.white,
            "&.notistack-MuiContent-success, &.notistack-MuiContent-error, &.notistack-MuiContent-warning, &.notistack-MuiContent-info":
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up("md")]: {
              minWidth: 240,
            },
          },
          ".SnackbarItem-message": {
            padding: "0 !important",
            fontWeight: theme.typography.fontWeightMedium,
          },
          ".SnackbarItem-action": {
            marginRight: 0,
            color: theme.palette.action.active,

            "& svg": {
              width: 20,
              height: 20,
            },
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
