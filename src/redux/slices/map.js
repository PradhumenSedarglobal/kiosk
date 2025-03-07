import { apiDataService } from "@/utils/apiDataService";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

const initialState = {
  isMapLoading: false,
  mapError: null,
  positions: [],
  showRoom: [],
  mapMarker: {},
  showingInfoWindow: false,
  infoPosition: false,
  showRoomDetail: {},
  showRoomView: {},
  center: {},
  zoom: {},
  activeColor: "DUBAI",
};

const slice = createSlice({
  name: "map",
  initialState,
  reducers: {
    // START INTEREST PRODUCT LOADING
    startMapLoading(state) {
      state.isMapLoading = true;
    },

    // HAS ERROR
    hasMapError(state, action) {
      state.isMapLoading = false;
      state.mapError = action.payload;
    },

    // SET FIND YOUR STORE DATA
    setPositions(state, action) {
      state.positions = action.payload;
    },
    setShowRoom(state, action) {
      state.showRoom = action.payload;
    },
    setMapMarker(state, action) {
      state.mapMarker = action.payload;
    },
    setShowingInfoWindow(state, action) {
      state.showingInfoWindow = action.payload;
    },
    setInfoPosition(state, action) {
      state.infoPosition = action.payload;
    },
    setShowRoomDetail(state, action) {
      state.showRoomDetail = action.payload;
    },
    setShowRoomView(state, action) {
      state.showRoomView = action.payload;
    },
    setCenter(state, action) {
      state.center = action.payload;
    },
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setActiveColor(state, action) {
      state.activeColor = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.map,
      };
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startMapLoading,
  setMap,
  setPositions,
  setShowRoom,
  setMapMarker,
  setShowingInfoWindow,
  setInfoPosition,
  setShowRoomDetail,
  setShowRoomView,
  setCenter,
  setZoom,
  setActiveColor,
} = slice.actions;

// ----------------------------------------------------------------------

export function getMapData(params = {}) {
  return async (dispatch) => {
    dispatch(slice.actions.startMapLoading());
    try {
      const response = await dispatch(
        apiDataService.getAll(`showroom/fetch`, params)
      );
      dispatch(slice.actions.setShowRoom(response?.data?.result));
      let position = [];
      Object.entries(response?.data?.position).forEach(([key, value]) => {
        position.push({
          lat: parseFloat(value.SSA_LATITUDE),
          lng: parseFloat(value.SSA_LONGITUDE),
        });
      });
      dispatch(slice.actions.setPositions(position));
      dispatch(slice.actions.setShowRoomDetail(response?.data?.position));
      dispatch(slice.actions.setCenter(position[0]));
      dispatch(slice.actions.setZoom(9));
    } catch (error) {
      console.error(error, "erro");
      dispatch(slice.actions.hasMapError(error));
    }
  };
}

// ----------------------------------------------------------------------
