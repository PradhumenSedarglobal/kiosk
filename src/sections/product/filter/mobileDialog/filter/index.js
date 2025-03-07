import useProduct from "@/provider/product/useProduct";
import { useDispatch } from "@/redux/store";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import MobileTabPanel from "./panel";
import MobileTab from "./tab";

const MobileFilterTab = ({
  value,
  handleChangeTab,
  handlePush,
  handleClose,
  handleSingleAccordianReset,
  productFilter,
  productFilterDropdown,
  handleWidthSliderChange,
  handleHeightSliderChange,
  widthFilter,
  heightFilter,
}) => {
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const dispatch = useDispatch();
  const { push, query, pathname } = useRouter();
  const { slug, page } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";

  return (
    <Box component="div" sx={{ height: "100%" }}>
      <TabContext value={value}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item md={2.5} sm={3} xs={4.5} xxs={4.5}>
            <MobileTab
              handleChangeTab={handleChangeTab}
              productFilter={productFilter}
              value={value}
            />
          </Grid>
          <Grid item md={9.5} sm={9} xs={7.5} xxs={7.5}>
            <MobileTabPanel
              handleClose={handleClose}
              handlePush={handlePush}
              productFilter={productFilter}
              checkedFilterData={checkedFilterData}
              handleSingleAccordianReset={handleSingleAccordianReset}
              productFilterDropdown={productFilterDropdown}
              handleWidthSliderChange={handleWidthSliderChange}
              handleHeightSliderChange={handleHeightSliderChange}
              widthFilter={widthFilter}
              heightFilter={heightFilter}
            />
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  );
};

export default MobileFilterTab;
