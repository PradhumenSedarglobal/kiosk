import { useState } from "react";
// @mui
import { useAuthContext } from "@/auth/useAuthContext";
import { ButtonAnimate } from "@/components/animate";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import MenuPopover from "@/components/menu-popover";
import { CombineTypography } from "@/styles/layouts";
import { allLangs, global } from "@/utils/constant";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function CountryPopover() {
  const { push, asPath, locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { languageDropDown } = cookies || {};
  const countryName = locale != "default" ? locale?.split("-")[0] : global;
  const currentLang =
    allLangs && allLangs?.find((item) => item?.value === countryName);

  const onChangeLang = (newlang) => {
    push(asPath, asPath, { locale: newlang });
  };

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang) => {
    onChangeLang(newLang);
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
          <CombineTypography component="div" textTransform="uppercase">
            <NextLazyLoadImage
              src={currentLang?.icon || ""}
              sx={{
                width: "20px!important",
                height: "20px!important",
                borderRadius: "50%",
                objectPosition: "1%",
              }}
              alt="language"
              width={17}
              height={17}
            />
            <Typography
              component="p"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              variant="typography12"
              width="100%"
            >
              {currentLang?.label}
            </Typography>
          </CombineTypography>
        </Stack>
      </ButtonAnimate>
      <MenuPopover
        open={openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 180 }}
      >
        <Stack spacing={0.75}>
          {languageDropDown?.length > 0 &&
            languageDropDown.map((option, index) => {
              return (
                <MenuItem
                  key={`${option.value}-${index + 1}`}
                  selected={option.value === currentLang?.value}
                  onClick={() => {
                    handleChangeLang(option?.value);
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      mr: 2,
                      width: "19px!important",
                      height: "19px!important",
                      objectFit: "cover!important",
                      borderRadius: "50%",
                      overflow: "hidden",
                      objectPosition: "12%",
                    }}
                  >
                    <NextLazyLoadImage
                      alt={option.label || ""}
                      src={option.icon}
                      sx={{
                        width: "100% !important",
                        height: "100% !important",
                        objectFit: "cover !important",
                        objectPosition: "15% 100%",
                      }}
                      className="flag_img"
                      width={19}
                      height={19}
                    />
                  </Box>
                  <Typography
                    component="p"
                    variant="typography16"
                    color="common.white"
                    sx={{
                      color: (theme) => theme.palette.common.black,
                    }}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {option.label}
                  </Typography>
                </MenuItem>
              );
            })}
        </Stack>
      </MenuPopover>
    </>
  );
}
