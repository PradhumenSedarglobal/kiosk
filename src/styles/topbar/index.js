import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const TopBarTypography = styled(Typography)(({ theme }) => ({
  fontFamily: theme.fontFaces.helveticaNeue,
  ...theme.typography.typography16,
  color: theme.palette.common.black,
  fontWeight: 400,
}));
