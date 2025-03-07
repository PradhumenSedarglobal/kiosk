import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";


const NotFound = ({ handleClose }) => {
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, modificationUser } = cookies || {};
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <Toolbar
        sx={{
          minHeight: {
            lg: "115px!important",
            md: "115px!important",
            sm: "106px!important",
          },
        }}
      />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Card
          sx={(theme) => ({
            borderRadius: "0px!important",
            boxShadow: theme.shadows[25],
            zIndex: 2200,
            width: "100%",
            maxWidth: "430px",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <Stack spacing={4}>
              <Stack direction="row" justifyContent="flex-end">
                <Card
                  sx={{
                    "& .MuiCard-root": { borderRadius: "0px!important" },
                  }}
                >
                  <IconButton size="small" onClick={handleClose}>
                    <Close fontSize="small" />
                  </IconButton>
                </Card>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                pb={4}
              >
                <NextLazyLoadImage
                  src="/assets/icon/error/cart.png"
                  alt="empty cart "
                  width={382}
                  height={289}
                  sx={{
                    width: "max-content!important",
                    height: "100%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={382}
                  downLgWidth={382}
                  downMdWidth={382}
                  downSmWidth={382}
                  downXsWidth={382}
                />
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  position: "sticky",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 0,
                }}
              >
                <Button
                  sx={(theme) => ({
                    textWrap: "nowrap",
                    "&.MuiButton-root": {
                      ...theme.typography.typography15,
                      fontFamily: `${theme.fontFaces.helveticaNeueBold}!important`,
                      borderRadius: "0px",
                    },
                  })}
                  fullWidth
                  variant="outlined"
                  color="dark"
                  size="large"
                  onClick={() => handleClose()}
                >
                  {translate("ContinueShopping")}
                </Button>
                <Button
                  sx={(theme) => ({
                    "&.MuiButton-root": {
                      ...theme.typography.typography15,
                      fontFamily: `${theme.fontFaces.helveticaNeueBold}!important`,
                      color: theme.palette.common.white,
                      borderRadius: "0px",
                    },
                  })}
                  fullWidth
                  variant="contained"
                  color="dark"
                  size="large"
                  onClick={() =>
                    router.push(
                      user?.cust_type == "ADMIN"
                        ? `/${locale}/modification?head_sys_id=${modificationUser?.head_sys_id || 0
                        }`
                        : `/${locale}/cartPage`
                    )
                  }
                >
                  {translate("ViewCart")}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default NotFound;
