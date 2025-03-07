import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";

function akamaiLoader({ src, width }) {
  return `${src}?imwidth=${width}`;
}

const IconComponent = (props) => {
  const {
    classprops,
    src,
    alt,
    width,
    height,
    content,
    spanClass,
    quality,
    contains,
    unoptimized,
    marginLeftRight,
    content_align,
  } = props;
  let marginLR = marginLeftRight ? `auto 2px` : "";
  return (
    <div
      style={{
        display: "flex",
        margin: marginLR,
        justifyContent: props?.justifyContent
          ? props?.justifyContent
          : "center",
      }}
    >
      {content && content_align == "left" && (
        <span className={spanClass ? spanClass : "img_with_text"}>
          {content}
        </span>
      )}
      <Box
        component={Image}
        loader={akamaiLoader}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
        className={
          contains ? `${classprops}` : `contains_img ${classprops}` || ""
        }
        src={src || ""}
        alt={alt || ""}
        width={width || 250}
        height={height || 250}
        quality={quality || 85}
        unoptimized={unoptimized || false}
      />
      {content && content_align != "left" && (
        <span className={spanClass ? spanClass : "img_with_text"}>
          {content}
        </span>
      )}
    </div>
  );
};
export default IconComponent;
