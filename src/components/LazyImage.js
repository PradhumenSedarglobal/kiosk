import NextImage from "next/image";
import { styled } from "@mui/material/styles";
const StyledLazyImage = styled(NextImage)(({ theme }) => {
  return {
    width: "100%",
    height: "auto",
    transition: theme.transitions.create(["all"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
  };
});

import React from "react";

const LazyImage = ({
  src,
  alt,
  width,
  height,
  sizes,
  fallbackSrc = "/assets/loading_image/lazyLoadImage.svg",
  isdarkmode = false,
  ...rest
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(src);

  React.useEffect(() => {
    setIsLoading(true);
  }, []);
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };
  return (
    <StyledLazyImage
      {...rest}
      src={imageSrc || src}
      alt="Image"
      onLoading={handleLoadingComplete} 
      width={width}
      sizes={sizes}
      height={height}
      isdarkmode={isdarkmode}
      onError={handleError}
      loader={({ src, width }) => {
        const newSrc =
          src && src.split("?imWidth")?.length > 0
            ? src.split("?imWidth")[0]
            : src;
        return `${newSrc}?imwidth=${width}`;
      }}
    />
  );
};

export default LazyImage;
