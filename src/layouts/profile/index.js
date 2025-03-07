import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import Grid from "@mui/material/Grid";
import { find } from "lodash";
import dynamic from "next/dynamic";
import NavVertical from "./navVertical";

const AnnouncementModule = dynamic(() => import("@/modules/announcement"), {
  ssr: false,
});

const ProfileLayout = ({ children, mt = 6, layout }) => {
  console.log(enq_type, 'enquiry_type3');

  return (
    <SnackbarProvider>
      <Grid container mt={mt} mb={6}>
        <Grid
          item
          lg={3}
          md={3}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
          borderRight={(theme) => `1px solid ${theme.palette.divider}`}
        >
          <NavVertical />
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} xxs={12}>
          {children}
        </Grid>
      </Grid>
      <AnnouncementModule
        data={
          layout?.HEADER?.TOPBAR && layout?.HEADER?.TOPBAR?.length > 0
            ? {
              ...find(layout?.HEADER?.TOPBAR, { content: "Announcement" }),
              PARENT: {
                CHILD: find(layout?.HEADER?.TOPBAR, {
                  content: "Announcement",
                })?.CHILD,
              },
            }
            : {}
        }
        enq_type="H"
      />
    </SnackbarProvider>
  );
};

export default ProfileLayout;
