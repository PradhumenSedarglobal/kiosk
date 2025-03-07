import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const SectionThree = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Stack spacing={4} alignItems="center">
        <NextLazyLoadImage
          src="/assets/icon/auth/success.png"
          alt="success"
          width={180}
          height={180}
          sx={{
            width: "14%!important",
            height: "100%!important",
            objectFit: "cover!important",
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
          objectFit="contain"
          upLgWidth={180}
          downLgWidth={180}
          downMdWidth={180}
          downSmWidth={180}
          downXsWidth={180}
        />
        <Box textAlign="center">
          <Typography
            variant="typography21"
            component="p"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            letterSpacing="0.42px"
            fontWeight={600}
          >
            {translate("PasswordChangedSuccessfully")}
          </Typography>
          <Typography
            variant="typography16"
            component="p"
            letterSpacing=".28px"
            color={(theme) => theme.palette.grey[2300]}
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          >
            {translate("Pleaselogintoyouremailaccountagain")}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default SectionThree;
