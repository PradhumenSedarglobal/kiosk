import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";
import React from "react";

const FloatPrice = ({ price, defaultDecimal = 0 }) => {
  const router = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const [decimals, setDecimals] = React.useState(cookies || 0);

  React.useEffect(() => {
    setDecimals(Number(cookies?.siteDetails?.show_decimals));
  }, [router, cookies]);

  const formatPrice = (price) => {
    if (Number(price) >= 1000) {
      const formattedPrice = Number(price).toLocaleString("en-US");
      return `${formattedPrice}`;
    } else {
      return price.toString();
    }
  };

  const newPrice = price ? formatPrice(Number(price)?.toFixed(decimals || defaultDecimal)) : "0";

  return newPrice;
};

export default FloatPrice;
