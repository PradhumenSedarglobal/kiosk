import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import useProduct from "@/provider/product/useProduct";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { useTranslation } from "next-i18next";

const AddWishlistIcon = ({
  handleAddFreeSample,
  data,
  defaultSelectItem,
  type,
}) => {
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { productFreeSamples } = productState;

  return (
    <>
      <Box
        component="div"
        sx={(theme) => ({
          position: "absolute",
          zIndex: 4,
          left: 0,
          right: 0,
          top: 0,
          display: {
            md: "block",
            sm: "block",
            xs: "block",
            xxs: "block",
          },
        })}
      >
        <Stack
          component={CardContent}
          sx={(theme) => ({
            padding: "20px!important",
            [theme.breakpoints.down("sm")]: {
              padding: "6px!important",
            },
          })}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          height="100%"
        >
          {data?.SFI_SAMPLE_APP_YN === "Y" || type == "free_sample" ? (
            data &&
              productFreeSamples.some(
                (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
              ) ? (
              <Tooltip
                title={
                  <Typography
                    variant="typography9"
                    sx={{
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    }}
                  >
                    {translate("FreeSampleAdded")}
                  </Typography>
                }
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  onClick={() => {
                    handleAddFreeSample(
                      {
                        ...data,
                        defaultSelectItem: defaultSelectItem,
                      },
                      productFreeSamples
                    );
                  }}
                >
                  <NextLazyLoadImage
                    src="/assets/icon/product/sample_check.svg"
                    alt="sample_check"
                    objectFit="contain"
                    sx={{
                      width: "25px!important",
                      height: "100%!important",
                      objectFit: "contain",
                      position: "relative!important",
                      backgroundColor: (theme) => theme.palette.common.white,
                    }}
                    width={25}
                    height={25}
                    upLgWidth={50}
                    downLgWidth={50}
                    downMdWidth={50}
                    downSmWidth={25}
                    downXsWidth={25}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  <Typography
                    variant="typography9"
                    sx={{
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    }}
                  >
                    {translate("OrderFreeSample")}
                  </Typography>
                }
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  onClick={() =>
                    handleAddFreeSample(
                      {
                        ...data,
                        defaultSelectItem: defaultSelectItem,
                      },
                      productFreeSamples
                    )
                  }
                >
                  <NextLazyLoadImage
                    src="/assets/icon/product/sample_uncheck.png"
                    alt="sample_uncheck"
                    objectFit="contain"
                    sx={{
                      width: "25px!important",
                      height: "100%!important",
                      objectFit: "contain",
                      position: "relative!important",
                      backgroundColor: (theme) => theme.palette.common.white,
                    }}
                    width={25}
                    height={25}
                    upLgWidth={50}
                    downLgWidth={50}
                    downMdWidth={50}
                    downSmWidth={25}
                    downXsWidth={25}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  />
                </IconButton>
              </Tooltip>
            )
          ) : (
            <Box component="div" />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default AddWishlistIcon;
