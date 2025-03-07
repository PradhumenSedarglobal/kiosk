import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "next-i18next";

const HoverButton = ({
  data,
  hoverButtonName,
  handleClickHoverButton,
  gridView,
  defaultSelectItem,
}) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Box
        component="div"
        sx={(theme) => ({
          position: "absolute",
          zIndex: 4,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(0deg,${alpha(
            theme.palette.common.black,
            0.667
          )},${alpha(theme.palette.common.black, 0.286)} 40%,transparent)`,
          transition: theme.transitions.create(["display", "all"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
          }),
          display: { md: "block", sm: "block", xs: "none", xxs: "none" },
        })}
        className="hoverButton"
      >
        <Stack
          direction={gridView == "3" ? "column" : "row"}
          spacing={1}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px!important",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={(theme) => ({
              p: "2px",
              ...theme.typography.typography14,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              background: theme.palette.primary.light,
              borderRadius: "0px",
              border: "1px solid",
              fontWeight: 400,
              borderColor: theme.palette.primary.light,
              color: (theme) => theme.palette.common.black,
              minHeight: gridView == "3" ? "40px" : "50px",
              ":hover": {
                background: (theme) => alpha(theme.palette.grey[2500], 0.831),
                color: (theme) => theme.palette.common.white,
              },
            })}
            onClick={() => {
              handleClickHoverButton(data);
            }}
            aria-label="contact us"
          >
            {translate(hoverButtonName)}
          </Button>
          <CustomLink
            sx={{ width: "100%" }}
            link={
              data?.url ? `${data?.url}/${defaultSelectItem?.SII_CODE}` : ""
            }
          >
            <Button
              fullWidth
              variant="outlined"
              sx={(theme) => ({
                p: "2px",
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                borderRadius: "0px",
                border: "1px solid",
                fontWeight: 400,
                borderColor: theme.palette.common.white,
                color: (theme) => theme.palette.common.white,
                minHeight: gridView == "3" ? "40px" : "50px",
                ":hover": {
                  background: (theme) => alpha(theme.palette.grey[2500], 0.831),
                  color: (theme) => theme.palette.common.white,
                  borderColor: theme.palette.common.white,
                },
              })}
              aria-label="view detail"
            >
              {translate("ViewDetail")}
            </Button>
          </CustomLink>
        </Stack>
      </Box>
    </>
  );
};

export default HoverButton;
