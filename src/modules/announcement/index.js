import AnnouncementLogoComponent from "@/components/announcementLogo";
import SnackbarProvider from "@/components/snackbar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React from "react";
import ScrollInto from "react-scroll-into-view";

const ConsultationForm = dynamic(() => import("./consultationForm"), {
  ssr: false,
});

const AnnouncementModule = ({ data, enq_type = "H" }) => {
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
  const handleOpenClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.warning.dark,
          padding: {
            md: "40px 0",
            sm: "30px",
            xs: "30px",
            xxs: "30px",
          },
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent={{
            md: "center",
            sm: "space-between",
            xs: "space-between",
            xxs: "space-between",
          }}
          alignItems="center"
        >
          <ScrollInto selector="#freeConsultation">
            <Typography
              component="p"
              variant="typography42"
              fontWeight={400}
              color="common.white"
              sx={{
                maxWidth: {
                  md: "100%",
                  sm: "500px",
                  xs: "400px",
                  xxs: "400px",
                },
                fontSize:{
                  xs:"1.5rem !important",
                  xxs:"1.5rem !important",
                }

              }}
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {translate("Foryourinspiredrequirements")}
              <Box
                component="br"
                sx={{
                  display: {
                    md: "none",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  },
                }}
              />
              <Typography
                component="span"
                variant="typography42"
                fontWeight={500}
                sx={{
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.common.white}`,
                  paddingBottom: "5px",
                  cursor: "pointer",
                }}
                onClick={handleOpenClose}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {""} {translate("Writetous")}
              </Typography>
            </Typography>
          </ScrollInto>

          {data && data?.PARENT && data?.PARENT?.image_path && (
            <AnnouncementLogoComponent url={data?.PARENT?.image_path} />
          )}
        </Stack>
      </Box>
      {open && data && data?.PARENT && data?.PARENT && (
        <Collapse in={open} sx={{ width: "100%" }}>
          <SnackbarProvider>
            <Box id="freeConsultation">
              <ConsultationForm
                data={
                  data?.PARENT?.CHILD &&
                  data?.PARENT?.CHILD?.length > 0 &&
                  data?.PARENT?.CHILD
                }
                handleOpenClose={handleOpenClose}
                open={open}
                enq_type={enq_type}
              />
            </Box>
          </SnackbarProvider>
        </Collapse>
      )}
    </>
  );
};

export default AnnouncementModule;
