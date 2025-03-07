import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
const MobileTab = ({ productFilter, handleChangeTab, value }) => {
  return (
    <TabList
      orientation="vertical"
      scrollButtons={false}
      onChange={(e, newValue) => {
        handleChangeTab(e, newValue);
      }}
      aria-label="lab API tabs example"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[5100],
        height: "100%",
        "& .MuiTab-root": {
          alignItems: "center",
          justifyContent: "left",
          paddingLeft: 1,
          zIndex: 2,
          minWidth: "164.66px",
          width: "100%",
          minHeight: "85px !important",
          height: "100%",
        },
        // },
        "& .MuiTabs-indicator": {
          left: 0,
          width: "100%",
          zIndex: 1,
          backgroundColor: "common.white",
          border: (theme) => `1px solid ${theme.palette.grey[5100]}`,
        },
      }}
    >
      {productFilter &&
        productFilter?.MOBILE_DATA &&
        productFilter?.MOBILE_DATA?.FILTERS?.length > 0 &&
        productFilter?.MOBILE_DATA?.FILTERS.map((item, index) => {
          return (
            <Tab
              key={`MOBILE-FILTER-${item?.label}-${index}`}
              label={
                <Typography
                  ml={1}
                  sx={(theme) => ({
                    ...theme.typography.typography24,
                    fontFamily: theme.fontFaces.helveticaNeue,
                    color: theme.palette.common.black,
                  })}
                >
                  {item?.label}
                </Typography>
              }
              value={String(item?.value)}
            />
          );
        })}
    </TabList>
  );
};

export default MobileTab;
