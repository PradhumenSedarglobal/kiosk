import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";

const SearchBox = dynamic(() => import("./index"), {
  loading: () => <></>,
  ssr: false,
});

const SearchDialogBox = ({ open, handleClose }) => {
  const theme = useTheme();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={(theme) => ({
          "& .MuiDialog-paper": {
            backgroundColor: alpha(theme.palette.common.black, 0.4),
          },
        })}
      >
        <DialogContent>
          <Box
            sx={{
              position: "absolute",
              right: "5%",
              top: "2%",
              zIndex: 11,
            }}
          >
            <Card sx={{ borderRadius: "50%" }}>
              <IconButton size="small" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            </Card>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              alignItems: "center",
            }}
          >
            <SearchBox
              formControlSx={{
                "&.MuiFormControl-root": {
                  display: "inline-flex",
                },
                "& .MuiInput-root:before": {
                  borderBottomColor: (theme) => theme.palette.common.white,
                },
                "& .MuiInput-root:after": {
                  borderBottomColor: (theme) => theme.palette.common.white,
                },
                "& .MuiInput-input": {
                  color: (theme) => theme.palette.common.white,
                  paddingLeft: "10px",
                },
              }}
              IconColor={theme?.palette.common.white}
              handleClose={handleClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDialogBox;
