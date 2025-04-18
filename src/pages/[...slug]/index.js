import PdpShema from "@/modules/PdpSchema";
import PlpSchema from "@/modules/PlpSchema";
import React, { useState } from "react";


import { useDispatch } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import {
  getKeysValuesData,
  getQueryKeysStringUrl,
  getQueryKeysValuesObject,
  getQueryKeysValuesStringUrl,
  getQueryString,
  getQueryValuesStringUrl,
  setClientSideReduxCookie,
} from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
// import Head from "next/head";
import CustomizationSlug from "@/sections/slug/customization";
import ProductLists from "@/sections/slug/product";
import ProductDetail from "@/sections/slug/productDetail";
import ProductSlug from "@/sections/slug/ProductSlug";
import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CartManager from "@/components/CartManager";
import { useSelector } from "react-redux";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";


import {
  setCustomization,
  setHeaderResponse,
} from "@/redux/slices/customization";

export const getServerSideProps = async (context) => {
  console.time("getServerSideProps");
  const { locale, query, res, req } = context;
  const { cookies } = req;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );
  const { slug } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";
  const sub_category = (slug && slug.length > 0 && slug[1]) || "";
  const product = (slug && slug.length > 1 && slug[2]) || "";
  const item = (slug && slug.length > 2 && slug[3]) || "";
  const category_seo = query?.slug[query?.slug.length - 1]
    ? query?.slug[query?.slug.length - 1]
    : "";
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;
  const queryKeysString = getQueryKeysStringUrl(query);

  const queryValuesString = getQueryValuesStringUrl(query);

  const QueryKeysValues = getQueryKeysValuesObject(true, query);

  const commonFilterQuery = {
    ...(sub_category ? { sub_category: sub_category } : {}),
    ...(QueryKeysValues || {}),
    category: category,
    limit: "21",
    filters: queryKeysString,
    filter_values: queryValuesString,
  };

  //  CUSTOMIZATION QUERY

  const sys_id = slug && slug.length === 7 ? slug[6] : 0;
  const customization_slug_url = product;

  // CUSTOMIZATION END QUERY

  if (!slug?.includes("customize") && slug?.length <= 2) {
    const firstData = await apiSSRV2DataService.getAll({
      path: `v2/first`,
      param: commonFilterQuery,
      //cookies: GET_ALL_COOKIES,
      locale: locale,
    });

    const productType =
      firstData?.result?.BANNER?.SC_REDIRECT_TO === "PRODUCT" ||
      firstData?.result?.BANNER?.[0]?.SC_REDIRECT_TO == "PRODUCT"
        ? "PRODUCT"
        : "BROWSE_COLLECTION";

    if (productType !== "PRODUCT") {
      const getFilterKeysValuesData = getKeysValuesData(query) || null;

      const [productLayout, productsData, productFilter] = await Promise.all([
        LayoutData({
          params: { seo_type: "PRODUCT", page_name: category_seo },
          //cookies: GET_ALL_COOKIES,
          locale: locale,
        }),
        apiSSRV2DataService.getAll({
          path: `v2/third`,
          asPath: getQueryString(commonFilterQuery),
          //cookies: GET_ALL_COOKIES,
          locale: locale,
        }),
        apiSSRV2DataService.getAll({
          path: `v2/filters`,
          asPath: getQueryString(commonFilterQuery),
          //cookies: GET_ALL_COOKIES,
          locale: locale,
        }),
      ]);

      const newSubCategory = sub_category ? `/${sub_category}` : "";
      if (
        !productFilter?.result?.PRODUCT?.length &&
        !productsData?.result?.MATERIAL?.result?.length
      ) {
        return {
          redirect: {
            destination: `/${locale}`,
            statusCode: 301,
          },
        };
      }
      if (
        productsData?.result?.MATERIAL?.active_page >
        productsData?.result?.MATERIAL?.page_count
      ) {
        const data = { ...query, page: 1 };
        const getQueryStringUrls = getQueryKeysValuesStringUrl(true, data)
          ? `?${getQueryKeysValuesStringUrl(true, data)}`
          : "";

        return {
          redirect: {
            destination: `/${locale}/${category}/${newSubCategory}/${getQueryStringUrls}`,
            statusCode: 301,
          },
        };
      }

      if (
        !productFilter?.result?.PRODUCT?.length ||
        productFilter?.result?.CSP !== undefined
      ) {
        const destination = locale === "default" ? "/" : `/${locale}`;
        return {
          redirect: {
            destination,
            statusCode: 301,
          },
        };
      }

      if (
        productFilter?.result?.PRODUCT?.length > 0 &&
        productsData?.result?.MATERIAL?.result?.length <= 0 &&
        newSubCategory &&
        !isEmpty(getFilterKeysValuesData)
      ) {
        return {
          redirect: {
            destination: `/${locale}/${category}/${newSubCategory}`,
            statusCode: 301,
          },
        };
      }
      console.timeEnd("getServerSideProps");
      return {
        props: {
          ...(await serverSideTranslations(locale, ["common"], null, [
            "en",
            "no",
          ])),
          slug: slug,
          SC_LINK_URL: category,
          getFilterKeysValuesData: getFilterKeysValuesData,
          productFilter: productFilter,
          productLayout: productLayout || null,
          productType: productType,
          productsData: productsData,
          firstData: firstData,
          // Will be passed to the page component as props
        },
      };
    } else {
      const [productLayout, productsSlugPageData] = await Promise.all([
        LayoutData({
          params: { seo_type: "PRODUCT", page_name: category_seo },
          //cookies: GET_ALL_COOKIES,
          locale: locale,
        }),
        apiSSRV2DataService.getAll({
          path: `v2/product/third`,
          param: {
            content: "product_category_listing",
            category_redirect_type: "product",
            category_slug: category,
            slug_url: query?.sub_category ? query?.sub_category : sub_category,
            filters: "",
          },
          //cookies: GET_ALL_COOKIES,
          locale: locale,
        }),
      ]);
      console.timeEnd("getServerSideProps");
      return {
        props: {
          ...(await serverSideTranslations(locale, ["common"], null, [
            "en",
            "no",
          ])),
          slug: slug,
          SC_LINK_URL: category,
          productLayout: productLayout,
          productType: productType,
          firstData: firstData,
          productsSlugPageData: productsSlugPageData,
          // Will be passed to the page component as props
        },
      };
    }
  } else if (
    !slug?.includes("customize") &&
    slug?.length >= 3 &&
    slug?.length <= 5
  ) {
    const [productLayout, productDetails, similarProducts] = await Promise.all([
      LayoutData({
        params: {
          seo_type: "ITEM",
          page_back_slug: query?.slug[query?.slug.length - 2]
            ? query?.slug[query?.slug.length - 2]
            : "undefined",
          page_name: category_seo,
        },
        //cookies: GET_ALL_COOKIES,
        locale: locale,
      }),
      apiSSRV2DataService.getAll({
        path: `v2/detail`,
        param: {
          content: "item_detail",
          category: category,
          sub_category: sub_category,
          product: product,
          item: item,
          filters: queryKeysString,
          filter_values: queryValuesString,
          ...(QueryKeysValues || {}),
        },
        //cookies: GET_ALL_COOKIES,
        locale: locale,
      }),
      apiSSRV2DataService.getAll({
        path: `v2/item_specification`,
        param: {
          content: "item_specification",
          category: category,
          sub_category: sub_category,
          slug_url: product,
          item: item,
          family:
            context && context.query && context.query.family
              ? context.query.family
              : "",
        },
        //cookies: GET_ALL_COOKIES,
        locale: locale,
      }),
    ]);
    if (
      productDetails?.result?.COMPONENT &&
      productDetails?.result?.COMPONENT?.length &&
      productDetails?.result?.COMPONENT?.[0] &&
      productDetails?.result?.COMPONENT?.[0]?.PARENT &&
      productDetails?.result?.COMPONENT?.[0]?.PARENT?.LISTING?.length <= 0
    ) {
      if (locale == "default") {
        return {
          redirect: {
            destination: `/`,
            statusCode: 301,
          },
        };
      } else {
        return {
          redirect: {
            destination: `/${locale}`,
            statusCode: 301,
          },
        };
      }
    }
    console.timeEnd("getServerSideProps");
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        productLayout: productLayout,
        slug: slug,
        productDetails: productDetails,
        itemCode: item,
        similarProducts: similarProducts || null,
        // Will be passed to the page component as props
      },
    };
  } else if (
    slug?.includes("customize") &&
    slug?.length >= 3 &&
    slug?.length <= 7
  ) {
    const customizationRes = await apiSSRV2DataService.getAll({
      path: `kiosk/get_steps`,
      param: {
        content: "customization",
        slug_url: customization_slug_url,
        sys_id: sys_id,
      },
      //cookies: GET_ALL_COOKIES,
      locale: locale,
    });

    const header_response = await apiSSRV2DataService.getAll({
      path: `v2/getHeaderData`,
      param: {
        content: "Contact Info",
        column_name: "SH_LINK_URL",
        column_value: "tel:",
      },
      //cookies: GET_ALL_COOKIES,
      locale: locale,
    });

    if (
      customizationRes?.result?.COMPONENT[0]?.PARENT.CHILD?.return_status ==
      "-1"
    ) {
      if (locale == "default") {
        return {
          redirect: {
            destination: `/`,
            statusCode: 301,
          },
        };
      } else {
        return {
          redirect: {
            destination: `/${locale}`,
            statusCode: 301,
          },
        };
      }
    }
    console.timeEnd("getServerSideProps");
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: null,
        customizationRes: customizationRes,
        slug: slug,
        headerResponse: header_response,
        customization_slug_url: customization_slug_url,
        sys_id: sys_id,
        // Will be passed to the page component as props
      },
    };
  } else {
    if (locale == "default") {
      return {
        redirect: {
          destination: `/`,
          statusCode: 301,
        },
      };
    } else {
      return {
        redirect: {
          destination: `/${locale}`,
          statusCode: 301,
        },
      };
    }
  }
};

export default function ProductPage(props) {
  // console.log(props,'homepage prop');
  // return false;

  const router = useRouter();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { slug } = props;
  const {
    SC_LINK_URL,
    getFilterKeysValuesData,
    productFilter,
    productLayout,
    productType,
    productsData,
    firstData,
    productsSlugPageData,
    customizationRes,
    headerResponse,
  } = props;
  const [open, setOpen] = useState(false);
  const fonts = useSelector((state) => state.font);

  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // console.log(customizationRes, 'customizationRes1');
  React.useEffect(() => {
    if (slug?.includes("customize") && slug?.length >= 3 && slug?.length <= 7) {
      dispatch(setCustomization(customizationRes));
      dispatch(setHeaderResponse(headerResponse));
    }
    // console.log(customizationRes, 'customizationRes2');
  }, [customizationRes, slug]);

  React.useEffect(() => {
    if (slug?.includes("customize") && slug?.length >= 3 && slug?.length <= 7) {
      setClientSideReduxCookie({ dispatch: dispatch, router: router });
    }
  }, [slug, router]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { orderList, resetCanvasScene } = useSelector(
    (state) => state.customization
  );

  const { result = {} } = productFilter || {};
  const filters = result.FILTERS || [];
  const newFilterArray = [];

  const addFilter = (element) => {
    newFilterArray.push({
      ...element,
      label: element.DESCRIPTION,
      value: element.SFT_CODE,
    });
  };

  filters.forEach((element) => {
    const { SFT_CODE } = element;
    if (
      SFT_CODE === "012" ||
      SFT_CODE === "014" ||
      SFT_CODE === "009" ||
      SFT_CODE === "006"
    ) {
      addFilter(element);
    } else if (!["010", "013"].includes(SFT_CODE)) {
      addFilter(element);
    }
  });

  if (result?.MAIN_CATEGORY?.length) {
    newFilterArray.push(
      {
        TAGS: result?.MAIN_CATEGORY,
        label: translate("Products"),
        value: "PRODUCT-007",
      },
      {
        TAGS: result?.MAIN_CATEGORY[0]?.CATEGORY,
        label: translate("Categories"),
        value: "CATEGORIES-008",
      },
      {
        TAGS:
          (result?.PRODUCT &&
            result?.PRODUCT?.length > 0 &&
            result?.PRODUCT.filter(
              (item) => item?.SC_SHOW_IN_FILTER_YN === "Y"
            )) ||
          [],
        label: translate("SubCategories"),
        value: "SUB-CATEGORIES-011",
      }
    );
  }

  const data =
    result.MAIN_CATEGORY?.map((item) => ({
      ...item,
      label: item.DESCRIPTION,
      value: item.SC_LINK_URL,
    })) || [];

  const productFilterDropdown = data;

  const mainCategory = result?.MAIN_CATEGORY || [];

  const updatedFilters = newFilterArray.map((filter) => {
    if (filter.value === "CATEGORIES-008") {
      const category =
        mainCategory.find((item) => item?.SC_LINK_URL === SC_LINK_URL)
          ?.CATEGORY || [];
      return { ...filter, TAGS: category };
    }
    return filter;
  });

  const productFilterData = {
    ...productFilter,
    MOBILE_DATA: {
      FILTERS: updatedFilters,
      defaultValue: newFilterArray[0]?.value || "",
    },
  };

  const layout = {
    HEADER: {
      TOPBAR: productLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: productLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: productLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: productLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: productLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: productLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: productLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: productLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: productLayout?.result?.SEO,
  };

  if (!slug?.includes("customize") && slug?.length <= 2) {
    const materialData = productsData?.result?.MATERIAL || {};
    const materialResult = materialData.result || [];
    const activePage = Number(materialData.active_page) || 1;
    const totalResults = Number(materialData.total_row_count) || 0;
    const pageCount = Number(materialData.page_count) || 1;

    const customProducts = {
      moodBoardItem: null,
      result: materialResult.map((parentItem) => ({
        ...parentItem,
        defaultSelectItem: parentItem?.items?.[0] || null,
      })),
      total_results: totalResults,
      active_page: activePage,
      page_count: pageCount,
      BREADCRUMB: productsData?.result?.BREADCRUMB || "",
    };

    return (
      <React.Fragment>
        {productType != "PRODUCT" && (
          <PlpSchema
            listings={customProducts?.result}
            total_listings={customProducts?.total_results}
            router={router}
            banner={firstData || {}}
          />
        )}
        {productType == "PRODUCT" ? (
          <ProductSlug
            layout={layout}
            productsSlugPageData={productsSlugPageData}
            firstData={firstData}
          />
        ) : (
          <ProductLists
            layout={layout}
            products={materialData}
            pageCount={customProducts?.page_count}
            activePage={customProducts?.active_page}
            firstData={firstData?.result?.BANNER}
            productFilterDropdown={productFilterDropdown}
            productFilterData={productFilterData}
            getFilterKeysValuesData={getFilterKeysValuesData}
          />
        )}
      </React.Fragment>
    );
  } else if (
    !slug?.includes("customize") &&
    slug?.length >= 3 &&
    slug?.length <= 5
  ) {
    const { productDetails, itemCode, similarProducts } = props;
    return (
      <React.Fragment>
        {productDetails?.LISTING && (
          <PdpShema
            listings={productDetails?.LISTING}
            router={router}
            seoData={layout.SEO}
          />
        )}
        <ProductDetail
          productDetails={productDetails}
          similarProducts={similarProducts}
          itemCode={itemCode}
          layout={layout}
        />
      </React.Fragment>
    );
  } else if (
    slug?.includes("customize") &&
    slug?.length >= 3 &&
    slug?.length <= 7
  ) {
    return (
      <React.Fragment>
        <Head>
          <title>Customization List Page</title>
        </Head>

        {/* Burger Menu Icon Start */}
        <Fab
          onClick={handleDrawerOpen}
          sx={{
            backgroundColor: "#ef9c00",
            color: "#f5ece0",
            fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
            fontWeight: "700",
            padding: "8px 16px",
            position: "absolute",
            zIndex: 999,
            marginLeft: "5px",
            top: "10px",
          }}
          color="warning"
          aria-label="edit"
        >
          <MenuIcon />
        </Fab>
        {/* Burger Menu End  */}

        <Fab
          onClick={() => {
            resetCanvasScene();
          }}
          className="resetbutton"
          sx={{
            backgroundColor: "#ef9c00",
            color: "#f5ece0",
            fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
            fontWeight: "700",
            padding: "8px 16px",
            position: "absolute",
            zIndex: 999,
            marginLeft: "5px",
            top: "10px",

            // Use MUI breakpoints for responsiveness
            right: {
              xs: "calc(100vw - 200px)", // Mobile (375px+)
              sm: "calc(100vw - 300px)", // Tablet (600px+)
              md: "calc(100vw - 500px)", // Small laptops (900px+)
              lg: "calc(100vw - 57%)", // Large screens (1200px+)
            },

            // Media Query (Only if necessary)
            "@media (min-width: 375px) and (max-width: 959px)": {
              right: "calc(100vw - 95%)",
            },
          }}
          color="warning"
          aria-label="edit"
        >
          <SettingsBackupRestoreIcon />
        </Fab>

        <CustomizationSlug />
        <CartManager
          sx={{
            overflow: "hidden",
          }}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          cartData={orderList}
        />
      </React.Fragment>
    );
  }
}
