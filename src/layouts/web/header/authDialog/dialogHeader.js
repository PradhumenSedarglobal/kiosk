import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const DialogHeader = ({ title, subtitle, handleClose }) => {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Stack spacing={subtitle ? 1 : 0}>
        <Typography
          component="p"
          variant="typography19"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          fontWeight={500}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            component="p"
            variant="typography13"
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            fontWeight={500}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
      <Box component="div">
        <Card
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </Card>
      </Box>
    </Stack>
  );
};

export default DialogHeader;
