import useResponsive from "@/hooks/useResponsive";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function InfoDialogBox({
  title,
  open,
  handleClose,
  description,
  fullWidth,
  maxWidth,
}) {

  return (
    <React.Fragment>
      <Dialog
        // fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ py: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ pb: 0 }}
          >
            <Box component="div">
              <Card
                sx={{ "&.MuiCard-root": { borderRadius: "50%!important" } }}
              >
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Card>
            </Box>
          </Stack>
          <Stack spacing={0}>
            <Typography
              component="p"
              variant="typography18"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
              color={(theme)=> theme.palette.dark.darker }
              letterSpacing={0.5}
            >
              {title}
            </Typography>
            <Typography
              component="div"
              variant="typography14"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              sx={(theme) => ({

                color:theme.palette.dark.darker,
                "& p": {
                  ...theme.typography.typography14,
                  letterSpacing: 0.5,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  marginBlockStart: "16px!important",
                },
              })}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
