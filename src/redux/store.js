import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import rootReducer from "./rootReducer";
import { createWrapper } from "next-redux-wrapper";

// ----------------------------------------------------------------------

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
// const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export const AppStore = makeConfiguredStore;
export const AppState = AppStore().getState();
export const dispatch = AppStore().dispatch;
export const wrapper = createWrapper(AppStore, { debug: false });
export { useSelector, useDispatch };
