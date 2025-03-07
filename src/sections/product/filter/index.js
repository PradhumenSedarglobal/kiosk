import { CustomLink } from "@/components/link";
import SkeletonProductFilter from "@/components/skeleton/product/filter";
import useResponsive from "@/hooks/useResponsive";
import useProduct from "@/provider/product/useProduct";
import { useDispatch } from "@/redux/store";
import { getQueryKeysValuesStringUrl } from "@/utils/serverSideAction";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import AccordionFilter from "./accordion";
import GridListView from "./grid";
import FilterHeading from "./heading";
import MobileFilter from "./mobileDialog";
import MobileSortBy from "./mobileDialog/sortBy";
import SortBy from "./sortBy";

const Filter = ({
  children = {},
  gridView = "",
  productFilterDropdown,
  productFilter,
  products,
}) => {
  const { productState, handleChangeGridView, handleCheckedFilterData } =
    useProduct();
  const dispatch = useDispatch();
  const { checkedFilterData } = productState;
  const router = useRouter();
  const { push, asPath, locale, query } = router;
  const { t: translate } = useTranslation();
  const isDownMd = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");

  const { slug } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";
  const sub_category = slug && slug?.length > 0 ? slug[1] : "";

  const handlePush = async (
    checked,
    keyName,
    valueName,
    isAddKey,
    secondaryKeyName,
    secondaryValueName,
    products
  ) => {
    let previousData = checkedFilterData || {};
    let newSubCategory = sub_category ? `/${sub_category}` : "";

    if (keyName === "sub_category") {
      newSubCategory = sub_category ? sub_category : valueName;
      if (checked) {
        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]:
              sub_category && valueName
                ? [
                  ...new Set([
                    sub_category,
                    valueName,
                    ...(previousData[keyName] || []),
                  ]),
                ]
                : [...new Set([valueName, ...(previousData[keyName] || [])])],
          },
        };
        newSubCategory = "";
      } else {
        newSubCategory = "";

        let removeKeys =
          checkedFilterData[keyName] && checkedFilterData[keyName]?.length > 0
            ? checkedFilterData[keyName].filter(
              (item) => item != valueName && item != newSubCategory
            )
            : [];

        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]: [...removeKeys],
            product: products,
          },
        };
      }
    } else if (keyName == "size" && !isAddKey) {
      if (checked) {
        previousData = {
          ...checkedFilterData,
          ...{
            ["min"]: [valueName?.min],
            ["max"]: [valueName?.max],
          },
        };
      }
    } else if (keyName == "Sort By") {
      if (checked) {
        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]: [valueName, ...(previousData[keyName] || [])],
            page: 1,
          },
        };
      } else {
        let removeKeys = checkedFilterData[keyName].filter(
          (item) => item != valueName
        );

        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]: [...removeKeys],
            page: 1,
          },
        };
      }
    } else if (keyName == "product") {
      if (checked) {
        newSubCategory = sub_category ? sub_category : "sub_category";
        if (previousData && previousData[keyName]) {
          previousData = {
            ...checkedFilterData,
            ...{
              [keyName]: [valueName, ...(previousData[keyName] || [])],
              ["sub_category"]:
                sub_category && secondaryValueName
                  ? [
                    ...new Set([
                      sub_category,
                      secondaryValueName,
                      ...(previousData["sub_category"] || []),
                    ]),
                  ]
                  : [
                    ...new Set([
                      secondaryValueName,
                      ...(previousData["sub_category"] || []),
                    ]),
                  ],
            },
          };
          newSubCategory = "";
        } else {
          previousData = {
            ...checkedFilterData,
            ...{
              [keyName]: [valueName],

              ["sub_category"]:
                sub_category && secondaryValueName
                  ? [
                    ...new Set([
                      sub_category,
                      secondaryValueName,
                      ...(previousData["sub_category"] || []),
                    ]),
                  ]
                  : [
                    ...new Set([
                      secondaryValueName,
                      ...(previousData["sub_category"] || []),
                    ]),
                  ],
            },
          };
          newSubCategory = "";
        }
      } else {
        let removeKeys = checkedFilterData[keyName].filter(
          (item) => item != valueName
        );

        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]: [...removeKeys],
          },
        };
      }
    } else {
      if (checked) {
        if (previousData && previousData[keyName]) {
          previousData = {
            ...checkedFilterData,
            ...{
              [keyName]: [valueName, ...(previousData[keyName] || [])],
            },
          };
        } else {
          previousData = {
            ...checkedFilterData,
            ...{
              [keyName]: [valueName],
            },
          };
        }
      } else {
        let removeKeys = checkedFilterData[keyName].filter(
          (item) => item != valueName
        );

        previousData = {
          ...checkedFilterData,
          ...{
            [keyName]: [...removeKeys],
          },
        };
      }
    }
    previousData = { ...previousData };
    handleCheckedFilterData(previousData);
    const getQueryStringUrls = getQueryKeysValuesStringUrl(false, previousData)
      ? `?${getQueryKeysValuesStringUrl(false, previousData)}`
      : "";
    push(`/${category}${newSubCategory}/${getQueryStringUrls}`);
  };

  const handleSingleAccordianReset = (keyName) => {
    let previousData = checkedFilterData;
    let newSubCategory = sub_category ? `/${sub_category}` : "";
    previousData = {
      ...checkedFilterData,
      ...{
        [keyName]: null,
      },
    };
    handleCheckedFilterData(previousData);
    const getQueryStringUrls = getQueryKeysValuesStringUrl(false, previousData)
      ? `?${getQueryKeysValuesStringUrl(false, previousData)}`
      : "";
    push(`/${category}${newSubCategory}/${getQueryStringUrls}`);
  };

  const handleReset = () => {
    handleCheckedFilterData(null);
    let pathname =
      asPath && asPath.split("?")?.length > 0 && asPath.split("?")[0];
    if (pathname != asPath) {
      push(`${pathname}`);
    }
  };

  return (
    <Box component="div" mt={{ md: 6, sm: 0, xs: 0, xxs: 0 }}>
      <Container maxWidth="xl">
        <Grid container columnSpacing={{ md: 2, sm: 0, xs: 0, xxs: 0 }}>
          <Grid item md={3.5} sm={12} xs={12} xxs={12}>
            {!isDownMd && !isUpMd && <SkeletonProductFilter />}
            {isUpMd && (
              <>
                <FilterHeading handleReset={handleReset} />
                <AccordionFilter
                  handlePush={handlePush}
                  FILTERS={
                    productFilter?.result &&
                      productFilter?.result?.FILTERS &&
                      productFilter?.result?.FILTERS?.length > 0
                      ? productFilter?.result?.FILTERS
                      : []
                  }
                  MAIN_CATEGORY={
                    productFilter?.result &&
                      productFilter?.result?.MAIN_CATEGORY &&
                      productFilter?.result?.MAIN_CATEGORY?.length > 0
                      ? productFilter?.result?.MAIN_CATEGORY
                      : []
                  }
                  PRODUCT={
                    productFilter?.result &&
                      productFilter?.result?.PRODUCT &&
                      productFilter?.result?.PRODUCT?.length > 0
                      ? productFilter?.result?.PRODUCT
                      : []
                  }
                  handleSingleAccordianReset={handleSingleAccordianReset}
                  productFilterDropdown={productFilterDropdown}
                />
              </>
            )}
          </Grid>
          <Grid item md={8.5} sm={12} xs={12} xxs={12}>
            {isUpMd && (
              <Box>
                <Breadcrumbs>
                  {products?.BREADCRUMB && (
                    <CustomLink link="/">
                      <Typography
                        color="inherit"
                        variant="typography18"
                        component="p"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {translate("Home")}
                      </Typography>
                    </CustomLink>
                  )}
                  {products?.BREADCRUMB?.PARENT_LINK_URL && (
                    <CustomLink
                      link={`/${products?.BREADCRUMB?.PARENT_LINK_URL}`}
                    >
                      <Typography
                        color="inherit"
                        variant="typography18"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {products?.BREADCRUMB?.LINK_PATH?.split("/")[1]}
                      </Typography>
                    </CustomLink>
                  )}
                  {products?.BREADCRUMB?.PARENT_LINK_URL && (
                    <CustomLink link="/">
                      <Typography
                        color="inherit"
                        variant="typography18"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {products?.BREADCRUMB?.LINK_PATH?.split("/")[3]}
                      </Typography>
                    </CustomLink>
                  )}
                </Breadcrumbs>
              </Box>
            )}
            <Card
              sx={(theme) => ({
                position: "sticky",
                top: {
                  lg: "160px",
                  md: "160px",
                  sm: "116px",
                  xs: "100px",
                  xxs: "100px",
                },
                left: 0,
                right: 0,
                zIndex: 200,
                background: theme.palette.common.white,
                boxShadow: "none",
                borderRadius: "0px",
                p: { md: 2, sm: 0, xs: 0, xxs: 0 },
                my: 0,
              })}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{
                  md: "space-between",
                  sm: "space-between",
                  xs: "space-between",
                  xxs: "space-between",
                }}
              >
                {productFilter?.result &&
                  productFilter?.result?.FILTERS &&
                  productFilter?.result?.FILTERS?.length > 0 &&
                  productFilter?.result?.FILTERS.filter(
                    (item) => item?.SFT_CODE == "010"
                  )?.length > 0 ? (
                  <Box
                    sx={{
                      width: {
                        md: "180px",
                        sm: "100%",
                        xs: "100%",
                        xxs: "50%",
                      },
                    }}
                  >
                    {isUpMd && (
                      <Box
                        component={"div"}
                        display={{
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                          xxs: "none",
                        }}
                      >
                        <SortBy
                          FILTERS={
                            productFilter?.result &&
                              productFilter?.result?.FILTERS &&
                              productFilter?.result?.FILTERS?.length > 0
                              ? productFilter?.result?.FILTERS.find(
                                (item) => item?.SFT_CODE == "010"
                              )
                              : []
                          }
                          handlePush={handlePush}
                        />
                      </Box>
                    )}
                    {isDownMd && (
                      <Box
                        component={"div"}
                        display={{
                          lg: "none",
                          md: "none",
                          sm: "block",
                          xs: "block",
                          xxs: "block",
                        }}
                        py={2}
                        sx={{
                          width: {
                            md: "100%",
                            sm: "100%",
                            xs: "100%",
                            xxs: "100%",
                          },
                        }}
                      >
                        <MobileSortBy
                          FILTERS={
                            productFilter?.result &&
                              productFilter?.result?.FILTERS &&
                              productFilter?.result?.FILTERS?.length > 0
                              ? productFilter?.result?.FILTERS.find(
                                (item) => item?.SFT_CODE == "010"
                              )
                              : []
                          }
                          handlePush={handlePush}
                        />
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box component="div" />
                )}
                {isUpMd && (
                  <Box
                    component={"div"}
                    display={{
                      lg: "block",
                      md: "block",
                      sm: "none",
                      xs: "none",
                      xxs: "none",
                    }}
                  >
                    <GridListView
                      handleChangeGridView={handleChangeGridView}
                      gridView={gridView}
                    />
                  </Box>
                )}
                {isDownMd && (
                  <Box
                    component={"div"}
                    display={{
                      lg: "none",
                      md: "none",
                      sm: "block",
                      xs: "block",
                      xxs: "block",
                    }}
                    sx={{
                      width: {
                        md: "100%",
                        sm: "100%",
                        xs: "100%",
                        xxs:
                          productFilter?.result &&
                            productFilter?.result?.FILTERS &&
                            productFilter?.result?.FILTERS?.length > 0
                            ? "50%"
                            : "100%",
                      },
                    }}
                  >
                    <MobileFilter
                      productFilter={productFilter}
                      handlePush={handlePush}
                      handleSingleAccordianReset={handleSingleAccordianReset}
                      productFilterDropdown={productFilterDropdown}
                      handleReset={handleReset}
                    />
                  </Box>
                )}
              </Stack>
            </Card>
            {isDownMd && (
              <Box
                mb={2}
                display={{
                  lg: "none",
                  md: "none",
                  sm: "block",
                  xs: "block",
                  xxs: "block",
                }}
              >
                <Breadcrumbs>
                  {products?.BREADCRUMB && (
                    <CustomLink link="/">
                      <Typography
                        color={(theme) => theme.palette.grey[7300]}
                        variant="typography17"
                        component="p"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {translate("Home")}
                      </Typography>
                    </CustomLink>
                  )}
                  {products?.BREADCRUMB?.PARENT_LINK_URL && (
                    <CustomLink
                      link={`/${products?.BREADCRUMB?.PARENT_LINK_URL}`}
                    >
                      <Typography
                        color={(theme) => theme.palette.grey[7300]}
                        variant="typography17"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {products?.BREADCRUMB?.LINK_PATH?.split("/")[1]}
                      </Typography>
                    </CustomLink>
                  )}
                  {products?.BREADCRUMB?.PARENT_LINK_URL && (
                    <CustomLink link="/">
                      <Typography
                        color={(theme) => theme.palette.grey[7300]}
                        variant="typography17"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {products?.BREADCRUMB?.LINK_PATH?.split("/")[3]}
                      </Typography>
                    </CustomLink>
                  )}
                </Breadcrumbs>
              </Box>
            )}
            <Box sx={{ px: { md: 0, sm: 0, xs: 0, xxs: 0 } }}>{children}</Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Filter.propTypes = {
  handleChangeGridView: PropTypes.func,
  gridView: PropTypes.any,
  children: PropTypes.object,
};

export default Filter;
