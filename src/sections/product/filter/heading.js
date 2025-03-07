import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const FilterHeading = ({ handleReset }) => {
  const { t: translate } = useTranslation();
  return (
    <Box component="div" sx={{ px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          component="h3"
          variant="filter1"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
          color="common.black"
        >
          {translate("Filter")}
        </Typography>
        <Typography
          component="p"
          variant="typography14"
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          mb={0}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleReset}
          color={(theme) => theme.palette.grey.dark}
        >
          {translate("ClearAll")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default FilterHeading;
