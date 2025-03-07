import { MUICheckBox } from "@/components/form";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";

const RoomTypeFilter = ({ item = "" }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      sx={{
        "&.MuiAccordion-root": {
          boxShadow: "none",
          ":before": {
            height: "0px!important",
            overflow: "hidden",
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded !== "panel1" ? (
            <Add fontSize="small" color="common.black" />
          ) : (
            <Remove fontSize="small" color="common.black" />
          )
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={(theme) => ({
          "& .MuiAccordionSummary-content": {
            ":after": {
              content: "''",
              height: "1px",
              position: "absolute",
              bottom: 0,
              left: "50%",
              background: theme.palette.divider,
              width: "94%",
              textAlign: "center",
              transform: "translate(-50%, -50%)",
            },
          },
        })}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            component="p"
            mb={0}
            variant="typography15"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            color="common.black"
          >
            Room Type
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {item && item?.TAGS?.length > 0
          ? item?.TAGS.map((item, index) => {
            return (
              <MUICheckBox
                size="small"
                fullWidth
                key={`COLOR-${item?.DESCRIPTION}-${index}`}
                name="color"
                label={
                  <Typography
                    component="span"
                    mb={0}
                    variant="typography14"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    fontWeight={500}
                    color="common.black"
                    sx={{ width: "100%" }}
                  >
                    {item?.DESCRIPTION}
                  </Typography>
                }
                checked
              />
            );
          })
          : ""}
      </AccordionDetails>
    </Accordion>
  );
};


RoomTypeFilter.propTypes = {
  item: PropTypes.string,

};


export default RoomTypeFilter;
