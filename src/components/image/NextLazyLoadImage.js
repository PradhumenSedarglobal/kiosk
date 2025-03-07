import useResponsive from "@/hooks/useResponsive";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import React from "react";

const SkeletonCommon = dynamic(() => import("../skeleton/SkeletonCommon"), {
  ssr: true,
  loading: () => <></>,
});

const NextImage = dynamic(() => import("next/image"), {
  loading: () => (
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
        height: "100px",
        borderRadius: "5px",
      }}
      lineSx={{
        width: "100%",
        height: "110px",
        borderRadius: "5px",
      }}
      lineVariant="rectangular"
      lineRow="row"
      imageAnimation="wave"
      lineAnimation="wave"
      childWidth="100%"
      isImageShow={false}
    />
  ),
  ssr: true,
});

const NEXT_IMAGE = styled(NextImage, {
  shouldForwardProp: (prop) => prop !== "objectFit",
})(({ objectFit }) => ({
  width: "auto!important",
  objectFit: objectFit,
  background: "transparent",
}));

const NextLazyLoadImage = (props) => {
  const {
    src,
    alt = "Next-IMAGE",
    objectFit = "cover",
    className,
    sx,
    sizes,
    width,
    height,
    upLgWidth = 0,
    downLgWidth = 0,
    downMdWidth = 0,
    downSmWidth = 0,
    downXsWidth = 0,
  } = props;
  const [imageSize, setImageSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [imageSrc, setImageSrc] = React.useState(src);
  const isUpLg = useResponsive("up", "lg");
  const isDownLg = useResponsive("down", "lg");
  const isDownMd = useResponsive("down", "md");
  const isDownSm = useResponsive("down", "sm");
  const isDownXs = useResponsive("down", "xs");

  React.useEffect(() => {
    setImageSrc(src);
  }, [src, alt]);


  const akamaiLoader = React.useMemo(() => {
    return ({ src, width }) => {
      let imWidth = upLgWidth || 1080;
      if (isUpLg) {
        imWidth = upLgWidth || 1080;
      } else if (isDownLg && !isDownMd && !isDownSm && !isDownXs) {
        imWidth = downLgWidth || 828;
      } else if (isDownMd && !isDownSm && !isDownXs) {
        imWidth = downMdWidth || 828;
      } else if (isDownSm && !isDownXs) {
        imWidth = downSmWidth || 640;
      } else if (isDownXs) {
        imWidth = downXsWidth || 480;
      }
      const newSrc =
        src && src.split("?imWidth")?.length > 0
          ? src.split("?imWidth")[0]
          : src;
      return `${newSrc}?imWidth=${imWidth || width}`;
    };
  }, [
    src,
    isDownMd,
    isUpLg,
    isDownLg,
    isDownSm,
    isDownXs,
    upLgWidth,
    downLgWidth,
    downMdWidth,
    downSmWidth,
    downXsWidth,
    sx,
    imageSize,
    imageSrc,
  ]);

  const blurDataURL = React.useMemo(() => {
    let imWidth = upLgWidth || 1080;
    if (isUpLg) {
      imWidth = upLgWidth || 1080;
    } else if (isDownLg && !isDownMd && !isDownSm && !isDownXs) {
      imWidth = downLgWidth || 828;
    } else if (isDownMd && !isDownSm && !isDownXs) {
      imWidth = downMdWidth || 828;
    } else if (isDownSm && !isDownXs) {
      imWidth = downSmWidth || 640;
    } else if (isDownXs) {
      imWidth = downXsWidth || 480;
    }
    return `${src}?imWidth=${imWidth || width}`;
  }, [
    src,
    isDownMd,
    isUpLg,
    isDownLg,
    isDownSm,
    isDownXs,
    upLgWidth,
    downLgWidth,
    downMdWidth,
    downSmWidth,
    downXsWidth,
    sx,
    imageSize,
    imageSrc,
  ]);

  const MemoLazyLoad = React.useMemo(() => {
    return (
      <NEXT_IMAGE
        blurDataURL={blurDataURL || "/assets/loading_image/lazyLoadImage.svg"}
        loader={akamaiLoader}
        sizes={
          sizes ||
          "(max-width: 430px) 430px, (max-width: 768px) 768px, (max-width: 900px) 900px, (max-width: 1200px) 1200px, (max-width: 1400px) 1400px, (max-width: 1600px) 1600px, (max-width: 1920px) 1920px"
        }
        className={className}
        sx={sx}
        fetchPriority="auto"
        placeholder="blur"
        style={{
          objectFit: objectFit,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
        width={width}
        height={height}
        // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
        src={imageSrc || "/assets/loading_image/lazyLoadImage.svg"}
        alt={alt}
        // lazy="true"
        quality={75}
        // decoding="async"
        priority={true}
        loading="eager"
        onLoad={(e) => {
          setImageSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          });
        }}
        onError={(e) => {
          setImageSrc("/assets/loading_image/lazyLoadImage.svg");
          console.error("Error loading image:", e);
        }}
      />
    );
  }, [
    src,
    alt,
    objectFit,
    className,
    sx,
    sizes,
    isDownMd,
    isUpLg,
    isDownLg,
    isDownSm,
    isDownXs,
    upLgWidth,
    downLgWidth,
    downMdWidth,
    downSmWidth,
    downXsWidth,
    imageSize,
    imageSrc,
  ]);

  return MemoLazyLoad;
};

export default NextLazyLoadImage;
