import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isOffersLoading: false,
  offersError: null,
  data: [],
  offerData: null,
};

const slice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    // START Offers
    startOffersLoading(state) {
      state.isOffersLoading = true;
    },

    // HAS Offers
    hasOffersError(state, action) {
      state.isOffersLoading = false;
      state.offersError = action.payload;
    },

    // GET Offers DATA
    setOffersPageData(state, action) {
      let offerData = [];
      action.payload?.result &&
        action.payload?.result?.COMPONENT?.length > 0 &&
        action.payload?.result?.COMPONENT.forEach((element) => {
          if (
            element?.PARENT &&
            element?.PARENT?.component_url ==
              "Component/OfferProductList/Index" &&
            element?.PARENT?.CHILD &&
            element?.PARENT?.CHILD?.length > 0
          ) {
            element?.PARENT?.CHILD.forEach((childElement, childIndex) => {
              offerData.push({
                CHILD: [],
                ...childElement?.MATERIAL_LIST,
                ...childElement,
              });
              if (
                childElement?.MATERIAL_LIST?.result &&
                childElement?.MATERIAL_LIST?.result?.length > 0
              ) {
                childElement?.MATERIAL_LIST?.result.forEach((grandChild) => {
                  offerData[childIndex]?.CHILD.push({
                    defaultSelectItem:
                      grandChild?.items && grandChild?.items?.length > 0
                        ? grandChild?.items[0]
                        : [],
                    ...grandChild,
                  });
                });
              }
            });
          }
        });

      state.isOffersLoading = false;
      state.data = action.payload;
      state.offerData = offerData;
    },
    setDefaultProductOfferItem: (state, action) => {
      let customOfferData = [];
      if (
        state?.offerData &&
        state?.offerData &&
        state?.offerData?.length > 0
      ) {
        state?.offerData.forEach((parentElement, parentIndex) => {
          customOfferData.push({
            ...parentElement,
            CHILD: [],
          });
          if (parentElement?.CHILD && parentElement?.CHILD?.length > 0) {
            parentElement?.CHILD.forEach((childElement, childIndex) => {
              if (action.payload.SFI_CODE === childElement.SFI_CODE) {
                customOfferData[parentIndex]?.CHILD.push({
                  ...childElement,
                  defaultSelectItem: null,
                });
                if (childElement?.items && childElement?.items?.length > 0) {
                  childElement?.items.forEach((grandChildItem) => {
                    if (action.payload.SII_CODE === grandChildItem?.SII_CODE) {
                      customOfferData[parentIndex].CHILD[
                        childIndex
                      ].defaultSelectItem = grandChildItem;
                    }
                  });
                }
              } else {
                customOfferData[parentIndex]?.CHILD.push(childElement);
              }
            });
          }
        });
        state.offerData = customOfferData;
        state.isOffersLoading = false;
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.offers,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startOffersLoading, setDefaultProductOfferItem } = slice.actions;

// GET Offers PAGE DATA
export function getOffersPageData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startOffersLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setOffersPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasOffersError(error));
    }
  };
}

//   -----------------------------------------
