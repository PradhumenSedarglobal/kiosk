import { CustomLink } from "@/components/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const CustomBreadCrumb = ({ data }) => {
  console.log(data,'breadcrumb data');
  const { t: translate } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Breadcrumbs aria-label="breadcrumb">
        <CustomLink underline="hover" color="inherit" link="/">
          <Typography
            color="inherit"
            typography="typography14"
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          >
            {translate("home")}
          </Typography>
        </CustomLink>
        {data?.links &&
          data?.links?.length > 0 &&
          data?.links?.map((elem, index) => {
            if (elem?.value) {
              return (
                <CustomLink
                  key={`BREADCRUMB-${index}`}
                  link={`${elem?.value}`}
                  color="inherit"
                >
                  <Typography
                    color="inherit"
                    typography="typography14"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {elem?.label}
                  </Typography>
                </CustomLink>
              );
            } else {
              return (
                <Typography
                  color="inherit"
                  typography="typography14"
                  fontFamily={(theme) =>
                    `${theme.fontFaces.helveticaNeue} !important`
                  }
                  key={`BREADCRUMB-${index}`}
                >
                  {elem?.label}
                </Typography>
              );
            }
          })}
      </Breadcrumbs>
    </Container>
  );
};

export default CustomBreadCrumb;
