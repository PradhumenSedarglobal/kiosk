import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const ConsultationHeading = ({ data }) => {
  const { t: translate } = useTranslation();

  return (
    <Stack spacing={0.3} py={5}>
      <Typography
        component="div"
        variant="typography45"
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
        sx={(theme) => ({
          "& h2": {
            letterSpacing: 0,
            color: theme.palette.common.black,
            ...theme.typography.typography32,
            fontWeight: 400,
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            mb: 0,
          },
          "& p": {
            ...theme.typography.subtitle3,
            letterSpacing: 0.5,
            fontWeight: 400,
            color: theme.palette.common.black,
            fontFamily: theme.fontFaces.helveticaNeueLight,
            marginTop: "0px!important",
            marginBlockEnd: "8px!important",
          },
        })}
      />
      <Box>
        <Typography
          component="p"
          variant="typography15"
          sx={{
            letterSpacing: 0,
            fontWeight: 500,
            marginBlockStart: "0px!important",
          }}
          fontFamily={(theame) => theame.fontFaces.helveticaNeueMedium}
          color={(theame) => theame.palette.common.black}
        >
          {translate("PleaseSelecttypeofConsultation")}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ConsultationHeading;
