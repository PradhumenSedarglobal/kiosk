import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isOrderInfoLoading: false,
  orderInfo: null,
  orderInfoData: null,

  isPaymentCaptureLoading: false,
  paymentCapture: null,
  paymentCaptureData: [],

  isRetrievePaymentLoading: false,
  retrievePayment: null,
  retrievePaymentData: [],

  isPaymentPointsPayLoading: false,
  paymentPointsPay: null,
  paymentPointsPayData: [],

  isTamaraPaymentLoading: false,
  tamaraPayment: null,
};

const slice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    // START Order
    starOrderInfoLoading(state) {
      state.isOrderInfoLoading = true;
    },
    starPaymentCaptureLoading(state) {
      state.isPaymentCaptureLoading = true;
    },

    starRetrievePaymentLoading(state) {
      state.isRetrievePaymentLoading = true;
    },

    startPaymentPointsPayLoading(state) {
      state.isPaymentPointsPayLoading = true;
    },
    startTamaraPaymentLoading(state) {
      state.isTamaraPaymentLoading = true;
    },

    // HAS Order
    hasOrderInfoError(state, action) {
      state.isOrderInfoLoading = false;
      state.orderInfo = action.payload;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
    },
    hasPaymentCaptureError(state, action) {
      state.isPaymentCaptureLoading = false;
      state.paymentCapture = action.payload;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
    },

    hasRetrievePaymentError(state, action) {
      state.isRetrievePaymentLoading = false;
      state.retrievePayment = action.payload;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
    },
    hasPaymentPointsPayError(state, action) {
      state.isPaymentPointsPayLoading = false;
      state.paymentPointsPay = action.payload;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
    },
    hasTamaraPaymentError(state, action) {
      state.isTamaraPaymentLoading = false;
      state.tamaraPayment = action.payload;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
    },
    // GET Order DATA
    setOrderInfoPageData(state, action) {
      state.isOrderInfoLoading = false;
      state.isPaymentCaptureLoading = false;
      state.isRetrievePaymentLoading = false;
      state.isPaymentPointsPayLoading = false;
      state.isTamaraPaymentLoading = false;
      state.orderInfoData = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.orderInfo,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { starOrderInfoLoading, setOrderInfoPageData } = slice.actions;

// GET Order PAGE DATA

export function getPaymentCaptureData(payment_id) {
  return async (dispatch) => {
    dispatch(slice.actions.starPaymentCaptureLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll("payment/paymentCapture/" + payment_id)
      );
      return response;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasPaymentCaptureError(error));
    }
  };
}

export function getRetrievePaymentData(payment_id) {
  return async (dispatch) => {
    dispatch(slice.actions.starRetrievePaymentLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll("payment/retrievePayment/" + payment_id)
      );
      return response;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasRetrievePaymentError(error));
    }
  };
}
export function getOrderInfoData(order_id) {
  return async (dispatch) => {
    dispatch(slice.actions.starOrderInfoLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll("recipt/singleOrder/" + order_id)
      );
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        return response;
      } else {
        dispatch(slice.actions.hasOrderInfoError(response));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasOrderInfoError(error));
    }
  };
}

export function getPaymentPointsPay(payment_id, user_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startPaymentPointsPayLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll("payment/pointsPayAuthorise/" + payment_id, {
          user_id: user_id,
        })
      );
      return response;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasPaymentPointsPayError(error));
    }
  };
}

export function getTamaraPayment(payment_order_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startTamaraPaymentLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(
          "payment/tamaraPaymentAuthorise/" + payment_order_id
        )
      );
      return response;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasTamaraPaymentError(error));
    }
  };
}
//   -----------------------------------------
