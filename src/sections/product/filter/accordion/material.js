import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { getMatchedKeyOrItemKey, getValueIgnoreCase } from "@/utils/matchCaseSensitive";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const MaterialFilter = ({
  item = "",
  handleSingleAccordianReset,
  handlePush,
}) => {
  const [expanded, setExpanded] = React.useState("panel1");
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const { query } = useRouter();
  const itemKey = item?.DESCRIPTION_EN || "";
  const queryParamsKey = getMatchedKeyOrItemKey(query, itemKey);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      sx={{
        "&.MuiAccordion-root": {
          "&.Mui-expanded": {
            margin: "0px 0",
          },
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
        <Stack
          direction="row"
          alignItems="center"
          sx={{ width: "100%" }}
          justifyContent="space-between"
          mr={1}
        >
          <Typography
            component="p"
            mb={0}
            variant="typography15"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            color="common.black"
          >
            {item?.DESCRIPTION}
          </Typography>
          {checkedFilterData?.[item?.DESCRIPTION] &&
            checkedFilterData?.[item?.DESCRIPTION]?.length && (
              <Typography
                color="primary"
                onClick={() => handleSingleAccordianReset(item?.DESCRIPTION)}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                variant="typography14"
                component="p"
              >
                {translate("Clear")}
              </Typography>
            )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingBottom: "0px!important" }}>
        {item && item?.TAGS?.length > 0
          ? item?.TAGS.map((childItem, index) => {
            const getCheckedValue = getValueIgnoreCase(
              checkedFilterData,
              queryParamsKey
            );
            return (
              <MUICheckBox
                size="small"
                fullWidth
                key={`MATERIAL-${childItem?.DESCRIPTION}-${index}`}
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
                    {childItem?.DESCRIPTION}
                  </Typography>
                }
                checked={
                  getCheckedValue && getCheckedValue?.length > 0
                    ? getCheckedValue.includes(childItem?.DESCRIPTION_EN)
                    : false
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    handlePush(
                      e.target.checked,
                      queryParamsKey,
                      childItem?.DESCRIPTION_EN,
                      false
                    );
                  } else {
                    handlePush(
                      e.target.checked,
                      queryParamsKey,
                      childItem?.DESCRIPTION_EN,
                      false
                    );
                  }
                }}
              />
            );
          })
          : ""}
      </AccordionDetails>
    </Accordion>
  );
};

MaterialFilter.propTypes = {
  item: PropTypes.string,
};

export default MaterialFilter;
