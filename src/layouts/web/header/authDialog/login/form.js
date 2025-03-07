import { PasswordBox, TextBox } from "@/components/form";
import { useTranslation } from "next-i18next";

const LoginForm = ({ formik }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <TextBox
        fullWidth
        label={translate("Enter_Email_Number")}
        variant="standard"
        name="user_id"
        value={formik.values.user_id}
        onChange={formik.handleChange}
        helperText={formik.touched.user_id && formik.errors.user_id}
        inputSx={(theme) => {
          return {
            "&.MuiTextField-root": {
              "& .MuiInputLabel-root": {
                letterSpacing: ".3px",
                ...theme.typography.typography15,
                ...(!Boolean(
                  formik.touched.user_id && formik.errors.user_id
                ) && {
                  color: theme.palette.common.black,
                }),
                fontFamily: theme.fontFaces.helveticaNeueMedium,
              },
              "& .MuiInputLabel-shrink": {
                color: theme.palette.error.main,
                ...(!Boolean(
                  formik.touched.user_id && formik.errors.user_id
                ) && {
                  color: theme.palette.grey["shrink"],
                }),
              },
            },
          };
        }}
      />
      <PasswordBox
        fullWidth
        label={translate("Enter_Password")}
        variant="standard"
        name="pass_word"
        value={formik.values.pass_word}
        onChange={formik.handleChange}
        helperText={formik.touched.pass_word && formik.errors.pass_word}
        inputSx={(theme) => ({
          "&.MuiTextField-root": {
            "& .MuiInputLabel-root": {
              letterSpacing: ".3px",
              ...theme.typography.typography15,
              ...(!Boolean(
                formik.touched.pass_word && formik.errors.pass_word
              ) && {
                color: theme.palette.common.black,
              }),
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
            "& .MuiInputLabel-shrink": {
              color: theme.palette.error.main,
              ...(!Boolean(
                formik.touched.pass_word && formik.errors.pass_word
              ) && {
                color: theme.palette.grey["shrink"],
              }),
            },
          },
        })}
      />
    </>
  );
};

export default LoginForm;
