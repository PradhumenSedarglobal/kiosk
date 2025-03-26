import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const qs = require("qs");
// ----------------------------------------------------------------------

const initialState = {
  isCustomizationLoading: true,
  isMaterialCustomizationLoading: false,
  customizationError: null,
  materialCustomizationError: null,
  customization: null,
  materialCustomization: null,
  stepsArray: {},
  editStepData: [],
  productInfo: {},
  priceArray: {},
  filterOption: {},
  materialList: [],
  headerData: [],
  ShowformModal: false,
  SelectedCategory: null,
  SelectedModal: null,
  ModalData: [],
  ip:null,
  geoLocationDetails:null,
  customerSysId:null,
  orderList:null,
  canvasImg: null,
  resetScene: null,
  resetCanvasScene:null
};

const slice = createSlice({
  name: "customization",
  initialState,
  reducers: {

    setMaterialListEmpty(state) {
      state.materialList = [];
    },

    setresetSceanCanvas(state,action){
      state.resetCanvasScene = action.payload;
    },

    setOrderList(state,action){
      state.orderList = null;
      state.orderList = action.payload;
    },
    setcanvasImg(state,action){
      state.canvasImg = action.payload;
    },

    setCustomerSysId(state,action){
      state.customerSysId = action.payload;
    },

    setGeoLocationDetails(state,action){
      state.geoLocationDetails = action.payload;
    },

    loadingfalse(state) {
      state.isCustomizationLoading = false;
    },

    setIp(state,action) {
      state.ip = action.payload;
    },

    setCustomerSystemId(state, action) {
      state.customerSysId = action.payload;
    },

    removecart: (state) => {
      return{
        ...initialState,
        orderList: state.orderList,
        SelectedCategory: state.SelectedCategory,
        SelectedModal: state.SelectedModal,
        
        
      }
    },

    resetState:(state) => {
      return{
        ...initialState,
        SelectedCategory: state.SelectedCategory,
        orderList: state.orderList
      }
    },

    updateModalData(state, action) {
      state.ModalData = action.payload;
    },

    updateFormModal(state, action) {
      state.ShowformModal = action.payload;
    },

    updateSelectedCategory(state, action) {
      if (state.SelectedCategory !== action.payload) {
        state.SelectedCategory = action.payload;
      }
    },

    updateSelectedModal(state, action) {
      if (state.SelectedModal !== action.payload) {
        state.SelectedModal = action.payload;
      }
    },
    // START Faqs
    startCustomizationLoading(state) {
      state.isCustomizationLoading = true;
    },
    startMaterialCustomizationLoading(state) {
      state.isMaterialCustomizationLoading = true;
    },

    // HAS Faqs
    hasCustomizationError(state, action) {
      state.isCustomizationLoading = false;
      state.customizationError = action.payload;
    },
    hasMaterialCustomizationError(state, action) {
      state.isMaterialCustomizationLoading = false;
      state.materialCustomizationError = action.payload;
    },

    // GET Faqs DATA
    setCustomization(state, action) {
      let customizationObject = state.customization;
      if (action?.payload && action?.payload?.result) {
        action?.payload?.result &&
          action?.payload?.result?.COMPONENT &&
          action?.payload?.result?.COMPONENT?.length > 0 &&
          action?.payload?.result?.COMPONENT.forEach((item) => {
            if (
              item?.PARENT?.component_url ===
              "Component/Customization/CustomizationProduct"
            ) {
              customizationObject = item?.PARENT;
            }
          });
        state.customization = customizationObject;
        state.editStepData =
          customizationObject.CHILD &&
          customizationObject.CHILD[3] &&
          customizationObject.CHILD[3]["info_result"]
            ? customizationObject.CHILD[3]
            : [];
        state.productInfo = customizationObject.CHILD[2];
      }
    },
    // GET Faqs DATA
    setMaterialCustomization(state, action) {
      state.isMaterialCustomizationLoading = false;
      state.materialCustomization = action.payload ?? null;

      if (!action.payload || !action.payload.result) {
        state.materialList = [];
        state.materialCustomization = null;
        return;
      }

      let sfi_code = state.materialList.filter(
        (e) =>
          action.payload.result.length > 0 &&
          e.SFI_DESC === action.payload.result[0]["SFI_DESC"]
      );

      if (sfi_code.length === 0) {
        state.materialList = [...state.materialList, ...action.payload.result];
      }
    },

    setMaterialSearchFun(state, action) {
      state.isMaterialCustomizationLoading = false;
      state.materialCustomization = action.payload;
      state.materialList = action.payload.result;
    },
    setCustomCustomization(state, action) {
      state.customization = null;
      state.customization = action.payload;
    },
    setCustomizationFun(state, action) {
      let option_info = action.payload;

      if (option_info && option_info.SS_CODE_NAME) {
        state.stepsArray[option_info.SS_CODE_NAME] = option_info;

        state.productInfo = state.productInfo;
        
        // state.productInfo['component_type'] = option_info.SS_CODE_NAME;

        if (option_info.SS_CODE_NAME === "MEASUREMENT") {
          state.productInfo["m_width"] =
            state.stepsArray["MEASUREMENT"] &&
            state.stepsArray["MEASUREMENT"]["m_width"]
              ? state.stepsArray["MEASUREMENT"]["m_width"]
              : state.productInfo.SPI_MIN_WIDTH ||  0;
          state.productInfo["m_height"] =
            state.stepsArray["MEASUREMENT"] &&
            state.stepsArray["MEASUREMENT"]["m_height"]
              ? state.stepsArray["MEASUREMENT"]["m_height"]
              : state.productInfo.SPI_MIN_HEIGHT || 0;
        } else if (option_info.SS_CODE_NAME === "ROLL_CALCULATION") {
          state.productInfo["m_width"] =
            state.stepsArray["ROLL_CALCULATION"] &&
            state.stepsArray["ROLL_CALCULATION"]["m_width"]
              ? state.stepsArray["ROLL_CALCULATION"]["m_width"]
              : state.productInfo.SPI_MIN_WIDTH || 0;
          state.productInfo["m_height"] =
            state.stepsArray["ROLL_CALCULATION"] &&
            state.stepsArray["ROLL_CALCULATION"]["m_height"]
              ? state.stepsArray["ROLL_CALCULATION"]["m_height"]
              : state.productInfo.SPI_MIN_HEIGHT || 0;
        } else if (option_info.SS_CODE_NAME === "MATERIAL_SELECTION") {
          state.productInfo["code"] =
            state.stepsArray["MATERIAL_SELECTION"] &&
            state.stepsArray["MATERIAL_SELECTION"]["material_info"]["SII_CODE"]
              ? state.stepsArray["MATERIAL_SELECTION"]["material_info"][
                  "SII_CODE"
                ]
              : 0;
          state.productInfo["PRICE"] =
            state.stepsArray["MATERIAL_SELECTION"] &&
            state.stepsArray["MATERIAL_SELECTION"]["material_info"]["PRICE"]
              ? state.stepsArray["MATERIAL_SELECTION"]["material_info"]["PRICE"]
              : 0;
        } else if (option_info.SS_CODE_NAME === "QUANTITY") {
          state.productInfo["count"] =
            state.stepsArray && state.stepsArray.QUANTITY
              ? state.stepsArray.QUANTITY.QTY
              : 1;
          let p =
            state.productInfo && state.productInfo.PRICE > 1
              ? state.productInfo.PRICE
              : 1;
          state.productInfo["VALUE"] = p * state.productInfo["count"];
        }
        //addToCartFunScene(initialState);
      }
    },
    setCustomizationPriceFun(state, action) {
      state.priceArray = action.payload;
    },
    deleteCustomizationStep(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        let step_name = action.payload[i];
        delete state.stepsArray[step_name];
      }
    },
    setFilterOptionValuesFun(state, action) {
      state.filterOption = action.payload;
    },
    setHeaderResponse(state, action) {
      state.headerData = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.customization,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startCustomizationLoading,
  setCustomCustomization,
  setCustomizationFun,
  setCustomizationPriceFun,
  deleteCustomizationStep,
  setFilterOptionValuesFun,
  setCustomization,
  setHeaderResponse,
  updateFormModal,
  updateSelectedCategory,
  updateSelectedModal,
  setMaterialCustomization,
  updateModalData,
  removecart,
  loadingfalse,
  setCustomerSystemId,
  setIp,
  setGeoLocationDetails,
  setCustomerSysId,
  resetState,
  setOrderList,
  setcanvasImg,
  setresetSceanCanvas,
  setMaterialListEmpty
} = slice.actions;

// GET Faqs PAGE DATA
export function getCustomization(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startCustomizationLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`v2/getSteps`, params)
      );

      dispatch(slice.actions.setCustomization(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasCustomizationError(error));
    }
  };
}

export function getMaterialCustomization({ params = {}, paramsId = {} }) {
  return async (dispatch) => {
    dispatch(slice.actions.startMaterialCustomizationLoading());
    try {
      console.log("this function is called");
      const response = await dispatch(
        apiDataService.getAll(`v2/materialFilter/${paramsId}`, params)
      );
      let materialQueryParams = qs.stringify(params);
      if (materialQueryParams.search("search_item_code") > 0) {
        dispatch(slice.actions.setMaterialSearchFun(response?.data));
      } else {
        dispatch(slice.actions.setMaterialCustomization(response?.data));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasMaterialCustomizationError(error));
    }
  };
}

export function updateAddToCart(props){
  const { SOL_SYS_ID, values } = props;
  return async (dispatch) => {
    // dispatch(actions.startAddToCartLoading());
    try {
      const response = await dispatch(
        apiDataService.post(`kiosk/cart/update/${SOL_SYS_ID}`, values)
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

//   -----------------------------------------
