import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { NextFillImage } from "@/components/image";
import { useTranslation } from "next-i18next";
const SideTab = ({ setTabChange, tabChange, data, index }) => {
  const { t: translate } = useTranslation();
  return (
    <Box
      onClick={() => setTabChange(index + 1)}
      py={2}
      sx={(theme) => ({
        cursor: "pointer",
        backgroundColor:
          tabChange == index + 1 ? theme.palette.primary.main : "#fafafa",
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
      })}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={{ xl: 3, lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeue,
            fontSize: theme.typography.typography12,
            color:
              tabChange == index + 1
                ? theme.palette.common.white
                : theme.palette.grey[2800],
          })}
        >
          {translate("Step")} {index + 1}
        </Typography>
        <NextFillImage
          src={data?.SPS_IMAGE_PATH}
          alt={data?.SPS_IMAGE_PATH}
          sx={{
            width: "100%!important",
            height: "100%!important",
            objectFit: "contain",
            backgroundSize: "contain",
            "&.MuiCard-root": {
              borderRadius: 0,
              boxShadow: "none",
              position: "relative!important",
              width: "28%!important",
              height: "100%!important",
            },
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
          objectFit="contain"
        />
        <Typography
          sx={(theme) => ({
            textAlign: "center",
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography12,

            color:
              tabChange == index + 1
                ? theme.palette.common.white
                : theme.palette.common.black,
          })}
        >
          {data?.SPS_DESC}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SideTab;
