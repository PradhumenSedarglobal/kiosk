import React, { useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

const ImageCard = ({
  functionname,
  index,
  img,
  refName,
  category,
  name,
  selected,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImageList
      sx={{
        width: "auto",
        height: "auto",
        pb: 3,
        pt: 3,
        m: 0,
        gap: 12,
        height: "auto",
        display: "flex", 
        overflow: "hidden", 
        "&::-webkit-scrollbar": { display: "none" }, 
        "-ms-overflow-style": "none", 
        "scrollbar-width": "none", 
      }}
    >
      <ImageListItem
        ref={refName}
        onClick={() => functionname(link)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: "12px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "transform 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95), box-shadow 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          backgroundColor: "#fff",
          overflow: "hidden",
          cursor: "pointer",

          boxShadow:
            selected || category === index
              ? "0 0 0 3px #ef9c00" 
              : isHovered
              ? "0px 4px 12px rgba(86, 80, 75, 0.4)" 
              : "0px 2px 5px rgba(0, 0, 0, 0.1)", 

          "&:hover": {
            transform: "translateY(-5px)", // Lift effect
          },
          "&:active": {
            transform: "scale(0.98)", // Click press effect
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          },
          "@media (max-width: 768px)": {
            width: "100%",
          },
        }}
      >
        <img
          src={img || "/notfound.jpg"}
          alt={name}
          loading="lazy"
          style={{
            width: {xs:"200px !important",sm:"300px !important",md:"auto"},
            height: "150px",
            objectFit: "cover",
          }}
        />
        <ImageListItemBar 
          title={
            name.length > 15 
              ? name.substring(0, name.lastIndexOf(" ", 15)) + "..." 
              : name
          } 
        />
      </ImageListItem>
    </ImageList>
  );
};

export default ImageCard;