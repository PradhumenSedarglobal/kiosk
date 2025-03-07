import InputLabel from "@mui/material/InputLabel";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import GeoPlaceAutoComplete from "./geoPlaceAutoComplete";

const LocationPicker = dynamic(() => import("react-location-picker"), {
  ssr: false,
});

export default function GeoLocation({
  value,
  handleChange,
  isRequired,
  name,
  helperText,
  fieldRefs,
  defaultValue = () => { },
}) {
  const { t: translate } = useTranslation();
  const [cord, setCord] = useState({
    lat: 25.308488,
    lng: 55.392905,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCord(latLng);
  };
  const [state, setState] = useState({
    address:
      "895V+H4G - Industrial Area - Industrial Area 2 - Sharjah - United Arab Emirat",
  });
  const handleLocationChange = (e) => {
    const { address } = e;
    setState({ address });
  };

  React.useEffect(() => {
    defaultValue(name, state.address);
  }, [state]);

  return (
    <div>
      <InputLabel
        sx={(theme) => ({
          "&.MuiInputLabel-root": {
            ...theme.typography.typography15,
            transform: "translate(0px, -14px) scale(0.75)",
          },
        })}
      >{`${translate("Enteralocation")}  ${isRequired ? "*" : ""}`}</InputLabel>

      <GeoPlaceAutoComplete
        onSelect={handleSelect}
        name={name}
        inputRef={fieldRefs.address}
        value={state.address}
        onChange={(e) => setState({ address: e })}
        helperText={helperText}
        handleChange={handleChange}
        state={state}
        formikValue={value}
      />

      <LocationPicker
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "400px" }} />}
        defaultPosition={cord}
        onChange={(e) => handleLocationChange(e)}
      />
    </div>
  );
}
