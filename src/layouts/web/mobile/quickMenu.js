import { NextImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles"; // Import alpha separately from styles
import { useRouter } from "next/router";

const QuickMenu = ({ layout }) => {
  const { locale } = useRouter();
  return (
    <Box
      sx={{
        boxShadow: (theme) =>
          `inset 0 3px 13px -10px ${theme.palette.grey[2000]}`,
        background: (theme) => theme.palette.grey[1500],
        padding: "7px 0",
        display: "block",
      }}
    >
      {layout?.HEADER?.MIDMENU?.[0] && (
        <Stack direction="row" justifyContent="center" spacing={1}>
          <CustomLink
            link={layout?.HEADER?.MIDMENU?.[0]?.link_url}
            locale={locale}
          >
            <Typography
              component="p"
              variant="typography14"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              sx={{
                padding: "10px 8px",
                boxShadow: (theme) =>
                  `0 1px 2px 0 ${alpha(theme.palette.common.black, 0.1)}`,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: (theme) => theme.palette.common.white,
                width: "100%",
                textAlign: "center",
              }}
            >
              <NextImage
                src={layout?.HEADER?.MIDMENU?.[0]?.image_path}
                alt={layout?.HEADER?.MIDMENU?.[0]?.content}
                sx={{
                  width: "32px!important",
                  height: "24px!important",
                  objectFit: "contain",
                  backgroundSize: "contain",
                  "&.MuiCard-root": {
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                    width: "32px!important",
                    height: "30px!important",
                  },
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              />

              {layout?.HEADER?.MIDMENU?.[0]?.content}
            </Typography>
          </CustomLink>
          <CustomLink
            link={layout?.HEADER?.MIDMENU?.[1]?.link_url}
            locale={locale}
          >
            <Typography
              component="p"
              variant="typography14"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              sx={{
                padding: "10px 8px",
                boxShadow: (theme) =>
                  `0 1px 2px 0 ${alpha(theme.palette.common.black, 0.1)}`,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: (theme) => theme.palette.common.white,
                width: "100%",
                textAlign: "center",
              }}
            >
              <NextImage
                src={layout?.HEADER?.MIDMENU?.[1]?.image_path}
                alt={layout?.HEADER?.MIDMENU?.[1]?.content}
                sx={{
                  width: "32px!important",
                  height: "24px!important",
                  objectFit: "contain",
                  backgroundSize: "contain",
                  "&.MuiCard-root": {
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                     width: "32px!important",
                    height: "30px!important",
                  },
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              />
              {layout?.HEADER?.MIDMENU?.[1]?.content}
            </Typography>
          </CustomLink>
        </Stack>
      )}
    </Box>
  );
};

export default QuickMenu;
