import { FormControl } from "@/components/form";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import PlacesAutocomplete from "react-places-autocomplete";

const GeoPlaceAutoComplete = ({
  onSelect,
  value,
  onChange,
  helperText,
  state,
  name,
  formikValue,
  handleChange,
}) => {
  return (
    <PlacesAutocomplete onSelect={onSelect} value={value} onChange={onChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <FormControl fullWidth error={helperText ? true : false}>
            <Input
              sx={{ mb: 4 }}
              name={name}
              value={formikValue}
              onChange={handleChange}
              {...getInputProps({ placeholder: state.address })}
            />
            <Box sx={{ display: "flex" }}>
              {helperText && (
                <FormHelperText
                  sx={{
                    "&.MuiFormHelperText-root": {
                      marginLeft: "0px",
                    },
                  }}
                >
                  {helperText}
                </FormHelperText>
              )}
            </Box>
          </FormControl>
          <div>
            {loading && <div>loading</div>}

            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#fafafa" : "#fff",
              };
              return (
                <div
                  key={`index-${suggestion}`}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GeoPlaceAutoComplete;
