import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";

const ProductInfoDialog = ({ open, handleClose, data }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root-MuiDialog-paper.MuiPaper-rounded": {
            borderRadius: 0,
          },
          "& .MuiPaper-root": {
            width: "400px",
            borderRadius: "7px",
          },
        }}
      >
        <DialogContent sx={{ paddingBottom: "25px" }}>
          <Box component="div" width="100%" textAlign="end" mt={1}>
            <Close
              fontSize="mediumn"
              onClick={handleClose}
              sx={{ cursor: "pointer", fontSize: "28px" }}
            />
          </Box>
          <DialogContentText id="alert-dialog-description">
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.typography17,
                color: theme.palette.common.black,
                fontWeight: 400,
                fontFamily: theme.fontFaces.helveticaNeueBold,
              })}
            >
              {data?.DESCRIPTION}
            </Typography>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.SPI_FEATURES,
              }}
              sx={(theme) => ({
                color: theme.palette.dark.darker,
                "& p": {
                  color: theme.palette.common.black,
                },
                "& h2": {
                  color: theme.palette.common.black,
                  m: 0,
                },
                "& ul": {
                  listStyle: "none",
                  fontFamily: theme.fontFaces.helveticaNeue,
                },
                fontSize: theme.typography.typography16,
                fontFamily: theme.fontFaces.helveticaNeueLight,
                wordSpacing: 1,
              })}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductInfoDialog;
