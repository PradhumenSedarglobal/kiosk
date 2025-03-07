import { useAuthContext } from "@/auth/useAuthContext";
import { ButtonAnimate } from "@/components/animate";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import MenuPopover from "@/components/menu-popover";
import { languageChange } from "@/utils/constant";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";


const SelectLanguage = ({ layout }) => {
  const { asPath, locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { currentLang, countryName } = cookies || {};
  const langName = locale != "default" ? locale?.split("-")[1] : "en";
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang) => {
    handleClosePopover();
  };

  return (
    <>
      <ButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: "auto",
          height: "auto",
          cursor: "pointer",
          ...(openPopover && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <NextLazyFillImage
            src={
              (layout &&
                layout?.HEADER?.TOPBAR?.length > 0 &&
                layout?.HEADER?.TOPBAR[1]?.CHILD?.length > 0 &&
                layout?.HEADER?.TOPBAR[1]?.CHILD.find(
                  (item) => item.link_title == "Language"
                )?.image_path) ||
              ""
            }
            alt={
              layout &&
              layout?.HEADER?.TOPBAR?.length > 0 &&
              layout?.HEADER?.TOPBAR[1]?.CHILD?.length > 0 &&
              layout?.HEADER?.TOPBAR[1]?.CHILD.find(
                (item) => item.content == "Language"
              )?.content
            }
            sx={{
              width: "20px!important",
              height: "100%!important",
              objectFit: "cover",
              position: "relative!important",
            }}
            borderRadius="50%"
            width={40}
            height={40}
            upLgWidth={40}
            downLgWidth={40}
            downMdWidth={40}
            downSmWidth={40}
            downXsWidth={40}
            priority={false}
            loading="lazy"
            aspectRatio="1 / 1"
          />
          {languageChange?.length > 0 &&
            languageChange.map((option, index) => {
              return (
                <React.Fragment
                  key={`${option?.value}-select-language-${index}`}
                >
                  <Typography
                    component={NextLink}
                    href={`${asPath}`}
                    locale={`${countryName}-${option?.value}`}
                    sx={{
                      cursor:
                        langName === `${option?.value}` ? "no-drop" : "pointer",
                      pointerEvents:
                        langName === `${option?.value}` ? "none" : "unset",
                      color: (theme) =>
                        langName === `${option?.value}`
                          ? theme.palette.common.white
                          : theme.palette.common.white,
                      position: "relative",
                      textDecoration: "none",
                      fontFamily: (theme) =>
                        option.type == "ar"
                          ? theme.fontFaces.helveticaNeueArabic
                          : theme.fontFaces.helveticaNeue,
                    }}
                  >
                    <Typography
                      component="p"
                      variant="caption"
                      color="common.white"
                      sx={{
                        color: (theme) =>
                          langName === option?.value
                            ? theme.palette.common.white
                            : theme.palette.common.white,
                      }}
                      fontFamily={(theme) =>
                        option.type == "ar"
                          ? theme.fontFaces.helveticaNeueArabic
                          : theme.fontFaces.helveticaNeue
                      }
                    >
                      {langName === option?.value && option?.label}
                    </Typography>
                  </Typography>
                </React.Fragment>
              );
            })}
        </Stack>
      </ButtonAnimate>

      <MenuPopover
        open={openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 180 }}
      >
        <Stack spacing={0.75}>
          {languageChange?.length > 0 &&
            languageChange.map((option, index) => {
              return (
                <MenuItem
                  key={`${option?.value}-${index + 1}`}
                  component={NextLink}
                  href={`${asPath}`}
                  locale={`${countryName}-${option?.value}`}
                  selected={option?.value == currentLang?.value}
                  onClick={() => {
                    handleChangeLang(option?.value);
                  }}
                >
                  <Typography
                    sx={{
                      cursor: langName == option?.value ? "no-drop" : "pointer",
                      pointerEvents:
                        langName == option?.value ? "none" : "unset",
                      color: (theme) =>
                        langName == option?.value
                          ? theme.palette.grey[700]
                          : theme.palette.common.white,
                      position: "relative",
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      component="p"
                      variant="typography16"
                      color="common.white"
                      sx={{
                        color: (theme) => theme.palette.common.black,
                      }}
                      fontFamily={(theme) =>
                        option.type == "ar"
                          ? theme.fontFaces.helveticaNeueArabic
                          : theme.fontFaces.helveticaNeue
                      }
                    >
                      {option?.label}
                    </Typography>
                  </Typography>
                </MenuItem>
              );
            })}
        </Stack>
      </MenuPopover>
    </>
  );
};

export default SelectLanguage;
