import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

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
  const fonts = useSelector((state) => state.font);

  return (
    <Card
      ref={refName}
      onClick={() => functionname(link)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        borderRadius: "12px",
        transition:
          "transform 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95), box-shadow 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
        backgroundColor: "#fff",
        overflow: "hidden",
        cursor: "pointer",
        height:"100% !important",
        border:
          selected || category === index
            ? "4px solid #ef9c00"
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
      }}
    >
      <CardMedia
        component="img"
        image={img || "/notfound.jpg"}
        alt={name}
        loading="lazy"
        sx={{
          width: img ? "100%" : "50%", // Center fallback image
          height: "120px",
          objectFit: img ? "cover" : "contain",
          margin: !img ? "0 auto" : "unset", // Center horizontally when no image
          display: !img ? "block" : "unset",
        }}
      />
      <CardContent
        sx={{
          padding: "16px",
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
            fontSize: "14px !important",
           
          }}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
