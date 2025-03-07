import Search from "@/assets/header/search";
import { FormControl } from "@/components/form";
import { apiDataService } from "@/utils/apiDataService";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { useDispatch } from "react-redux";

export default function SearchBox({ IconColor = "rgba(44, 44, 44, 0.83)", handleClose }) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t: translate } = useTranslation("common");
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (query = "") => {
    setLoading(true);
    await dispatch(apiDataService.getAll(`/fetch/search`, { q: query }))
      .then((response) => {
        const options =
          response?.data &&
            response?.data?.result &&
            response?.data?.result?.length > 0
            ? response?.data?.result.map((i) => ({
              url: i.SEARCH_LINK,
              product: i.PRODUCT,
              content: i.SEARCH_CONTENT,
              label: i.SEARCH_CONTENT,
              value: i.PRODUCT,
            }))
            : [];
        setLoading(false);
        setOptions(options);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          "& .MuiInput-input": {
            color: theme.palette.common.white,
          },
        },
      })}
    >
      <Autocomplete
        variant="standard"
        fullWidth
        id="asynchronous-demo"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label}
        onChange={(e, newValue) => {
          setValue(newValue);
          if (newValue && newValue?.url) {
            push(`/${newValue?.url}`);
            //handleClose();
          }
        }}
        onInputChange={(e, newValue) => {
          handleSearch(newValue);
          setOpen(true);
        }}
        options={options}
        loading={loading}
        sx={(theme) => ({
          "& .MuiInput-input": {
            ...theme.typography.typography14,
            "&::placeholder": {
              color: theme.palette.grey[6800],
              fontFamily: theme.fontFaces.helveticaNeue
            },
          },
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder={translate("SearchProduct")}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
              startAdornment: (
                <Box
                  sx={(theme) => ({
                    ...(theme.direction == "rtl" && {
                      transform: "scaleX(-1)",
                      mr: 1,
                    }),
                    ...(theme.direction == "ltr" && {
                      transform: "scaleX(-1)",
                      mr: 2,
                    }),
                  })}
                >
                  <Search svgColor={IconColor} />
                </Box>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
