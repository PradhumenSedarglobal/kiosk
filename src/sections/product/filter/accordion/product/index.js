import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { useDispatch } from "@/redux/store";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import CategoryFilter from "./category";

const ProductFilter = ({
  MAIN_CATEGORY,
  handlePush,
  productFilterDropdown,
  PRODUCT,
}) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const { query, push } = useRouter();
  const { slug } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";
  const sub_category = slug && slug?.length > 0 ? slug[1] : null;
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
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
              {translate("Products")}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingBottom: "0px!important" }}>
          <CategoryFilter
            MAIN_CATEGORY={MAIN_CATEGORY}
            productFilterDropdown={productFilterDropdown}
          />

          {MAIN_CATEGORY &&
            MAIN_CATEGORY?.length > 0 &&
            MAIN_CATEGORY?.filter((item) => item?.SC_LINK_URL === category).map(
              (item, index) => {
                return item?.CATEGORY && item?.CATEGORY?.length > 0
                  ? item?.CATEGORY.map((childItem, childIndex) => {
                    let subCategoryUrl =
                      childItem?.SC_LINK_URL &&
                        childItem?.SC_LINK_URL?.split("?")?.length > 0
                        ? childItem?.SC_LINK_URL.split("?")[0]
                        : childItem?.SC_LINK_URL;
                    return (
                      <MUICheckBox
                        size="small"
                        fullWidth
                        key={`SUB-Product-${childItem?.DESCRIPTION}-${index}-${childIndex}`}
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
                            {childItem?.DESCRIPTION}
                          </Typography>
                        }
                        checked={
                          (checkedFilterData &&
                            checkedFilterData["sub_category"] &&
                            checkedFilterData["sub_category"].includes(
                              subCategoryUrl
                            )) ||
                          subCategoryUrl == sub_category
                        }
                        value={
                          (checkedFilterData &&
                            checkedFilterData["sub_category"] &&
                            checkedFilterData["sub_category"].includes(
                              subCategoryUrl
                            )) ||
                          subCategoryUrl == sub_category
                        }
                        onChange={async (e) => {
                          if (e.target.checked) {
                            await handlePush(
                              e.target.checked,
                              "sub_category",
                              subCategoryUrl,
                              childItem
                            );
                          } else {
                            const getSubCategories =
                              PRODUCT &&
                              PRODUCT?.length > 0 &&
                              PRODUCT.filter(
                                (v) => v?.SC_LINK_URL === subCategoryUrl
                              );

                            const removeAllSubCategories =
                              checkedFilterData["product"] &&
                              checkedFilterData["product"]?.length > 0 &&
                              checkedFilterData["product"]?.filter(
                                (p) =>
                                  !getSubCategories.some(
                                    (item) => item?.SPI_LINK_URL == p
                                  )
                              );
                            await handlePush(
                              e.target.checked,
                              "sub_category",
                              subCategoryUrl,
                              childItem,
                              "",
                              "",
                              removeAllSubCategories
                            );
                          }
                        }}
                      />
                    );
                  })
                  : "";
              }
            )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProductFilter;
