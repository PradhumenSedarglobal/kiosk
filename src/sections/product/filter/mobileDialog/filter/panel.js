import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { setActivePage } from "@/redux/slices/product";
import { useDispatch } from "@/redux/store";
import { capitalizeFirstLetterOnly } from "@/utils/constant";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SizeFilter from "../sizeFilter";

const MobileTabPanel = ({
  productFilter,
  handlePush,
  handleClose,
  handleSingleAccordianReset,
  productFilterDropdown,
  handleWidthSliderChange,
  handleHeightSliderChange,
  widthFilter,
  heightFilter,
}) => {
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const dispatch = useDispatch();
  const { query, push } = useRouter();
  const { slug, page } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";

  const handleSelect = (item) => {
    if (page) {
      dispatch(setActivePage(1));
    }

    if (item) {
      push({
        pathname: `${item?.SC_LINK_URL}`,
      });
    }
  };
  return (
    productFilter &&
    productFilter?.MOBILE_DATA &&
    productFilter?.MOBILE_DATA?.FILTERS?.length > 0 &&
    productFilter?.MOBILE_DATA?.FILTERS.map((parentElement, parentIndex) => {
      if (parentElement.SFT_CODE == "012") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
          >
            {checkedFilterData?.["size"] &&
              checkedFilterData?.["size"]?.length &&
              parentElement?.SIZE_FILTER_BY == "CHECKBOX" && (
                <Typography
                  color="primary"
                  onClick={() => handleSingleAccordianReset("size")}
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  variant="typography14"
                  component="p"
                  textAlign="right"
                >
                  {translate("Clear")}
                </Typography>
              )}
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <SizeFilter
                      item={childElement}
                      handlePush={handlePush}
                      isCheckBox={parentElement?.SIZE_FILTER_BY == "CHECKBOX"}
                      handleWidthSliderChange={handleWidthSliderChange}
                      handleHeightSliderChange={handleHeightSliderChange}
                      widthFilter={widthFilter}
                      heightFilter={heightFilter}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement?.SFT_CODE == "014") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {checkedFilterData?.[parentElement?.DESCRIPTION_EN] &&
              checkedFilterData?.[parentElement?.DESCRIPTION_EN]?.length && (
                <Typography
                  color="primary"
                  onClick={() =>
                    handleSingleAccordianReset(parentElement?.DESCRIPTION_EN)
                  }
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  variant="typography14"
                  component="p"
                  textAlign="right"
                >
                  {translate("Clear")}
                </Typography>
              )}
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        checkedFilterData &&
                          checkedFilterData[parentElement?.DESCRIPTION_EN]
                          ? checkedFilterData[
                            parentElement?.DESCRIPTION_EN
                          ].includes(childElement?.DESCRIPTION_EN)
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        } else {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement?.SFT_CODE == "009") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {checkedFilterData?.[parentElement?.DESCRIPTION_EN] &&
              checkedFilterData?.[parentElement?.DESCRIPTION_EN]?.length && (
                <Typography
                  color="primary"
                  onClick={() =>
                    handleSingleAccordianReset(parentElement?.DESCRIPTION_EN)
                  }
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  variant="typography14"
                  component="p"
                  textAlign="right"
                >
                  {translate("Clear")}
                </Typography>
              )}
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        checkedFilterData &&
                          checkedFilterData[parentElement?.DESCRIPTION_EN]
                          ? checkedFilterData[
                            parentElement?.DESCRIPTION_EN
                          ].includes(childElement?.DESCRIPTION_EN)
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        } else {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement.value == "PRODUCT-007") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={childElement?.SC_LINK_URL == category}
                      onChange={(e) => {
                        if (e.target.checked) {
                          let data =
                            productFilterDropdown &&
                            productFilterDropdown?.length > 0 &&
                            productFilterDropdown
                              ?.filter(
                                (item) =>
                                  item?.SC_LINK_URL ===
                                  childElement?.SC_LINK_URL
                              )
                              .find((item) => {
                                return item;
                              });
                          handleSelect(data);
                          handleClose();
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement.value == "CATEGORIES-008") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                let subCategoryUrl =
                  childElement?.SC_LINK_URL &&
                    childElement?.SC_LINK_URL?.split("?")
                    ? childElement?.SC_LINK_URL.split("?")[0]
                    : childElement?.SC_LINK_URL;

                let productUrl =
                  childElement?.SC_REDIRECT_URL &&
                    childElement?.SC_REDIRECT_URL?.split("&")
                    ? childElement?.SC_REDIRECT_URL?.split("&")?.some(
                      (checkItem) => {
                        let checked = false;

                        if (checkItem?.split("=")[0] == "product") {
                          checked =
                            checkedFilterData["product"] &&
                            checkedFilterData["product"].includes(
                              checkItem?.split("=")[1]
                            );
                        }

                        return checked;
                      }
                    )
                    : false;

                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        (checkedFilterData &&
                          checkedFilterData["sub_category"] &&
                          checkedFilterData["sub_category"].includes(
                            subCategoryUrl
                          )) ||
                        productUrl
                      }
                      value={
                        checkedFilterData &&
                        checkedFilterData["sub_category"] &&
                        checkedFilterData["sub_category"].includes(
                          subCategoryUrl
                        )
                      }
                      onChange={async (e) => {
                        if (e.target.checked) {
                          await handlePush(
                            e.target.checked,
                            "sub_category",
                            subCategoryUrl,
                            childElement
                          );
                          handleClose();
                        } else {
                          await handlePush(
                            e.target.checked,
                            "sub_category",
                            subCategoryUrl,
                            childElement
                          );
                          handleClose();
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement.value == "SUB-CATEGORIES-011") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        (checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            childElement?.SPI_LINK_URL
                          )) ||
                        (checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            capitalizeFirstLetterOnly(
                              childElement?.DESCRIPTION_EN
                            )
                          )) ||
                        false
                      }
                      value={
                        (checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            childElement?.SPI_LINK_URL
                          )) ||
                        (checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            capitalizeFirstLetterOnly(
                              childElement?.DESCRIPTION_EN
                            )
                          )) ||
                        false
                      }
                      onChange={(e) => {
                        let selectedValue = "";
                        if (
                          checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            childElement?.SPI_LINK_URL
                          )
                        ) {
                          selectedValue = childElement?.SPI_LINK_URL;
                        } else if (
                          checkedFilterData &&
                          checkedFilterData["product"] &&
                          checkedFilterData["product"].includes(
                            capitalizeFirstLetterOnly(
                              childElement?.DESCRIPTION_EN
                            )
                          )
                        ) {
                          selectedValue = capitalizeFirstLetterOnly(
                            childElement?.DESCRIPTION_EN
                          );
                        } else {
                          selectedValue = childElement?.SPI_LINK_URL;
                        }

                        handlePush(
                          e.target.checked,
                          "product",
                          selectedValue,
                          false,
                          "product_sub_category",
                          childElement.SC_LINK_URL,
                          false
                        );
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (
        parentElement.SFT_CODE != "010" &&
        parentElement.SFT_CODE != "012" &&
        parentElement.SFT_CODE != "013" &&
        parentElement.SFT_CODE != "014"
      ) {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {checkedFilterData?.[parentElement?.DESCRIPTION_EN] &&
              checkedFilterData?.[parentElement?.DESCRIPTION_EN]?.length && (
                <Typography
                  color="primary"
                  onClick={() =>
                    handleSingleAccordianReset(parentElement?.DESCRIPTION_EN)
                  }
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  variant="typography14"
                  component="p"
                  textAlign="right"
                >
                  {translate("Clear")}
                </Typography>
              )}
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        checkedFilterData &&
                          checkedFilterData[parentElement?.DESCRIPTION_EN]
                          ? checkedFilterData[
                            parentElement?.DESCRIPTION_EN
                          ].includes(childElement?.DESCRIPTION_EN)
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        } else {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      } else if (parentElement.SFT_CODE == "006") {
        return (
          <TabPanel
            key={`PARENT-MOBILE_DESCRIT-${parentIndex}-${parentElement?.label}`}
            value={String(parentElement?.value)}
            sx={{ paddingBottom: "85px" }}
          >
            {checkedFilterData?.[parentElement?.DESCRIPTION_EN] &&
              checkedFilterData?.[parentElement?.DESCRIPTION_EN]?.length && (
                <Typography
                  color="primary"
                  onClick={() =>
                    handleSingleAccordianReset(parentElement?.DESCRIPTION_EN)
                  }
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  variant="typography14"
                  component="p"
                  textAlign="right"
                >
                  {translate("Clear")}
                </Typography>
              )}
            {parentElement?.TAGS &&
              parentElement?.TAGS?.length > 0 &&
              parentElement?.TAGS?.map((childElement, childIndex) => {
                return (
                  <Box
                    key={`CHILDELEEMNT-MOBILE_DESCRIT-${parentIndex + 1}-${childIndex + 2
                      }-${childElement?.DESCRIPTION}`}
                  >
                    <MUICheckBox
                      size="small"
                      fullWidth
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
                          {childElement?.DESCRIPTION}
                        </Typography>
                      }
                      checked={
                        checkedFilterData &&
                          checkedFilterData[parentElement?.DESCRIPTION_EN]
                          ? checkedFilterData[
                            parentElement?.DESCRIPTION_EN
                          ].includes(childElement?.DESCRIPTION_EN)
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        } else {
                          handlePush(
                            e.target.checked,
                            parentElement?.DESCRIPTION_EN,
                            childElement?.DESCRIPTION_EN,
                            false
                          );
                          handleClose();
                        }
                      }}
                    />
                  </Box>
                );
              })}
          </TabPanel>
        );
      }
    })
  );
};

export default MobileTabPanel;
