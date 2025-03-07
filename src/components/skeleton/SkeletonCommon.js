import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";

const Stack = dynamic(() => import("@mui/material/Stack"), {
  loading: () => <></>,
  ssr: true,
});

// ----------------------------------------------------------------------

export default function SkeletonCommon({
  parentSkeletonKeyName = "Parent",
  parentCount = 1,
  childSkeletonKeyName = "Child",
  childCount = 1,
  stackSpacing = 2,
  imageVariant = "rectangular",
  imgSx = "",
  lineSx = "",
  center = "center",
  lineVariant = "rectangular",
  imageAnimation = "",
  lineAnimation,
  childWidth = "",
  row = "row",
  lineRow = "row",
  isImageShow = false,
  backgroundColor,
  mainHeight,
  mainSx,
}) {
  return [...Array(parentCount)].map((item, index) => {
    return (
      <Box
        key={`${parentSkeletonKeyName}-${item}-${index}`}
        sx={{
          mx: 0,
          width: childWidth ? childWidth : "100%",
          height: mainHeight ? mainHeight : "auto",
          ...mainSx,
        }}
      >
        <Stack spacing={2} direction={row} alignItems={center}>
          {isImageShow && (
            <Skeleton
              animation={imageAnimation}
              variant={imageVariant}
              color="grey.800"
              sx={{
                ...(backgroundColor && {
                  "&.MuiSkeleton-root": {
                    backgroundColor: backgroundColor,
                  },
                }),
                ...imgSx,
              }}
            />
          )}
          <Stack spacing={stackSpacing} direction={lineRow} width={childWidth}>
            {[...Array(childCount)].map((childItem, childIndex) => {
              return (
                <Skeleton
                  key={`${childSkeletonKeyName}-${childItem}-${childIndex}`}
                  variant={lineVariant}
                  sx={{
                    ...(backgroundColor && {
                      "&.MuiSkeleton-root": {
                        backgroundColor: backgroundColor,
                      },
                    }),
                    ...lineSx,
                  }}
                  animation={lineAnimation}
                />
              );
            })}
          </Stack>
        </Stack>
      </Box>
    );
  });
}
