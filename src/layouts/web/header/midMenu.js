import LazyImage from "@/components/LazyImage";
import { CustomLink } from "@/components/link";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";


const MidMenu = ({ layout = [], isRu }) => {
  const [clickedItems, setClickedItems] = React.useState({});

  const handleClickColorChange = (index) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle clicked state for the clicked item
    }));
  };
  const { locale } = useRouter();

  return (
    <Stack
      width="100%"
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={{ lg: isRu ? 3 : 4, md: isRu ? 1 : 4 }}
      justifyContent="end"
      display={{
        lg: "flex",
        md: "none",
        sm: "none",
        xs: "none",
        xxs: "none",
      }}
    >
      {layout &&
        layout?.HEADER?.MIDMENU?.length > 0 &&
        layout?.HEADER?.MIDMENU?.length > 0 &&
        layout?.HEADER?.MIDMENU?.map((item, index) => {
          if (item?.link_title == "User Menu") {
            return "";
          } else {
            return (
              <CustomLink
                key={`${item?.content}-${index}-${item?.link_url}`}
                link={`${item?.link_url}`}
                locale={locale}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  width="max-content"
                  sx={{ cursor: "pointer" }}
                >
                  <LazyImage
                    sx={{
                      width: "32px!important",
                      height: "24px!important",
                    }}
                    src={item?.image_path}
                    alt={item?.content}
                    width={32}
                    height={24}
                  />
                  <Typography
                    className="category-text"
                    component="p"
                    variant="typography15"
                    noWrap
                    fontWeight={200}
                    sx={(theme) => ({
                      color: clickedItems[index]
                        ? theme.palette.primary.main
                        : theme.palette.common.black,
                      cursor: "pointer",
                      position: "relative",
                      fontFamily: theme.fontFaces.helveticaNeue,
                    })}
                    onClick={() => handleClickColorChange(index)}
                  >
                    {item?.content}
                  </Typography>
                </Stack>
              </CustomLink>
            );
          }
        })}
    </Stack>
  );
};

export default MidMenu;
