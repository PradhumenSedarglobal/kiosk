import ProductGridModule from "@/modules/product";
import { Accordion, AccordionSummary } from "@/styles/contact";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import * as React from "react";

export const CustomMuiTab = styled(Tab)(({ theme }) => ({
  "&.MuiTab-root": {
    marginRight: "50px",
    ...theme.typography.typography45,
    fontWeight: 200,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.primary.main,
    paddingRight: "20px",
    ":not(:last-of-type):after": {
      content: "''",
      borderRight: "2px solid",
      display: "inline-block",
      width: "30px",
      height: "22px",
      marginLeft: "30px",
      position: "absolute",
      right: "0px",
    },
  },
  "&.MuiTab-root:not(.Mui-selected)": {
    color: theme.palette.common.black,
    opacity: ".50",
  },
}));

export const CustomMuiTabList = styled(TabList)(({ theme }) => ({
  "&.MuiTabs-root": {
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
}));

const StickyTab = ({ similarProducts }) => {
  let dataVal = similarProducts?.result?.SIMILAR_COLOR
    ? similarProducts?.result?.SIMILAR_COLOR
    : {};
  const unique_pattern = [
    ...new Set(Object.values(dataVal).map((row) => row.SFI_PATTERN_DESC)),
  ];
  const [value, setValue] = React.useState(unique_pattern[0] || "");
  const { t: translate } = useTranslation();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const filterSimilarColor = React.useMemo(() => {
    return similarProducts?.result?.SIMILAR_COLOR?.length
      ? similarProducts?.result?.SIMILAR_COLOR?.filter(
        (item) => item?.SFI_PATTERN_DESC == value
      )
      : [];
  }, [value, similarProducts?.result?.SIMILAR_COLOR]);

  return (
    <>
      <Box
        sx={{ width: "100%", typography: "body1" }}
        display={{
          lg: "block",
          md: "block",
          sm: "none",
          xs: "none",
          xxs: "none",
        }}
      >
        <TabContext value={value}>
          <Grid container>
            <Grid
              item
              md={3}
              sx={{
                display: { md: "block", sm: "none", xs: "none", xxs: "none" },
              }}
            >
              <Box>
                <Typography
                  component="li"
                  variant="typography18"
                  sx={(theme) => ({
                    fontSize: "1.15rem",
                    fontFamily: theme.fontFaces.helveticaNeue,
                    color: " #777",
                    pb: "0px",
                    mt: 1,
                  })}
                >
                  {translate("SimilarColors")}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={9}>
              <Stack
                direction="row"
                alignItems="center"
                columnGap={0}
                flexWrap="wrap"
              >
                <CustomMuiTabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {unique_pattern?.length &&
                    unique_pattern?.map((item, index) => {
                      return (
                        <CustomMuiTab
                          key={`${item}-${index}`}
                          label={item}
                          value={item}
                        />
                      );
                    })}
                </CustomMuiTabList>
              </Stack>
              {unique_pattern?.length &&
                unique_pattern?.map((elem, index) => {
                  return (
                    <TabPanel
                      value={elem}
                      key={`CARD_${index}`}
                      sx={{ padding: "0px!important" }}
                    >
                      <Box component="div">
                        <ProductGridModule
                          type="offers"
                          materialData={filterSimilarColor || []}
                          isSwiperArrow={false}
                          isSimilarProduct={true}
                          isCustomBreakpoints={true}
                          breakpoints={{
                            // when window width is >= 320px
                            0: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            400: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            // when window width is >= 480px
                            576: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            // when window width is >= 640px
                            816: {
                              slidesPerView: 3,
                              spaceBetween: 30,
                            },
                          }}
                          viewNumber={4}
                        />
                      </Box>
                    </TabPanel>
                  );
                })}
            </Grid>
          </Grid>
        </TabContext>
      </Box>

      <Box
        sx={{ width: "100%", typography: "body1" }}
        display={{
          lg: "none",
          md: "none",
          sm: "block",
          xs: "block",
          xxs: "block",
        }}
      >
        <Accordion>
          <AccordionSummary>
            <Typography
              component="h3"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.HelveticaNeueBold,
                fontWeight: 600,
                fontSize: "18px",
                color: "#000",
                mb: 1,
              })}
            >
              {translate("SimilarColors")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TabContext value={value}>
              <Stack
                direction="row"
                alignItems="center"
                columnGap={4}
                flexWrap="wrap"
              >
                <CustomMuiTabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {unique_pattern?.length &&
                    unique_pattern?.map((item, index) => {
                      return (
                        <CustomMuiTab
                          key={`${item}-${index}`}
                          label={item}
                          value={item}
                        />
                      );
                    })}
                </CustomMuiTabList>
              </Stack>
              {unique_pattern?.length &&
                unique_pattern?.map((elem, index) => {
                  return (
                    <TabPanel value={elem} key={`CARD_${index}`}>
                      <Box component="div">
                        <ProductGridModule
                          type="offers"
                          materialData={filterSimilarColor || []}
                          isSwiperArrow={false}
                          isCustomBreakpoints={true}
                          breakpoints={{
                            // when window width is >= 320px
                            0: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            400: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            // when window width is >= 480px
                            576: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            // when window width is >= 640px
                            816: {
                              slidesPerView: 3,
                              spaceBetween: 30,
                            },
                          }}
                        />
                      </Box>
                    </TabPanel>
                  );
                })}
            </TabContext>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
export default StickyTab;
