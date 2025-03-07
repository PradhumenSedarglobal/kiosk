import { CustomLink } from "@/components/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const Enquiries = ({ data }) => {
  const { locale } = useRouter();
  return (
    <Card sx={{ borderRadius: "0px", my: 4 }}>
      <CardContent>
        <Typography
          component="h2"
          fontWeight={400}
          mb={8}
          textAlign={{
            lg: "center",
            md: "center",
            sm: "start",
            xs: "start",
            xxs: "start",
          }}
          fontSize={{
            lg: "39px",
            md: "39px",
            sm: "32px",
            xs: "32px",
            xxs: "32px",
          }}
          lineHeight={{
            lg: "49px",
            md: "49px",
            sm: "normal",
            xs: "normal",
            xxs: "normal",
          }}
          fontFamily={(theame) => theame.fontFaces.helveticaNeueMedium}
          color={(theme) => theme.palette.common.black}
        >
          {data?.title}
        </Typography>
        <Container maxWidth="md">
          <Grid container spacing={6} justifyContent="center">
            {data?.SUB_CHILD &&
              data?.SUB_CHILD?.length > 0 &&
              data?.SUB_CHILD.map((item, index) => {
                return (
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    xxs={12}
                    key={`MORE-ENQUIRIES-FORM-${index}`}
                  >
                    <Typography
                      component="div"
                      fontSize="16px"
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                      sx={(theme) => ({
                        "& p": {
                          color: theme.palette.common.black,
                          fontFamily: theme.fontFaces.helveticaNeueLight,
                          fontWeight: "700",
                          lineHeight: "24px",
                          marginBlockStart: 0,
                          marginBlockEnd: 0,
                        },
                      })}
                    />
                    <CustomLink href={"mailto:item?.link_url"} locale={locale}>
                      <Typography
                        fontFamily={(theame) => theame.fontFaces.helveticaNeue}
                        component="p"
                        fontSize={12}
                        lineHeight="19px"
                        color="primary"
                        fontWeight={500}
                      >
                        {item?.link_title}
                      </Typography>
                    </CustomLink>
                    <Divider sx={{ mt: 3.7 }} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

export default Enquiries;
