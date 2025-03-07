import { CommonPaymentPage } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CustomLink } from "../link";
const NextLazyLoadImage = dynamic(
  () => import("@/components/image/NextLazyLoadImage"),
  {
    loading: () => <></>,
    ssr: true,
  }
);
const CommonPageComponent = (props) => {
  const {
    image,
    title,
    heading,
    subHeading,
    buttonText,
    link,
    height = "76vh",
    mail,
    sxSubHeading,
    sxButton,
    orderValue,
    mt = 4,
    headingMargin = { mt: 2 },
    paymentMethod,
    imageSx,
    imgBoxSx,
    imageWidth,
  } = props;

  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: { height } }}
      >
        <Box width={imageWidth ? imageWidth : "35%"} sx={imgBoxSx}>
          <NextLazyLoadImage
            src={image || ""}
            alt="common Page "
            width={75}
            height={55}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "contain!important",
              ...imageSx,
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={1400}
            downLgWidth={1400}
            downMdWidth={1400}
            downSmWidth={1400}
            downXsWidth={1400}
          />
        </Box>
        <Box sx={{ ...headingMargin }}>
          <Typography
            sx={(theme) => ({
              ...theme.typography.typography32,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
              textAlign: "center",
            })}
          >
            {title}
          </Typography>
          <CommonPaymentPage
            mt={mt}
            sx={(theme) => ({
              ...theme.typography.typography18,
              fontFamily: theme.fontFaces.helveticaNeueLight,
              color: theme.palette.common.black,
              letterSpacing:0.5
            })}
          >
            {heading}{" "}
            <Typography
              component="span"
              variant="typography18"
              fontWeight="700"
            >
              {mail}
            </Typography>
          </CommonPaymentPage>

          {subHeading && (
            <CommonPaymentPage component="div" my={3} sx={sxSubHeading}>
              {subHeading} {orderValue}
            </CommonPaymentPage>
          )}
          {paymentMethod && (
            <CommonPaymentPage component="div" my={3} sx={sxSubHeading}>
              {translate("PaymentMethod")} : {paymentMethod}
            </CommonPaymentPage>
          )}
        </Box>
        <Box mt={2}>
          <Button
            fullWidth
            onClick={() => router.push(link)}
            variant="contained"
            color="warning"
            sx={(theme) => ({
              py: 3,
              px: 8,
              borderRadius: "0px",
              width: "100%",
              fontFamily: theme.fontFaces.helveticaNeueBold,
              fontSize: "15px",
              background: theme.palette.primary.light,
              ...theme.typography.typography15,
              lineHeight: "18px",
              fontWeight: "400",
              color: theme.palette.common.black,
              ":hover": {
                bgcolor: theme.palette.primary[200],
                color: theme.palette.common.white,
              },
              ...sxButton,
            })}
          >
            {buttonText}
          </Button>
          {/* <CustomLink link={`${router.push(link)}`} sx={{width:"max-content"}}>
            <Typography sx={(theme) => ({
              py: 3,
              px: 8,
              borderRadius: "0px",
              width: "100%",
              fontFamily: theme.fontFaces.helveticaNeueBold,
              fontSize: "15px",
              background: theme.palette.primary.light,
              ...theme.typography.typography15,
              lineHeight: "18px",
              fontWeight: "400",
              color: theme.palette.common.black,
              ":hover": {
                bgcolor: theme.palette.primary[200],
                color: theme.palette.common.white,
              },
              ...sxButton,
            })}>
              {buttonText}
            </Typography>
          </CustomLink> */}
        </Box>
      </Stack>
    </>
  );
};

export default CommonPageComponent;
