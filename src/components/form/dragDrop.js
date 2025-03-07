import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FormControl } from "./index";
// const fileTypes = ["JPG", "PNG", "GIF", "JFIF", "JPEG"];

// eslint-disable-next-line arrow-body-style
const AddImage = ({ theme }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33317 6.66667H22.6665V16H25.3332V6.66667C25.3332 5.196 24.1372 4 22.6665 4H5.33317C3.8625 4 2.6665 5.196 2.6665 6.66667V22.6667C2.6665 24.1373 3.8625 25.3333 5.33317 25.3333H15.9998V22.6667H5.33317V6.66667Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M10.6665 14.6667L6.6665 20H21.3332L15.9998 12L11.9998 17.3333L10.6665 14.6667Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M25.3332 18.6667H22.6665V22.6667H18.6665V25.3333H22.6665V29.3333H25.3332V25.3333H29.3332V22.6667H25.3332V18.6667Z"
        fill={theme.palette.primary.main}
      />
    </svg>
  );
};

const RootStyle = styled("div")(({ theme }) => ({
  maxWidth: "100% !important",
  border: `2px dashed ${theme.palette.primary.main} !important`,
  borderRadius: "5px",
  cursor: "pointer",
  height: "48px",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px 8px 8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const FileUploaders = styled(FileUploader)(({ theme }) => ({
  maxWidth: "100% !important",
  border: `2px dashed ${theme.palette.primary.main} !important`,
  borderRadius: "5px",
  cursor: "pointer",
  height: "48px",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px 8px 8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const Label = styled("span")(() => ({
  fontSize: "12px",
  color: "#666",
}));

const DragDrop = (props) => {
  const {
    name,
    value,
    required,
    fullWidth,
    helperText,
    disabled,
    isDocument = false,
    label = "",
    accept,
    formControlSx,
    documentText,
    inputRef,
    isRequired,
    ...rest
  } = props;
  const theme = useTheme();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [file, setFile] = React.useState("");
  const [loader, setLoader] = React.useState("");
  const [fileTypes, setFileTypes] = React.useState([]);

  useEffect(() => {
    if (value) {
      setFile(value);
    } else setFile("");
  }, [value]);

  useEffect(() => {
    setFileTypes(accept);
  }, [accept]);

  const fileUpload = (file) => {
    setLoader(true);
    let newFile = file;

    props.onChange(newFile);
    setFile(newFile);
    setLoader(false);
  };

  return (
    <>
      <FormControl
        key={`key${name}`}
        ref={inputRef}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        sx={{
          ...formControlSx,
        }}
      >
        <Stack spacing={1}>
          {label && (
            <InputLabel
              sx={(theme) => ({
                pb: 8,
                "&.MuiInputLabel-root": {
                  fontWeight: 200,
                  letterSpacing: 0.5,
                  ...theme.typography.typography15,
                  transform: "translate(0px, -14px) scale(0.75)",
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                },
              })}
            >{`${label} ${isRequired ? "*" : ""}`}</InputLabel>
          )}
          <FileUploaders
            handleChange={fileUpload}
            name={name}
            types={fileTypes}
            {...rest}
          >
            <RootStyle>
              {file ? (
                <Label>{file["name"] ? file["name"] : ""}</Label>
              ) : error ? (
                error
              ) : (
                <>
                  {" "}
                  <AddImage theme={theme} />{" "}
                  <Label>
                    {label ? label : "Upload or drop a file right here"}
                  </Label>{" "}
                </>
              )}
              {loader && (
                <CircularProgress size="35px" sx={{ marginLeft: "40px" }} />
              )}
            </RootStyle>
          </FileUploaders>
        </Stack>
        {documentText && (
          <FormHelperText
            sx={(theme) => ({
              marginTop: "0px",
              marginBottom: "4px",
              color: (theme) => theme.palette.grey[2800],
              letterSpacing: "0.28px",
              ...theme.typography.typography16,
              fontFamily: theme.fontFaces.helveticaNeue,
            })}
          >
            {documentText}
          </FormHelperText>
        )}

        <Box sx={{ display: "flex" }}>
          {helperText && (
            <FormHelperText
              sx={(theme) => ({
                "&.MuiFormHelperText-root": {
                  marginLeft: "0px",
                  fontFamily: theme.fontFaces.helveticaNeueLight,
                },
              })}
            >
              {helperText}
            </FormHelperText>
          )}
        </Box>
      </FormControl>
    </>
  );
};

DragDrop.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isDocument: PropTypes.bool,
};

export default DragDrop;
