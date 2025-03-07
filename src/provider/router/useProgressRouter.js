import * as React from "react";
import { ProgressRouterContext } from "./progressRouterContext";

export const useProgressRouter = () => {
  const value = React.useContext(ProgressRouterContext);
  return value;
};
