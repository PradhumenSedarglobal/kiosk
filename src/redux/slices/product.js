import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------
const qs = require("qs");
const initialState = {
  isInterestProductLoading: false,
  isProductDetailsLoading: false,
  isProductFiltererLoading: false,
  isRemoveFreeSampleLoading: false,
  isFetchStepsLoading: false,
  isAddToCartLoading: false,
  isMoodBoardLoading: false,
  isAddMoodBoardLoading: false,
  isFirstDataLoading: false,
  isAddFreeSampleLoading: false,

  isProductLoading: false,
  interestProductError: null,
  MoodBoardError: null,
  addToCartError: null,
  productError: null,
  productFilterError: null,
  fetchStepsError: null,
  productDetailsError: null,
  interest_products: {
    data: null,
    dropdown: [],
  },
  products: [],
  productSelectDialogDetail: null,
  moodBoard: null,
  addMoodBoardError: null,
  removeFreeSampleError: null,
  addFreeSampleError: null,
  firstData: null,
  firstDataError: null,
  productFilter: null,
  productFilterDropdown: null,
  checkedFilterData: null,
  activePage: 0,
  steps: null,
  productDetails: null,
  orderCart: null,
  productType: "BROWSE_COLLECTION",
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // START INTEREST PRODUCT LOADING
    startInterestLoading(state) {
      state.isInterestProductLoading = true;
    },

    startMoodBoardLoading(state) {
      state.isMoodBoardLoading = true;
    },
    startAddMoodBoardLoading(state) {
      state.isAddMoodBoardLoading = true;
    },
    startAddFreeSampleLoading(state) {
      state.isAddFreeSampleLoading = true;
    },
    startRemoveFreeSampleLoading(state) {
      state.isRemoveFreeSampleLoading = true;
    },
    startAddToCartLoading(state) {
      state.isAddToCartLoading = true;
    },
    startFetchStepsLoading(state) {
      state.isFetchStepsLoading = true;
    },
    startProductLoading(state) {
      state.isProductLoading = true;
    },

    startFirstDataLoading(state) {
      state.isFirstDataLoading = true;
    },
    startProductFilterLoading(state) {
      state.isProductFiltererLoading = true;
    },
    startProductDetailsLoading(state) {
      state.isProductDetailsLoading = true;
    },
    // HAS ERROR
    hasInterestProductError(state, action) {
      state.isInterestProductLoading = false;
      state.interestProductError = action.payload;
    },
    hasProductError(state, action) {
      state.isProductLoading = false;
      state.productError = action.payload;
    },

    hasMoodBoardError(state, action) {
      state.isMoodBoardLoading = false;
      state.MoodBoardError = action.payload;
    },
    hasAddMoodBoardError(state, action) {
      state.isAddMoodBoardLoading = false;
      state.addMoodBoardError = action.payload;
    },
    hasAddFreeSampleError(state, action) {
      state.isAddFreeSampleLoading = false;
      state.addFreeSampleError = action.payload;
    },
    hasFirstDataError(state, action) {
      state.isFirstDataLoading = false;
      state.firstDataError = action.payload;
    },
    hasProductFilterError(state, action) {
      state.isProductFiltererLoading = false;
      state.productFilterError = action.payload;
    },
    hasProductDetailsError(state, action) {
      state.isProductDetailsLoading = false;
      state.productDetailsError = action.payload;
    },
    hasAddToCartError(state, action) {
      state.isAddToCartLoading = false;
      state.addToCartError = action.payload;
    },
    hasFetchStepsError(state, action) {
      state.isFetchStepsLoading = false;
      state.fetchStepsError = action.payload;
    },
    hasRemoveFreeSampleError(state, action) {
      state.isRemoveFreeSampleLoading = false;
      state.removeFreeSampleError = action.payload;
    },
    setProductType(state, action) {
      state.productType = action.payload;
    },
    // GET PRODUCT DETAILS
    setSteps(state, action) {
      state.isFetchStepsLoading = false;
      state.steps = action.payload;
    },
    // GET INTEREST PRODUCT DATA
    setInterestProduct(state, action) {
      state.isInterestProductLoading = false;
      state.interest_products.data = action?.payload;
      state.interest_products.dropdown =
        action?.payload?.result?.length > 0
          ? action?.payload?.result?.map((item) =>
          ({
            ...item,
            label: item?.VSL_DESC,
            value: item?.VSL_CODE,
          })
          )
          : [];
    },
    setProducts(state, action) {
      const materialData = action?.payload?.result?.MATERIAL || {};
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
        BREADCRUMB: action?.payload?.result?.BREADCRUMB || "",
      };

      // Simplify activePage calculation
      state.activePage = activePage > 0 ? activePage : 1;

      // Update state
      state.products = customProducts;
      state.isProductLoading = false;
    },
    setDefaultProductItem: (state, action) => {
      const { products } = state;
      const { SFI_CODE, SPI_DESC, SII_CODE } = action.payload;

      if (!products?.result?.length) return;
      const customProducts = {
        ...products,
        moodBoardItem: null,
        result: products.result.map((parentItem) => {
          if (
            parentItem.SFI_CODE !== SFI_CODE ||
            parentItem.SPI_DESC !== SPI_DESC
          ) {
            return parentItem;
          }

          const updatedParentItem = {
            ...parentItem,
            defaultSelectItem:
              parentItem.items?.find(
                (childItem) => childItem.SII_CODE === SII_CODE
              ) || null,
          };

          return updatedParentItem;
        }),
      };

      state.products = customProducts;
      state.isProductLoading = false;
    },

    setProductSelectDialogDetail(state, action) {
      state.productSelectDialogDetail = action.payload;
    },

    setMoodBoard(state, action) {
      state.isMoodBoardLoading = false;
      state.moodBoard = action.payload;
    },
    setAddMoodBoard() {
      state.isAddMoodBoardLoading = false;
    },
    setFirstData(state, action) {
      state.isFirstDataLoading = false;
      state.firstData = action?.payload?.result?.BANNER || {};
      state.productType =
        action?.payload?.result?.BANNER?.SC_REDIRECT_TO == "PRODUCT" ||
          action?.payload?.result?.BANNER?.[0]?.SC_REDIRECT_TO == "PRODUCT"
          ? "PRODUCT"
          : state.productType;
    },
    setProductFilter(state, action) {
      state.isProductFiltererLoading = false;

      const { result = {} } = action.payload || {};
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

      if (result.MAIN_CATEGORY?.length) {
        newFilterArray.push(
          {
            TAGS: result.MAIN_CATEGORY,
            label: "Products",
            value: "PRODUCT-007",
          },
          {
            TAGS: result.MAIN_CATEGORY[0]?.CATEGORY,
            label: "Categories",
            value: "CATEGORIES-008",
          }
        );
      }

      const data =
        result.MAIN_CATEGORY?.map((item) => ({
          ...item,
          label: item.DESCRIPTION,
          value: item.SC_LINK_URL,
        })) || [];

      state.productFilterDropdown = data;

      state.productFilter = {
        ...action.payload,
        MOBILE_DATA: {
          defaultValue: newFilterArray[0]?.value || "",
          FILTERS: newFilterArray,
        },
      };
    },
    setMobileProductFilter(state, action) {
      const { productFilter = {} } = state || {};
      const { MOBILE_DATA = {} } = productFilter;
      const { FILTERS = [] } = MOBILE_DATA;
      const mainCategory = productFilter?.result?.MAIN_CATEGORY || [];

      const updatedFilters = FILTERS.map((filter) => {
        if (filter.value === "CATEGORIES-008") {
          const category =
            mainCategory.find(
              (item) => item?.SC_LINK_URL === action?.payload?.SC_LINK_URL
            )?.CATEGORY || [];
          return { ...filter, TAGS: category };
        }
        return filter;
      });

      state.productFilter = {
        ...productFilter,
        MOBILE_DATA: {
          FILTERS: updatedFilters,
          defaultValue: MOBILE_DATA.defaultValue || "",
        },
      };
    },

    setCheckedFilterData(state, action) {
      state.checkedFilterData = action?.payload;
    },
    setProductsDetailsData(state, action) {
      let data = action?.payload?.data;
      let itemCode = action?.payload?.itemCode;
      state.isProductDetailsLoading = true;
      let productDetail = {};
      if (data?.COMPONENT && data?.COMPONENT?.length > 0) {
        let breadcrumb = [];

        const LINK_PATHS =
          data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH &&
            data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH.split(" / ")
            ? data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH.split(" / ")
            : [];
        if (
          LINK_PATHS &&
          LINK_PATHS?.length > 0 &&
          LINK_PATHS[0].trim() === ""
        ) {
          LINK_PATHS.shift();
        }

        LINK_PATHS &&
          LINK_PATHS.forEach((item, index) => {
            if (index == 0) {
              breadcrumb.push({
                label: item,
                value: data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.PARENT_LINK_URL,
              });
            } else if (index == 1) {
              breadcrumb.push({
                label: item,
                value: `${data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.PARENT_LINK_URL}/${data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_URL}`,
              });
            } else {
              breadcrumb.push({
                label: item,
                value: "",
              });
            }
          });
        breadcrumb.push({
          label: data?.COMPONENT[0]?.PARENT?.LISTING
            ? data?.COMPONENT[0]?.PARENT?.LISTING?.SFI_DESC
            : "",
          value: "",
        });

        productDetail = {
          ...data?.COMPONENT[0]?.PARENT,
          BREADCRUMB: {
            links: breadcrumb,
            ...data?.COMPONENT[0]?.PARENT?.BREADCRUMB,
          },
          defaultSelectItem:
            itemCode &&
              data?.COMPONENT[0]?.PARENT?.LISTING?.items?.find(
                (item) => item?.SII_CODE == itemCode
              )
              ? data?.COMPONENT[0]?.PARENT?.LISTING?.items?.find(
                (item) => item?.SII_CODE == itemCode
              )
              : data?.COMPONENT[0]?.PARENT?.LISTING?.items &&
                data?.COMPONENT[0]?.PARENT?.LISTING?.items?.length > 0
                ? data?.COMPONENT[0]?.PARENT?.LISTING?.items[0] || {}
                : {},
          data: action?.payload,
        };
      }
      state.productDetails = productDetail;
    },
    setDefaultSelectItemProductDetail(state, action) {
      let detailData = state.productDetails;
      let setDefaultSelectItem = {
        ...detailData,
        defaultSelectItem: null,
      };
      if (
        state?.productDetails &&
        state?.productDetails?.LISTING &&
        state?.productDetails?.LISTING?.items &&
        state?.productDetails?.LISTING?.items?.length > 0
      ) {
        state?.productDetails?.LISTING?.items.forEach((parentItem) => {
          if (action.payload.SII_CODE === parentItem?.SII_CODE) {
            setDefaultSelectItem.defaultSelectItem = parentItem;
          }
        });
        state.productDetails = setDefaultSelectItem;
        state.isProductLoading = false;
      }
    },
    setActivePage(state, action) {
      state.isProductLoading = true;
      state.activePage = action.payload;
    },
    setProductFreeSample(state, action) {
      let customProducts = {
        ...state?.products,
        moodBoardItem: null,
        result: [],
      };

      if (
        state?.products &&
        state?.products?.result &&
        state?.products?.result?.length > 0
      ) {
        state?.products?.result.forEach((parentItem, parentIndex) => {
          if (action.payload.SFI_CODE === parentItem.SFI_CODE) {
            customProducts.result.push({
              ...parentItem,
              defaultSelectItem: null,
              items: [],
            });
            if (parentItem?.items && parentItem?.items?.length > 0) {
              parentItem?.items.forEach((childItem) => {
                if (action.payload.SII_CODE === childItem?.SII_CODE) {
                  state.productSelectDialogDetail = {
                    ...parentItem,
                    defaultSelectItem: {
                      ...childItem,
                      SAMPLE_SYS_ID: childItem?.SAMPLE_SYS_ID
                        ? `${childItem?.SAMPLE_SYS_ID},${action.payload.SAMPLE_SYS_ID}`
                        : `${action.payload.SAMPLE_SYS_ID}`,
                    },
                  };
                  customProducts.result[parentIndex].defaultSelectItem = {
                    ...childItem,
                    SAMPLE_SYS_ID: childItem?.SAMPLE_SYS_ID
                      ? `${childItem?.SAMPLE_SYS_ID},${action.payload.SAMPLE_SYS_ID}`
                      : `${action.payload.SAMPLE_SYS_ID}`,
                  };
                  customProducts.result[parentIndex].items.push({
                    ...childItem,
                    SAMPLE_SYS_ID: childItem?.SAMPLE_SYS_ID
                      ? `${childItem?.SAMPLE_SYS_ID},${action.payload.SAMPLE_SYS_ID}`
                      : `${action.payload.SAMPLE_SYS_ID}`,
                  });
                } else {
                  customProducts.result[parentIndex].items.push(childItem);
                }
              });
            }
          } else {
            customProducts.result.push(parentItem);
          }
        });
        state.products = customProducts;
        state.isProductLoading = false;
      }
    },
    removeProductFreeSample(state, action) {
      let customProducts = {
        ...state?.products,
        moodBoardItem: null,
        result: [],
      };

      if (
        state?.products &&
        state?.products?.result &&
        state?.products?.result?.length > 0
      ) {
        state?.products?.result.forEach((parentItem, parentIndex) => {
          if (action.payload.SFI_CODE === parentItem.SFI_CODE) {
            customProducts.result.push({
              ...parentItem,
              defaultSelectItem: null,
              items: [],
            });
            if (parentItem?.items && parentItem?.items?.length > 0) {
              parentItem?.items.forEach((childItem) => {
                if (action.payload.SII_CODE === childItem?.SII_CODE) {
                  state.productSelectDialogDetail = {
                    ...parentItem,
                    defaultSelectItem: {
                      ...childItem,
                      SAMPLE_SYS_ID: "",
                    },
                  };
                  customProducts.result[parentIndex].defaultSelectItem = {
                    ...childItem,
                    SAMPLE_SYS_ID: "",
                  };
                  customProducts.result[parentIndex].items.push({
                    ...childItem,
                    SAMPLE_SYS_ID: "",
                  });
                } else {
                  customProducts.result[parentIndex].items.push(childItem);
                }
              });
            }
          } else {
            customProducts.result.push(parentItem);
          }
        });
        state.products = customProducts;
        state.isProductLoading = false;
      }
    },
    setOrderCart(state, action) {
      state.orderCart = action.payload;
      state.isAddToCartLoading = false;
    },
    setProductDetailAddToCart(state, action) {
      let detailData = state.productDetails;
      let setDefaultSelectItem = {
        ...detailData,
        LISTING: {
          ...detailData?.LISTING,
          items: [],
        },
        defaultSelectItem: null,
      };

      if (
        state?.productDetails &&
        state?.productDetails?.LISTING &&
        state?.productDetails?.LISTING?.items &&
        state?.productDetails?.LISTING?.items?.length > 0
      ) {
        state?.productDetails?.LISTING?.items.forEach((parentItem) => {
          if (action.payload.SII_CODE === parentItem?.SII_CODE) {
            setDefaultSelectItem.defaultSelectItem = {
              ...parentItem,
              SAMPLE_SYS_ID: parentItem?.SAMPLE_SYS_ID
                ? `${parentItem?.SAMPLE_SYS_ID},${action.payload.SAMPLE_SYS_ID}`
                : `${action.payload.SAMPLE_SYS_ID}`,
            };
            setDefaultSelectItem?.LISTING?.items.push({
              ...parentItem,
              SAMPLE_SYS_ID: parentItem?.SAMPLE_SYS_ID
                ? `${parentItem?.SAMPLE_SYS_ID},${action.payload.SAMPLE_SYS_ID}`
                : `${action.payload.SAMPLE_SYS_ID}`,
            });
          } else {
            setDefaultSelectItem?.LISTING?.items.push(parentItem);
          }
        });
        state.productDetails = setDefaultSelectItem;
        state.isProductLoading = false;
      }
    },
    removeProductDetailAddToCart(state, action) {
      let detailData = state.productDetails;
      let setDefaultSelectItem = {
        ...detailData,
        LISTING: {
          ...detailData?.LISTING,
          items: [],
        },
        defaultSelectItem: null,
      };

      if (
        state?.productDetails &&
        state?.productDetails?.LISTING &&
        state?.productDetails?.LISTING?.items &&
        state?.productDetails?.LISTING?.items?.length > 0
      ) {
        state?.productDetails?.LISTING?.items.forEach((parentItem) => {
          if (action.payload.SII_CODE === parentItem?.SII_CODE) {
            setDefaultSelectItem.defaultSelectItem = {
              ...parentItem,
              SAMPLE_SYS_ID: "",
            };
            setDefaultSelectItem?.LISTING?.items.push({
              ...parentItem,
              SAMPLE_SYS_ID: "",
            });
          } else {
            setDefaultSelectItem?.LISTING?.items.push(parentItem);
          }
        });
        state.productDetails = setDefaultSelectItem;
        state.isProductLoading = false;
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.product,
      };
    });
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;
// Actions
export const {
  startInterestLoading,
  setProductSelectDialogDetail,
  setAddMoodBoard,
  setDefaultProductItem,
  setCheckedFilterData,
  setActivePage,
  setDefaultSelectItemProductDetail,
  setProductFreeSample,
  removeProductFreeSample,
  removeProductDetailAddToCart,
  setProductDetailAddToCart,
  setMobileProductFilter,
  setProductType,
} = actions;

// ----------------------------------------------------------------------

export function getInterestProduct(params = {}) {
  return async (dispatch) => {
    dispatch(actions.startInterestLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`btob/products`, params)
      );
      dispatch(actions.setInterestProduct(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(actions.hasInterestProductError(error));
    }
  };
}

export function getProducts(params = {}, asPath) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/third`, params, asPath)
      );
      dispatch(actions.setProducts(response?.data));
    } catch (error) {
      dispatch(actions.hasProductError(error));
    }
  };
}

export function getReturnProducts(params = {}, asPath) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/third`, params, asPath)
      );
      return response?.data;
      // dispatch(actions.setProducts(response?.data));
    } catch (error) {
      dispatch(actions.hasProductError(error));
    }
  };
}

export function getProductFilters(params = {}) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/filters`, params)
      );

      dispatch(actions.setProductFilter(response?.data));
    } catch (error) {
      dispatch(actions.hasProductError(error));
    }
  };
}

export function getReturnProductFilters(params = {}) {
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/filters`, params)
      );
      return response?.data;
      // dispatch(actions.setProductFilter(response?.data));
    } catch (error) {
      dispatch(actions.hasProductError(error));
    }
  };
}

export function getFirstData(params = {}) {
  return async (dispatch) => {
    dispatch(actions.startFirstDataLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/first`, params)
      );

      dispatch(actions.setFirstData(response?.data));
    } catch (error) {
      dispatch(actions.hasFirstDataError(error));
    }
  };
}
export function getFirstReturnData(params = {}) {
  return async (dispatch) => {
    dispatch(actions.startFirstDataLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/first`, params)
      );
      return response?.data;
      // dispatch(actions.setFirstData(response?.data));
    } catch (error) {
      dispatch(actions.hasFirstDataError(error));
    }
  };
}
export const getMoodBoardList = (params = {}) => {
  return async (dispatch) => {
    dispatch(actions.startMoodBoardLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`mood_board/type`, params)
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        dispatch(actions.setMoodBoard(data?.result));
      } else {
        dispatch(actions.hasMoodBoardError(data));
      }
    } catch (error) {
      dispatch(actions.hasMoodBoardError(error));
    }
  };
};

export const addFreeSample = (values) => {
  return async (dispatch) => {
    dispatch(actions.startAddFreeSampleLoading());
    try {
      const response = await dispatch(apiDataService.post(`v2/cart`, values));
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        return response;
      } else {
        dispatch(actions.hasAddFreeSampleError(data));
      }
    } catch (error) {
      dispatch(actions.hasAddFreeSampleError(error));
    }
  };
};
export const removeFreeSample = (props) => {
  const { SAMPLE_SYS_ID } = props;
  return async (dispatch) => {
    dispatch(actions.startRemoveFreeSampleLoading());
    try {
      const response = await dispatch(
        apiDataService.Delete(`v2/cart/${SAMPLE_SYS_ID}`)
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        return response;
      } else {
        dispatch(actions.hasRemoveFreeSampleError(data));
      }
    } catch (error) {
      dispatch(actions.hasRemoveFreeSampleError(error));
    }
  };
};

export const addToCart = (values) => {
  return async (dispatch) => {
    dispatch(actions.startAddToCartLoading());
    try {
      const response = await dispatch(apiDataService.post(`v2/cart`, values));
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        await dispatch(actions.setOrderCart(data));
        return response;
      } else {
        dispatch(actions.hasAddToCartError(data));
      }
    } catch (error) {
      dispatch(actions.hasAddToCartError(error));
    }
  };
};

export const updateLineTable = (props) => {
  const { SOL_SYS_ID, values } = props;
  return async (dispatch) => {
    try {
      const response = await dispatch(
        apiDataService.post(`v2/cart/updateLineTable/${SOL_SYS_ID}`, values)
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        return response;
      } else {
        dispatch(actions.hasAddToCartError(data));
      }
    } catch (error) {
      dispatch(actions.hasAddToCartError(error));
    }
  };
};

export const updateAddToCart = (props) => {
  const { SOL_SYS_ID, values } = props;
  return async (dispatch) => {
    dispatch(actions.startAddToCartLoading());
    try {
      const response = await dispatch(
        apiDataService.post(`v2/cart/update/${SOL_SYS_ID}`, values)
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        await dispatch(actions.setOrderCart(data));
        return response;
      } else {
        dispatch(actions.hasAddToCartError(data));
      }
    } catch (error) {
      dispatch(actions.hasAddToCartError(error));
    }
  };
};

export const getSteps = (props) => {
  const { params } = props;
  return async (dispatch) => {
    dispatch(actions.startFetchStepsLoading());
    try {
      const response = await dispatch(apiDataService.post(`v2/steps`, params));
      const data = response?.data;
      dispatch(actions.setSteps(data));
    } catch (error) {
      dispatch(actions.hasFetchStepsError(error));
    }
  };
};

export const addMoodBoard = (values) => {
  return async (dispatch) => {
    dispatch(actions.startAddMoodBoardLoading());
    try {
      const response = await dispatch(
        apiDataService.post(`mood_board/send`, values)
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        return response;
      } else {
        dispatch(actions.hasAddMoodBoardError(data));
      }
    } catch (error) {
      dispatch(actions.hasAddMoodBoardError(error));
    }
  };
};

export function getProductDetails(params = {}) {
  return async (dispatch) => {
    dispatch(actions.startProductDetailsLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/detail?`, params)
      );

      dispatch(
        actions.setProductsDetailsData({
          data: response?.data?.result || {},
          itemCode: params?.item || "",
        })
      );
    } catch (error) {
      dispatch(actions.hasProductDetailsError(error));
    }
  };
}

// ----------------------------------------------------------------------
