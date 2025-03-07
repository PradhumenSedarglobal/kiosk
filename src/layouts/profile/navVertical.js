import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { OrderSignOut } from "@/styles/auth";
import { profileAccountNav } from "@/utils/constant";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const NavVertical = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { logout, state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setTitle(`${user?.cust_first_name} ${user?.cust_last_name}`);
    }
  }, [user]);
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Typography
            sx={(theme) => ({
              ...theme.typography.typography20,
              fontWeight: theme.typography.fontWeightBold,
              fontFamily: theme.fontFaces.helveticaNeueBold,
            })}
            letterSpacing={1}
          >
            {translate("Profile")}
          </Typography>
        </Box>
        <Box>
          <List>
            <ListItem disablePadding sx={{ m: "15px 0", mb: "45px" }}>
              <ListItemAvatar>
                <Avatar
                  alt="Person"
                  src="/assets/dashboard/noimage.png"
                  sx={{ width: 50, height: 50 }}
                />
              </ListItemAvatar>
              <Stack direction={"column"}>
                <Typography
                  component="h2"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                  fontWeight={900}
                  letterSpacing={1}
                >
                  {translate("Hello")}
                </Typography>
                <Typography
                  component="small"
                  sx={(theme) => ({
                    fontWeight: 200,
                    color: (theme) => theme.palette.common.black,
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    cursor: "pointer",
                    display: "inline",
                  })}
                >
                  {title}
                </Typography>
              </Stack>
            </ListItem>
            {profileAccountNav.map((item, index) => {
              return (
                <Box key={`PANEL-DASHBOARD-${index}`}>
                  <ListItem
                    disablePadding
                    sx={(theme) => ({
                      my: "25px",
                      ...theme.typography.typography16,
                      cursor: "pointer",
                    })}
                    onClick={() => router.push(`${item?.href}`)}
                  >
                    <ListItemIcon>
                      <NextLazyLoadImage
                        src={item?.src}
                        alt="Loading Logo"
                        width={20}
                        height={25}
                        sx={(theme) => ({
                          width: "20px!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                        })}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={20}
                        downLgWidth={20}
                        downMdWidth={20}
                        downSmWidth={20}
                        downXsWidth={20}
                      />
                    </ListItemIcon>
                    <Typography
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    >
                      {translate(`${item.listName}`)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
            <Box
              p={2}
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <OrderSignOut
                variant="outlined"
                fullWidth
                startIcon={<Logout />}
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  ...theme.typography.typography15,
                })}
              >
                {translate("SignOut")}
              </OrderSignOut>
            </Box>
          </List>
        </Box>
      </Container>
    </>
  );
};

export default NavVertical;
