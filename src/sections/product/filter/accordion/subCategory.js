import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { capitalizeFirstLetterOnly } from "@/utils/constant";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const SubCategoryFilter = ({ PRODUCT, handlePush }) => {
  const { t: translate } = useTranslation();
  const [expanded, setExpanded] = React.useState("panel1");
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {PRODUCT &&
        PRODUCT.some((item) => item?.SC_SHOW_IN_FILTER_YN === "Y") && (
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
              <Box sx={{ width: "100%" }}>
                <Typography
                  component="p"
                  mb={0}
                  variant="typography15"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  color="common.black"
                >
                  {translate("SubCategory")}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingBottom: "0px!important" }}>
              {PRODUCT &&
                PRODUCT.length > 0 &&
                PRODUCT.map((item, index) => {
                  if (item?.SC_SHOW_IN_FILTER_YN === "Y") {
                    return (
                      <MUICheckBox
                        size="small"
                        fullWidth
                        key={`SUB-CATEGORY-${item?.DESCRIPTION_EN}-${index}`}
                        name="color"
                        label={
                          <Typography
                            component="span"
                            mb={0}
                            variant="typography14"
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                            fontWeight={500}
                            color="common.black"
                            sx={{ width: "100%" }}
                          >
                            {item?.DESCRIPTION}
                          </Typography>
                        }
                        checked={
                          (checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              item?.SPI_LINK_URL
                            )) ||
                          (checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              capitalizeFirstLetterOnly(item?.DESCRIPTION_EN)
                            )) ||
                          false
                        }
                        value={
                          (checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              item?.SPI_LINK_URL
                            )) ||
                          (checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              capitalizeFirstLetterOnly(item?.DESCRIPTION_EN)
                            )) ||
                          false
                        }
                        onChange={(e) => {
                          let selectedValue = "";
                          if (
                            checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              item?.SPI_LINK_URL
                            )
                          ) {
                            selectedValue = item?.SPI_LINK_URL;
                          } else if (
                            checkedFilterData &&
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              capitalizeFirstLetterOnly(item?.DESCRIPTION_EN)
                            )
                          ) {
                            selectedValue = capitalizeFirstLetterOnly(
                              item?.DESCRIPTION
                            );
                          } else {
                            selectedValue = item?.SPI_LINK_URL;
                          }

                          handlePush(
                            e.target.checked,
                            "product",
                            selectedValue,
                            false,
                            "product_sub_category",
                            item.SC_LINK_URL,
                            false
                          );
                        }}
                      />
                    );
                  }
                  return null;
                })}
            </AccordionDetails>
          </Accordion>
        )}
    </>
  );
};

export default SubCategoryFilter;
