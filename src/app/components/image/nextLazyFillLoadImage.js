import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import useResponsive from "@/hooks/useResponsive";

const SkeletonCommon = dynamic(() => import("../skeleton/SkeletonCommon"), {
  ssr: true,
  loading: () => <></>,
});

const NEXT_IMAGE = styled(Image, {
  shouldForwardProp: (prop) => prop !== "objectFit",
})(({ objectFit }) => ({
  objectFit: objectFit,
  background: "transparent",
}));

const NextLazyFillImage = (props) => {
  const {
    src,
    sx,
    bxSx,
    aspectRatio = "16 / 4",
    upLgWidth = 1080,
    downLgWidth = 828,
    downMdWidth = 828,
    downSmWidth = 640,
    downXsWidth = 480,
    width,
    height,
    isEagerLoading = false,
    borderRadius = "0px",
    alt,
  } = props;

  const [loading, setLoading] = React.useState(true);

  const isUpLg = useResponsive("up", "lg");
  const isDownLg = useResponsive("down", "lg");
  const isDownMd = useResponsive("down", "md");
  const isDownSm = useResponsive("down", "sm");
  const isDownXs = useResponsive("down", "xs");

  const akamaiLoader = ({ src, width }) => {
    let imWidth = upLgWidth;
    if (isDownLg && !isDownMd && !isDownSm && !isDownXs) {
      imWidth = downLgWidth;
    } else if (isDownMd && !isDownSm && !isDownXs) {
      imWidth = downMdWidth;
    } else if (isDownSm && !isDownXs) {
      imWidth = downSmWidth;
    } else if (isDownXs) {
      imWidth = downXsWidth;
    }
    const newSrc =
      src && src.split("?imWidth")?.length > 0 ? src.split("?imWidth")[0] : src;
    return `${newSrc}?imwidth=${imWidth}`;
  };

  React.useEffect(() => {
    if (src) setLoading(true);
  }, [src]);

  const getSizes = () => {
    return `(min-width: 1280px) ${upLgWidth}px, 
            (min-width: 960px) ${downLgWidth}px, 
            (min-width: 600px) ${downMdWidth}px, 
            (min-width: 0px) ${downXsWidth}px`;
  };

  return (
    <Box
      component="div"
      sx={{
        objectFit: "cover",
        aspectRatio: aspectRatio,
        width: "100%",
        position: "relative",
        borderRadius: borderRadius,
        overflow: "hidden",
        ...bxSx,
      }}
    >
      {loading && (
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: (theme) => alpha(theme.palette.common.white, 1),
          }}
        >
          <SkeletonCommon
            parentSkeletonKeyName="PARENT-Success"
            parentCount={1}
            childSkeletonKeyName="CHILD-Success"
            childCount={1}
            stackSpacing={2}
            imageVariant="linear"
            row="column"
            center="center"
            imgSx={{
              width: "100%",
              height: "100%",
              borderRadius: borderRadius,
            }}
            lineSx={{
              width: "100%",
              height: "100%",
              borderRadius: borderRadius,
              backgroundSize: "cover",
              aspectRatio: aspectRatio,
              bgcolor: "grey.400",
              borderRadius: borderRadius,
            }}
            lineVariant="rectangular"
            lineRow="row"
            imageAnimation="wave"
            lineAnimation="pulse"
            childWidth="100%"
            isImageShow={false}
          />
        </Box>
      )}
      <NEXT_IMAGE
        src={src || "/assets/loading_image/lazyLoadImage.svg"}
        alt={alt || "image"}
        // placeholder="blur"
        // blurDataURL={src}
        loader={akamaiLoader}
        onLoad={() => setLoading(false)}
        priority={isEagerLoading}
        fill={!isEagerLoading}
        // sizes={!isEagerLoading && getSizes()}
        width={isEagerLoading ? width : undefined}
        height={isEagerLoading ? height : undefined}
        loading={isEagerLoading ? "eager" : "lazy"}
        sx={sx}
      />
    </Box>
  );
};

export default NextLazyFillImage;
