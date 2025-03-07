import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InfoDilogueButton from "./infoDilogueButton";
const RadioCheckBoxDilog = ({ elem }) => {
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography
        sx={(theme) => ({
          textAlign: "center",
          fontFamily: theme.fontFaces.helveticaNeue,
          fontSize: theme.typography.typography13,
          color: theme.palette.common.black,
        })}
      >
        {elem?.SPS_DESC}
      </Typography>
      <InfoDilogueButton
        open={openInfo}
        setOpen={setOpenInfo}
        // image={cardImage}
        headingText={elem?.SPS_DESC}
        subHeadingText={elem?.SPS_MORE}
      />
    </Stack>
  );
};

export default RadioCheckBoxDilog;
