import PropTypes from "prop-types";
// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "next-i18next";

// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  const { t : translate} = useTranslation();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {translate("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
