import { useAuthContext } from "@/auth/useAuthContext";
// import { useSelector } from "@/redux/store";
// import React from "react";

const useFloatPrice = (price) => {
  const { state } = useAuthContext();
  const { cookies } = state;

  const formatPrice = (price) => {
    if (Number(price) >= 1000) {
      const formattedPrice = Number(price).toLocaleString("en-US");
      return `${formattedPrice}`;
    } else {
      return price.toString();
    }
  };

  const newPrice = price
    ? formatPrice(Number(price)?.toFixed(cookies?.siteDetails?.show_decimals))
    : "0";

  return newPrice;
};

export default useFloatPrice;
