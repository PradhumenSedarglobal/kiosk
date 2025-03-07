import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function CommonDialogBox({
  title,
  open,
  handleClose,
  fullWidth,
  maxWidth,
  content,
  titleComponent,
}) {
  return (
    <React.Fragment>
      <Dialog
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
            justifyContent="space-between"
            sx={{ pb: 2 }}
          >
            <Typography
              component={titleComponent}
              variant="typography28"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              color="common.black"
            >
              {title}
            </Typography>
            <Box component="div">
              <Card
                sx={{ "&.MuiCard-root": { borderRadius: "50%!important" } }}
              >
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Card>
            </Box>
          </Stack>
          <Divider />
          <Typography component="p"
            sx={(theme) => ({
              fontFamily: theme.fontFaces.helveticaNeueLight,
              '& p': {
                fontSize: 18
              },
              color: "common.black",
            })}>
            {content}
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
