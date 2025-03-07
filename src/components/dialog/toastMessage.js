import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import NextLazyLoadImage from "../image/NextLazyLoadImage";

const ToastMessage = ({
  maxWidth = "xxs",
  title = "",
  titleComponent = "p",
  open,
  handleClose,
  isButtonShow = true,
  content,
  spacing = 5,
  icon,
  titleSx,
  isCloseShow,
}) => {
  const { t: translate } = useTranslation();
  const { push } = useRouter();

  if (open) {
    setTimeout(function () {
      handleClose();
    }, 2000);

    return (
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        open={open}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: "0.5rem!important",
          },
        }}
      >
        {isCloseShow && (
          <>
            <Box
              component="div"
              sx={{
                textAlign: "right",
                m: 1.2,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Card
                onClick={() => handleClose()}
                sx={{
                  "&.MuiCard-root": {
                    borderRadius: "50%!important",
                  },
                  width: "max-content",
                }}
              >
                <IconButton size="small">
                  <Close fontSize="small" />
                </IconButton>
              </Card>
            </Box>
            <Divider />
          </>
        )}
        <DialogContent
          sx={{
            "&.MuiDialogContent-root": {
              padding: "4rem!important",
              borderRadius: "0.5rem",
            },
          }}
        >
          <Stack alignItems="center" spacing={spacing}>
            <Stack spacing={2} alignItems="center">
              <NextLazyLoadImage
                src={icon || `/assets/icon/auth/success.png`}
                alt="1"
                width={60}
                height={357}
                sx={{
                  width: "60px!important",
                  height: "100%!important",
                  objectFit: "cover!important",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                objectFit="contain"
                upLgWidth={60}
                downLgWidth={60}
                downMdWidth={60}
                downSmWidth={60}
                downXsWidth={60}
              />
              {title && (
                <Typography
                  component={titleComponent}
                  variant="typography19"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  fontWeight={500}
                  sx={titleSx}
                >
                  {title}
                </Typography>
              )}
            </Stack>
            {content}
            {isButtonShow && (
              <Stack spacing={2} width="100%">
                <Button
                  sx={(theme) => ({
                    "&.MuiButton-root": {
                      borderRadius: "0px",
                      ...theme.typography.typography15,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      maxWidth: `100%!important`,
                      padding: "10px 0px!important",
                    },
                  })}
                  fullWidth
                  variant="outlined"
                  color="dark"
                  onClick={handleClose}
                >
                  {translate("ContinueShopping")}
                </Button>
                <Button
                  sx={(theme) => ({
                    "&.MuiButton-root": {
                      borderRadius: "0px",
                      color: "common.black",
                      ...theme.typography.typography15,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      maxWidth: `100%!important`,
                      padding: "10px 0px!important",
                      background: (theme) => theme.palette.primary.light,
                      ":hover": {
                        background: (theme) =>
                          `${theme.palette.warning.dark} !important`,
                      },
                      "&.Mui-disabled": {
                        background: (theme) =>
                          alpha(theme.palette.primary.lighter, 0.65),
                      },
                    },
                  })}
                  maxWidth="100%"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => push("/cartPage")}
                >
                  {translate("ProceedtoCheckout")}
                </Button>
              </Stack>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
};
export default ToastMessage;
