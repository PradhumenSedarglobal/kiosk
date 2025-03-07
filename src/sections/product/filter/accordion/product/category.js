import { SelectBox } from "@/components/form";
import { setActivePage } from "@/redux/slices/product";
import { useDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
const CategoryFilter = ({ productFilterDropdown }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { slug, page } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";

  const handleSelect = (item) => {
    if (page) {
      dispatch(setActivePage(1));
    }

    if (item) {
      push({
        pathname: `${item?.SC_LINK_URL}`,
      });
    }
  };

  return (
    <Box component="div" mb={2}>
      <Typography
        component="label"
        variant="typography12"
        sx={(theme) => ({
          color: theme.palette.grey[2600],
          letterSpacing: ".24px",
        })}
        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
        fontWeight={500}
      >
        {translate("ProductCategory")}
      </Typography>
      <Box component="div" position="relative">
        <SelectBox
          fullWidth
          value={
            productFilterDropdown &&
            productFilterDropdown?.length > 0 &&
            productFilterDropdown?.find((item) => {
              return item?.SC_LINK_URL == category;
            })?.SC_LINK_URL
          }
          onChange={(e) => {
            let data =
              productFilterDropdown &&
              productFilterDropdown?.length > 0 &&
              productFilterDropdown
                ?.filter((item) => item?.SC_LINK_URL === e.target.value)
                .find((item) => {
                  return item;
                });
            handleSelect(data);
          }}
          formSx={(theme) => ({
            "& .MuiOutlinedInput-input": {
              borderRadius: "0px",
              color: theme.palette.common.black,
              ...theme.typography.typography15,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "0px",
            },
          })}
          options={productFilterDropdown || []}
        />
      </Box>
    </Box>
  );
};

export default CategoryFilter;
