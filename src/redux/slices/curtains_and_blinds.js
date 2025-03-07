import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isCurtainAndBlindLoading: false,
  curtainAndBlindError: null,
  data: [],
  curtainAndBlind: null,
};

const slice = createSlice({
  name: "curtainAndBlind",
  initialState,
  reducers: {
    // START Offers
    startCurtainAndBlindLoading(state) {
      state.isCurtainAndBlindLoading = true;
    },

    // HAS Offers
    hasCurtainAndBlindError(state, action) {
      state.isCurtainAndBlindLoading = false;
      state.curtainAndBlindError = action.payload;
    },

    // GET Offers DATA
    setCurtainAndBlindPageData(state, action) {
      let curtainAndBlind = [];
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
              curtainAndBlind.push({
                CHILD: [],
                ...childElement?.MATERIAL_LIST,
                ...childElement,
              });
              if (
                childElement?.MATERIAL_LIST?.result &&
                childElement?.MATERIAL_LIST?.result?.length > 0
              ) {
                childElement?.MATERIAL_LIST?.result.forEach((grandChild) => {
                  curtainAndBlind[childIndex]?.CHILD.push({
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

      state.isCurtainAndBlindLoading = false;
      state.data = action.payload;
      state.curtainAndBlind = curtainAndBlind;
    },
    setDefaultCurtainAndBlindItem: (state, action) => {
      let customCurtainAndBlind = [];
      if (
        state?.curtainAndBlind &&
        state?.curtainAndBlind &&
        state?.curtainAndBlind?.length > 0
      ) {
        state?.curtainAndBlind.forEach((parentElement, parentIndex) => {
          customCurtainAndBlind.push({
            ...parentElement,
            CHILD: [],
          });
          if (parentElement?.CHILD && parentElement?.CHILD?.length > 0) {
            parentElement?.CHILD.forEach((childElement, childIndex) => {
              if (action.payload.SFI_CODE === childElement.SFI_CODE) {
                customCurtainAndBlind[parentIndex]?.CHILD.push({
                  ...childElement,
                  defaultSelectItem: null,
                });
                if (childElement?.items && childElement?.items?.length > 0) {
                  childElement?.items.forEach((grandChildItem) => {
                    if (action.payload.SII_CODE === grandChildItem?.SII_CODE) {
                      customCurtainAndBlind[parentIndex].CHILD[
                        childIndex
                      ].defaultSelectItem = grandChildItem;
                    }
                  });
                }
              } else {
                customCurtainAndBlind[parentIndex]?.CHILD.push(childElement);
              }
            });
          }
        });
        state.curtainAndBlind = customCurtainAndBlind;
        state.isCurtainAndBlindLoading = false;
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.curtainAndBlind,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startCurtainAndBlindLoading, setDefaultCurtainAndBlindItem } =
  slice.actions;

// GET Offers PAGE DATA
export function getCurtainAndBlindData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCurtainAndBlindLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/homepage/first`, params)
      );
      dispatch(slice.actions.setCurtainAndBlindPageData(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCurtainAndBlindError(error));
    }
  };
}

//   -----------------------------------------
