import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import useResponsive from "@/hooks/useResponsive";
import { profileNav } from "@/utils/constant";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const MenuPopover = dynamic(() => import("@/components/menu-popover"), {
  ssr: false,
});

const LoginMenu = ({
  title,
  src,
  alt,
  handleLoginOpen,
  isGuest,
  handleClose,
  isRu,
}) => {
  const [loginTitle, setLoginTitle] = React.useState("...Loading");
  const isDownMd = useResponsive("down", "md");
  const { t: translate } = useTranslation();
  const { push } = useRouter();
  const { logout, state } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken } = cookies || {};
  const popupState = usePopupState({
    variant: "popover",
    popupId: "loginMenu",
  });

  React.useEffect(() => {
    setLoginTitle(title);
  }, [title]);
  return (
    <>
      {isDownMd && (
        <Box
          component="div"
          display={{
            lg: "none",
            md: "none",
            sm: "block",
            xs: "block",
            xxs: "block",
          }}
          onClick={() => {
            if (JWTAuthToken) {
              handleClose();
            } else {
              !JWTAuthToken && handleLoginOpen();
              handleClose();
            }
          }}
          className="Main_Header_Login_Button"
        >
          <Stack direction={"row"}>
            <Typography
              component="label"
              variant="h6"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              color={(theme) => theme.palette.primary.main}
              fontWeight={500}
            >
              {loginTitle}
            </Typography>
          </Stack>
        </Box>
      )}
      <Box
        component="div"
        onClick={() => {
          !JWTAuthToken && handleLoginOpen();
        }}
        display={{
          lg: "inline-block",
          md: "inline-block",
          sm: "none",
          xs: "none",
          xxs: "none",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          width={isRu ? "80px" : "max-content"}
          sx={{ cursor: "pointer" }}
          {...(JWTAuthToken && bindTrigger(popupState))}
        >
          <Typography
            component="p"
            variant="typography15"
            noWrap
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          >
            {loginTitle}
          </Typography>

          <NextLazyLoadImage
            sx={{
              width: "18px!important",
              height: "18px!important",
            }}
            width={18}
            height={18}
            src={"/assets/cartPage/loginICon.webp" || src}
            objectFit="contain"
            alt={alt}
          />
        </Stack>

        <MenuPopover
          {...bindMenu(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          arrow="top-left"
        >
          {!isGuest &&
            profileNav &&
            profileNav?.length > 0 &&
            profileNav.map((item, index) => {
              return (
                <MenuItem
                  key={`MENU-ITEM-${index}`}
                  onClick={() => {
                    popupState.close();
                    push(`${item?.href}`);
                  }}
                >
                  <ListItemIcon sx={{ py: 1 }}>
                    <Iconify icon={item.iconName} width={25} />
                  </ListItemIcon>
                  <Typography
                    component="span"
                    variant="typography16"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      color: theme.palette.common.black,
                    })}
                  >
                    {translate(`${item.listName}`)}
                  </Typography>
                </MenuItem>
              );
            })}
          <MenuItem
            onClick={() => {
              popupState.close();
              logout();
            }}
          >
            <ListItemIcon sx={{ py: 1 }}>
              <Logout />
            </ListItemIcon>
            <Typography
              component="span"
              variant="typography16"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeue,
                color: theme.palette.common.black,
              })}
            >
              {translate("SignOut")}
            </Typography>
          </MenuItem>
        </MenuPopover>
      </Box>
    </>
  );
};

export default LoginMenu;
