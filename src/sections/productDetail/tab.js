import { CustomTabList } from "@/styles/homepage/category";
import { ProductCustomTab } from "@/styles/productPage";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Tabs = ({
  title,
  children = {},
  value = "",
  handleChange = () => { },
  tabData = [],
  keyName = "Tab",
}) => {
  return (
    <Box width="100%">
      <Container maxWidth="xl">
        <TabContext value={String(value)}>
          <Grid container>
            <Grid item md={3} sm={12} xs={12} xxs={12}>
              <Typography
                variant="h5"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                sx={{ mt: 1 }}
              >
                {title.title}
              </Typography>
            </Grid>

            <Grid item md={9} sm={12} xs={12} xxs={12}>
              <CustomTabList onChange={handleChange}>
                {tabData &&
                  tabData?.length > 0 &&
                  tabData.map((item, index) => {
                    return (
                      <ProductCustomTab
                        sx={{
                          fontFamily: (theme) =>
                            theme.fontFaces.helveticaNeueMedium,
                          color: (theme) => theme.palette.primary.main,
                        }}
                        label={item?.title}
                        value={String(index + 1)}
                        key={`${index}-TABS-DATA-${keyName}-${index}`}
                      />
                    );
                  })}
              </CustomTabList>
            </Grid>
          </Grid>

          {children}
        </TabContext>
      </Container>
    </Box>
  );
};

Tabs.propTypes = {
  children: PropTypes.object,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  tabData: PropTypes.array,
  keyName: PropTypes.string,
};


export default Tabs;
