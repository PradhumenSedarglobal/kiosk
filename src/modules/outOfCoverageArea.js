import MuiCustomButton from "@/components/button/customButton";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
const OutOfCoverageArea = ({ href = "/" }) => {
  const { t: translate } = useTranslation();
  return (
    <Box component="div" width="100%">
      <Stack alignItems="center" width="100%" spacing={4}>
        <NextLazyLoadImage
          src="/assets/images/error/OutofCoverageArea.png"
          alt="OutofCoverageArea"
          width="400"
          height="300"
          placeholder="blur"
          loading="eager"
          sx={{
            width: "90px!important",
            height: "73.95px!important",
            objectFit: "cover!important",
            "&.MuiCard-root": {
              borderRadius: 0,
              boxShadow: "none",
              position: "relative!important",
            },
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
        />
        <Stack alignItems="center" width="100%" textAlign="center">
          <Typography
            variant="typography29"
            component="p"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          >
            {translate("out_of_coverage")}
          </Typography>

          <Typography
            variant="typography16"
            component="p"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
          >
            {translate("out_of_coverage_mgs")}
          </Typography>
        </Stack>
        <MuiCustomButton
          LinkComponent={NextLink}
          href={href}
          fullWidth
          variant="contained"
          color="primary"
          buttonSx={(theme) => ({
            "&.MuiButton-root": {
              width: "158px",
              borderRadius: "0px!important",
              background: (theme) => theme.palette.primary.light,
              ":hover": {
                background: (theme) =>
                  `${theme.palette.primary.light}!important`,
              },
              color: `${theme.palette.grey[4900]}!important`,
              ...theme.typography.typography16,
              fontFamily: theme.fontFaces.helveticaNeue,
            },
          })}
          title={translate("Back")}
        />
      </Stack>
    </Box>
  );
};

export default OutOfCoverageArea;
