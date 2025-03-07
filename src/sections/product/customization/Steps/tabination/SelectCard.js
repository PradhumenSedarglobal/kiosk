import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NextFillImage } from "@/components/image";
import MenuPopover from "@/components/menu-popover";
import { useTranslation } from "next-i18next";

const SelectCard = ({ defaultImg }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t: translate } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let img_path = "/assets/images/";

  let item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";
  // let img_path = "/assets/images/
  return (
    <Box
      sx={{
        p: 1,
        // border: (theme) => `1px solid ${theme.palette.primary.main}`,
        position: "relative",
        height: "10em",
        "&:hover": {
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          "& .hover-btn-show": {
            display: "block",
          },
        },
      }}
    >
      <Box>
        <NextFillImage
          src={
            defaultImg?.SII_THUMBNAIL_IMAGES
              ? item_img_path + defaultImg.SII_THUMBNAIL_IMAGES
              : img_path + "noimage.jpg"
          }
          sx={{
            width: "100%!important",
            height: "100%!important",
            objectFit: "contain",
            backgroundSize: "contain",
            "&.MuiCard-root": {
              borderRadius: 0,
              boxShadow: "none",
              position: "relative!important",
              width: "100%!important",
              height: "100%!important",
            },
          }}
          alt="Image"
          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
          objectFit="contain"
        />
        <Box
          my={0}
          px={1}
          pb={1}
          sx={{
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Grid container spacing={0.4}>
            <Grid item md={4}>
              <Box
                sx={{
                  my: 0.6,
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "25px",
                  height: "25px",
                }}
              >
                <NextFillImage
                  src="/assets/imagecurtain.webp"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "100%!important",
                      height: "100%!important",
                    },
                  }}
                  alt="Image"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  my: 0.6,
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "25px",
                  height: "25px",
                }}
              >
                <NextFillImage
                  src="/assets/imagecurtain.webp"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "100%!important",
                      height: "100%!important",
                    },
                  }}
                  alt="Image"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              {/* <Box
                sx={{
                  my: 0.6,
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "25px",
                  height: "25px",
                }}
              >
                <NextFillImage
                  src="/assets/imagecurtain.webp"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "100%!important",
                      height: "100%!important",
                    },
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box> */}

              <Box
                onClick={handleClick}
                sx={{
                  my: 0.6,
                  position: "relative",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "25px",
                  height: "25px",
                  border: "1px solid grey",
                }}
              >
                <Typography
                  sx={(theme) => ({
                    textAlign: "center",
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  +2
                </Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    maxWidth: "10.5em",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", mx: 1 }}>
                  {[...Array(4)]?.map((option, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          my: 0.6,
                          mx: 0.3,
                          borderRadius: "50%",
                          overflow: "hidden",
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        <NextFillImage
                          src="/assets/imagecurtain.webp"
                          sx={{
                            width: "100%!important",
                            height: "100%!important",
                            objectFit: "contain",
                            backgroundSize: "contain",
                            "&.MuiCard-root": {
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "100%!important",
                              height: "100%!important",
                            },
                          }}
                  alt="Image"
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          objectFit="contain"
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Menu>
            </Grid>
          </Grid>

          <Box className="hover-btn-show" sx={{ display: "none" }}>
            <Button
              sx={{ borderRadius: "0px" }}
              size="small"
              fullWidth
              variant="contained"
            >
              {translate("Select")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectCard;
