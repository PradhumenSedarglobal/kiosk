import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
// components
import LoadingScreen from "@/components/loading-screen";
//
import Iconify from "@/components/iconify";
import { useDispatch } from "@/redux/store";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { state, setLoginPopupOpen } = useAuthContext();
  const { isAuthenticated, isInitialized } = state;
  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <Box p={8} textAlign="center">
        <Container maxWidth="xl">
          <Box>
            <Iconify
              icon="icon-park-solid:protect"
              width="200px"
              color="primary.dark"
            />
          </Box>
          <Box pt={4}>
            <Typography
              component="p"
              variant="typography31"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
              color="common.black"
            >
              You are not authorized for this page. Please Log in your account.
            </Typography>
          </Box>
          <Box pt={4} width="20%" display="inline-block">
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              type="submit"
              sx={(theme) => ({
                "&.MuiButton-root": {
                  borderRadius: "0px",
                  color: "common.white",
                  ...theme.typography.typography15,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  padding: "1rem 5px!important",
                  fontWeight: 200,
                  letterSpacing: 0.5,
                },
              })}
              onClick={() => {
                setLoginPopupOpen(true);
              }}
            >
              {translate("login")}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return <>{children} </>;
}
