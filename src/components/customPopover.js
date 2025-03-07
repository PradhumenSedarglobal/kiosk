import React, { useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import useResponsive from "@/hooks/useResponsive";

const StyledCustomPopover = ({ anchorEl, open, children }) => {
  const popoverRef = useRef(null);
  const buttonRect = anchorEl && anchorEl.getBoundingClientRect();
  const isDownSm = useResponsive("md", "sm");
  const isDownXs = useResponsive("md", "xs");
  const isDownXxs = useResponsive("md", "xxs");


  useEffect(() => {
    if (open && anchorEl) {
      const handleScroll = () => {
        if (popoverRef.current) {
          const viewportHeight = window.innerHeight;

          if (isDownSm) {
            if (viewportHeight - buttonRect.bottom <= 150) {
              popoverRef.current.style.bottom = "102px";
            } else {
              popoverRef.current.style.bottom = "-102px";
            }
          }

          if (isDownXs) {
            if (viewportHeight - buttonRect.bottom <= 150) {
              popoverRef.current.style.bottom = "102px";
            } else {
              popoverRef.current.style.bottom = "-102px";
            }
          }

          if (isDownXxs) {
            if (viewportHeight - buttonRect.bottom <= 100) {
              popoverRef.current.style.bottom = "83px";
            } else {
              popoverRef.current.style.bottom = "-83px";
            }
          }
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [open, anchorEl, isDownXxs, isDownSm]);

  const memoStyledCustomPopover = React.useMemo(() => {
    return (
      <Stack
        direction="column"
        spacing={{ sm: 2, xs: 2, xxs: 1 }}
        px={2}
        py={1.5}
        textAlign="center"
        sx={{
          height: "100%!important",
          zIndex: 5000,
          bottom: { sm: -102, xs: -102, xxs: -83 },
          left: "0px",
          backgroundColor: (theme) => theme.palette.primary.light,
          opacity: "0.9",
          width: "100%!important",
          position: "absolute",
          display: open ? "grid" : "none",
          alignItems: "center",
        }}
        component="div"
        ref={popoverRef}
      >
        {children}
      </Stack>
    );
  }, [open, anchorEl]);

  return memoStyledCustomPopover;
};

export default StyledCustomPopover;
