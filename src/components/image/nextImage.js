import React, { useState } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";

function akamaiLoader({ src, width }) {
  return `${src}?imwidth=${width}`;
}

const NextImage = (props) => {
  const {
    src,
    alt = "",
    width,
    height,
    quality,
    unoptimized,
    layout = "responsive",
    objectFit = "cover",
    sx,
    sizes = "",
  } = props;

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const placeholder =
    imageSize.width <= 40 && imageSize.height <= 40 ? undefined : "blur";
  return (
    <React.Fragment>
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 0,
          width: "auto!important",
          objectFit: objectFit,
          background: "transparent",
          ...sx,
        }}
        style={{
          objectFit: objectFit,
        }}
        component={Image}
        loader={akamaiLoader}
        placeholder={placeholder}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
        src={src || "/assets/loading_image/lazyLoadImage.svg"}
        alt={alt}
        width={width || 250}
        height={height || 250}
        layout={layout || "responsive"}
        unoptimized={unoptimized || false}
        quality={quality || 85}
        defer
        sizes={sizes}
        onLoad={(e) => {
          setImageSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          });
        }}
      />
    </React.Fragment>
  );
};
export default NextImage;
