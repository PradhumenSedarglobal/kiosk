import Stack from "@mui/material/Stack";
import AvailabilityFilter from "./availability";
import ColorFilter from "./color";
import CommonFilter from "./common";
import MaterialFilter from "./material";
import ProductFilter from "./product";
import SizeFilter from "./size";
import SubCategoryFilter from "./subCategory";

const AccordionFilter = ({
  FILTERS,
  MAIN_CATEGORY,
  PRODUCT,
  handlePush,
  handleSingleAccordianReset,
  productFilterDropdown,
}) => {
  return (
    <Stack spacing={0} mt={0}>
      {FILTERS && FILTERS?.length > 0
        ? FILTERS.map((item, index) => {
          if (item.SFT_CODE == "012") {
            return (
              <SizeFilter
                key={`SIZE-${index}`}
                item={item}
                handlePush={handlePush}
                handleSingleAccordianReset={handleSingleAccordianReset}
              />
            );
          } else if (item.SFT_CODE == "014") {
            return (
              <AvailabilityFilter
                key={`AVAILABILITY-${item?.DESCRIPTION}`}
                item={item}
                handlePush={handlePush}
                handleSingleAccordianReset={handleSingleAccordianReset}
              />
            );
          }
        })
        : ""}

      {MAIN_CATEGORY && MAIN_CATEGORY?.length > 0 && (
        <ProductFilter
          MAIN_CATEGORY={MAIN_CATEGORY}
          handlePush={handlePush}
          handleSingleAccordianReset={handleSingleAccordianReset}
          productFilterDropdown={productFilterDropdown}
          PRODUCT={PRODUCT}
        />
      )}

      {PRODUCT && PRODUCT?.length > 0 && (
        <SubCategoryFilter
          handlePush={handlePush}
          PRODUCT={PRODUCT}
          handleSingleAccordianReset={handleSingleAccordianReset}
        />
      )}

      {FILTERS && FILTERS?.length > 0
        ? FILTERS.map((item, index) => {
          if (item.SFT_CODE == "009") {
            return (
              <ColorFilter
                key={`COLOR-${item?.DESCRIPTION}-${index}`}
                item={item}
                handlePush={handlePush}
                handleSingleAccordianReset={handleSingleAccordianReset}
              />
            );
          } else if (
            item.SFT_CODE != "010" &&
            item.SFT_CODE != "012" &&
            item.SFT_CODE != "013" &&
            item.SFT_CODE != "014"
          ) {
            return (
              <CommonFilter
                key={`COMMON-FILTER-${item?.DESCRIPTION}-${index}`}
                item={item}
                handlePush={handlePush}
                handleSingleAccordianReset={handleSingleAccordianReset}
              />
            );
          } else if (item.SFT_CODE == "006") {
            return (
              <MaterialFilter
                key={`MATERIAL-${item?.DESCRIPTION}-${index}`}
                item={item}
                handlePush={handlePush}
                handleSingleAccordianReset={handleSingleAccordianReset}
              />
            );
          }
        })
        : ""}
    </Stack>
  );
};

export default AccordionFilter;
