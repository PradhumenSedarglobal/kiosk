import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            "& svg": {
              color: theme.palette.text.disabled,
            },
          },
        },
        input: {
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.Mui-disabled:before": {
            borderBottomStyle: "solid",
          },
        },
        underline: {
          "&:before": {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
          "&:after": {
            borderBottomColor: theme.palette.text.primary,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.text.primary,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          "&:hover": {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          "&.Mui-focused": {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before, :after": {
            display: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: (props) => {
          const { ownerState } = props;
          let isDark = ownerState?.color === "dark";
          let isSuccess = ownerState?.color === "success";
          let isError = ownerState?.color === "error";

    

          return {
            ...(isDark && {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.grey[500], 0.32),
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 1,
                  borderColor: theme.palette.text.primary,
                },
              },
              "&.Mui-disabled": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.action.disabledBackground,
                  borderStyle: "solid",
                },
              },
            }),

            ...(isSuccess && {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.success.main, 0.32),
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 1,
                  borderColor: theme.palette.success.main,
                },
              },
              "&.Mui-disabled": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.action.disabledBackground,
                  borderStyle: "solid",
                },
              },
            }),

            ...(isError && {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.error.main, 0.32),
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 1,
                  borderColor: theme.palette.error.main,
                },
              },
              "&.Mui-disabled": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.action.disabledBackground,
                  borderStyle: "solid",
                },
              },
            }),

            ...(!isDark &&
              !isSuccess &&
              !isError && {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: alpha(theme.palette.grey[500], 0.32),
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 1,
                    borderColor: theme.palette.text.primary,
                  },
                },
                "&.Mui-disabled": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.action.disabledBackground,
                    borderStyle: "solid",
                  },
                },
              }),
          };
        },
      },
    },
  };
}
