import React from "react";

export const CreateProductContext = React.createContext();

const initialState = {
  steps: null,
  activePage: 0,
  orderCart: null,
  productFilter: null,
  pageCount: 0,
  selectOptionData: null,
  gridView: 4,
  checkedFilterData: null,
  steps: null,
  product_width: null,
  product_height: null,
  productSelectDialogDetail: null,
  productFreeSamples: [],
};

const reducers = (state, action) => {
  if (action.type === "GRID_VIEW") {
    return {
      ...state,
      gridView: action.payload,
    };
  }

  if (action.type === "PRODUCT_SELECT_DIALOG_DETAIL") {
    return {
      ...state,
      productSelectDialogDetail: action.payload.productSelectDialogDetail,
      product_width: action.payload?.product_width,
      product_height: action.payload?.product_height,
    };
  }

  if (action.type === "CHECKED_FILTER_DATA") {
    return {
      ...state,
      checkedFilterData: action.payload,
    };
  }

  if (action.type === "SET_STEPS") {
    return {
      ...state,
      steps: action.payload,
    };
  }
  if (action.type === "PRODUCT_WIDTH") {
    return {
      ...state,
      product_width: action.payload,
    };
  }

  if (action.type === "PRODUCT_HEIGHT") {
    return {
      ...state,
      product_height: action.payload,
    };
  }

  if (action.type === "ADD_FREE_SAMPLE") {
    return {
      ...state,
      productFreeSamples: action.payload,
    };
  }
  if (action.type === "REMOVE_FREE_SAMPLE") {
    return {
      ...state,
      productFreeSamples: action.payload,
    };
  }
  if (action.type === "SET_INITIAL_PRODUCT_FREE_SAMPLE") {
    return {
      ...state,
      productFreeSamples: [...state.productFreeSamples, ...action.payload],
    };
  }
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducers, initialState);


  const handleChangeGridView = (value) => {
    dispatch({ type: "GRID_VIEW", payload: value });
  };

  const handleCheckedFilterData = (value) => {
    dispatch({ type: "CHECKED_FILTER_DATA", payload: value });
  };

  const handleSelectDialogDetail = (data) => {
    dispatch({
      type: "PRODUCT_SELECT_DIALOG_DETAIL",
      payload: {
        productSelectDialogDetail: data.productSelectDialogDetail,
        product_width: data?.product_width,
        product_height: data?.product_height,
      },
    });
  };

  const handleChangeProductWidth = (data) => {
    dispatch({ type: "PRODUCT_WIDTH", payload: data });
  };

  const handleChangeProductHeight = (data) => {
    dispatch({ type: "PRODUCT_HEIGHT", payload: data });
  };

  const handleSetSteps = (data) => {
    dispatch({
      type: "SET_STEPS",
      payload: data,
    });
  };

  const setInitialAllCheckedFreeSample = (data) => {
    dispatch({
      type: "ADD_FREE_SAMPLE",
      payload: data,
    });
  };

  const setInitialProductAllCheckedFreeSample = (data) => {
    dispatch({
      type: "SET_INITIAL_PRODUCT_FREE_SAMPLE",
      payload: data,
    });
  };

  const handleAddFreeSampleData = (data) => {
    dispatch({
      type: "ADD_FREE_SAMPLE",
      payload: [...state.productFreeSamples, data],
    });
  };
  const handleRemoveFreeSampleData = (data) => {
    dispatch({
      type: "REMOVE_FREE_SAMPLE",
      payload: state.productFreeSamples.filter(
        (item) => item?.SII_CODE !== data?.SII_CODE
      ),
    });
  };

  return (
    <CreateProductContext.Provider
      value={{
        dispatch,
        productState: state,
        handleChangeGridView,
        handleCheckedFilterData,
        handleSelectDialogDetail,
        handleSetSteps,
        handleChangeProductWidth,
        handleChangeProductHeight,
        handleAddFreeSampleData,
        handleRemoveFreeSampleData,
        setInitialAllCheckedFreeSample,
        setInitialProductAllCheckedFreeSample,
      }}
    >
      {children}
    </CreateProductContext.Provider>
  );
};

export default ProductProvider;
