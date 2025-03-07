import { useAuthContext } from "@/auth/useAuthContext";
import { NextImage } from "@/components/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const CheckedCard = ({
  title,
  description,
  src,
  alt,
  onClick,
  checked,
  onChange,
  width,
  height,
  sx,
  defaultChecked,
}) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "0px",
        borderColor: (theme) => theme.palette.common.black,
        cursor: "pointer",
      }}
      component="div"
      variant="outlined"
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={4}>
          <Stack
            direction={themeDirection ? "row" : "row-reverse"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              size="small"
              checked={checked}
              onChange={onChange}
              sx={{
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              defaultChecked={defaultChecked}
            />
            <Box>
              <NextImage
                src={src}
                alt={alt}
                sx={{
                  cursor: "pointer",
                  width: { width },
                  height: { height },
                  ...sx,
                }}
              />
            </Box>
          </Stack>
          <Box>
            <Typography
              component="h3"
              variant="typography16"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              fontWeight={400}
              mb={0.5}
              textTransform={"uppercase"}
            >
              {title}
            </Typography>
            <Typography
              component="div"
              variant="typography16"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CheckedCard;
