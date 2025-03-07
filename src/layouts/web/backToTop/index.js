import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import React from "react";
export function ScrollTop(props) {
  const { children, window } = props;
  const isDownSm = useResponsive("down", "sm");
  const [position, setPosition] = React.useState({
    position: "fixed",
    bottom: 20,
    right: 25,
    zIndex: 1200,
  });

  React.useEffect(() => {
    if (isDownSm) {
      setPosition({
        position: "fixed",
        bottom: 70,
        left: 25,
        zIndex: 1200,
      });
    } else {
      setPosition({
        position: "fixed",
        bottom: 50,
        right: 25,
        zIndex: 1200,
      });
    }
  }, [isDownSm]);

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={(theme) => ({
          transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...position,
        })}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
