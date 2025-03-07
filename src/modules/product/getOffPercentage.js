import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const GetOffPercentage = ({ new_value, old_value, variant }) => {
  const { t: translate } = useTranslation();
  let oldValue = Number(old_value);
  let newValue = Number(new_value);

  let per = 100 - (newValue / oldValue) * 100;
  let val = Math.round(per);

  return (
    <Typography
      variant={variant}
      component="p"
      color={(theme) => theme.palette.error.lighterError}
      fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
      fontWeight={500}
      noWrap
    >
      {`${val}% ${translate("OFF")}`}
    </Typography>
  );
};

export default GetOffPercentage;
