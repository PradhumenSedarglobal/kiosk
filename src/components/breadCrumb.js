import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

const CustomBreadCrumb = ({
  data = [],
  boxSx,
  key,
  display = {
    lg: "block",
    md: "block",
    sm: "none",
    xs: "none",
    xxs: "none",
  },
}) => {
  const { t: translate } = useTranslation();
  return (
    <Box
      pt={8}
      display={display}
      sx={{
        ...boxSx,
      }}
    >
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={NextLink} underline="hover" color="inherit" href="/">
            <Typography
              color="inherit"
              typography="typography16"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {translate("home")}
            </Typography>
          </Link>
          {data &&
            data?.length > 0 &&
            data.map((item, index) => {
              if (item?.isLink) {
                return (
                  <Link
                    key={`${key}-${item?.title}-${index}`}
                    component={NextLink}
                    underline="hover"
                    color="inherit"
                    href={item?.link || ""}
                  >
                    <Typography
                      color="inherit"
                      typography="typography16"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    >
                      {item?.title}
                    </Typography>
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={`${key}-${item?.title}-${index}`}
                    component={NextLink}
                    underline="hover"
                    color="inherit"
                    href={item?.link || ""}
                  >
                    <Typography
                      key={`${key}-${item?.title}-${index}`}
                      color="inherit"
                      typography="typography16"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    >
                      {item?.title}
                    </Typography>
                  </Link>
                );
              }
            })}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default CustomBreadCrumb;
