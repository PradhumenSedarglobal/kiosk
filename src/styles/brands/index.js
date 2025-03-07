import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const BrandsProductionHeading = styled(Typography)(({ theme }) => ({
  paddingLeft: "30px",
  color: theme.palette.common.black,
  borderLeft: `2px solid ${theme.palette.primary.light}`,
  letterSpacing: 0,
  ...theme.typography.typography39,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  mb: 0,
}));

export const BrandsProductionText = styled(Typography)(({ theme }) => ({
  "& p": {
    fontSize: "18px",
    letterSpacing: 0,
    lineHeight: 1.8,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const BrandsCollapse = styled("div")(({ theme }) => ({
  minHeight: "150px",
  "& .collapsecontent": {
    position: "relative",
    padding: "3rem",
    ".heading": {
      h3: {
        fontFamily: theme.fontFaces.helveticaNeueBold,
        ...theme.typography.typography20,
        letterSpacing: "0px",
        color: theme.palette.common.black,
        paddingLeft: "18px",
        borderLeft: "2px solid #fdcc5d",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      },
    },
    ".textcontent": {
      paddingLeft: "20px",
      p: {
        fontFamily: theme.fontFaces.helveticaNeueLight,
        ...theme.typography.typography18,
        letterSpacing: "0.54px",
        color: theme.palette.common.black,
      },
    },

    ".closebutton": {
      cursor: "pointer",
      position: "absolute",
      right: "5%",
      top: "5%",
      color: "#000",
      fontSize: "2.0rem",
    },
  },
}));

export const BrandPageCollaps = styled("section")(({ theme }) => ({
  minHeight: "150px",
  "&.BrandPage": {
    position: "relative",
    padding: "25px 0",
    ".max-width": {
      maxwidth: "1340px",
    },

    ".brandgrid": {
      textAlign: "center",
      padding: "30%",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },

      ".lazy-load-image-loaded": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },

      ".imsg": {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      },
    },

    ".cards": {
      flexFlow: "row wrap",
      ".expend": {
        maxHeight: "1000px",
        minHeight: "200px",
        overflow: "visible",
        marginTop: "30px",
        opacity: 1,
        transition: "all 0.2s ease-in-out",
        backgroundColor: "#333a45",
        width: 100,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // text-transform: uppercase;
        color: "#eceef1",
        fontSize: "1.5em",
      },
    },

    //Grid Container
    ".cards": {
      padding: "15px",
      display: "flex",
      flexFlow: "row wrap",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },

    //Cards
    ".card": {
      border: "none",
      margin: "15px",
      width: "calc((100% / 3) - 30px)",
      //transition: all 0.2s ease-in-out;

      //media queries for stacking cards
      [theme.breakpoints.down("md")]: {
        width: "calc((100% / 2) - 30px)",
      },

      [theme.breakpoints.down("sm")]: {
        width: "calc((100% / 3) - 10px)",
        margin: "5px",
      },
      [theme.breakpoints.down("xxs")]: {
        width: "calc((100% / 2) - 10px)",
        margin: "5px",
      },

      "&__inner": {
        width: "100%",
        padding: "30px",
        [theme.breakpoints.down("sm")]: {
          padding: "5px",
          backgroundColor: "transparent",
        },

        position: "relative",
        cursor: "pointer",

        backgroundColor: "#f5f5f5",
        color: "common.white",
        fontSize: "1.5em",
        // text-transform: uppercase;
        textAlign: "center",

        ".fa": {
          width: "100%",
          marginTop: "0.25em",
        },
      },

      //Expander
      "&__expander": {
        transition: "all 0.2s ease-in-out",
        backgroundColor: "common.white",
        width: "100%",
        position: "relative",

        // display: flex;
        justifyContent: "center",
        alignItems: "center",

        // text-transform: uppercase;
        color: "common.white",
        fontSize: "1.5em",

        ".fa": {
          fontSize: "0.75em",
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",

          "&:hover": {
            opacity: 0.9,
          },
        },
      },

      "&.is-collapsed": {
        ".card__inner": {
          "& :after": {
            content: '""',
            opacity: 0,
          },
        },
        ".card__expander ": {
          maxHeight: 0,
          minHeight: 0,
          overflow: "hidden",
          marginTop: 0,
          opacity: 0,
        },
      },

      ".is-expanded": {
        ".card__inner": {
          backgroundColor: "#3861a0",

          "&:after": {
            content: '""',
            opacity: 1,
            display: "block",
            height: 0,
            width: 0,
            position: "absolute",
            bottom: "-30px",
            left: "calc(50% - 15px)",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "15px solid #333a45",
          },

          //folder open icon
          ".fa:before": {
            content: "'\f115'",
          },
          img: {
            filter: " invert(100)",
          },
        },

        ".card__expander": {
          maxHeight: "1000px",
          minHeight: "200px",
          overflow: "visible",
          marginTop: "30px",
          opacity: 1,
          zIndex: 1,
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        },

        "&:hover": {
          ".card__inner ": {
            transform: "scale(1)",
          },
        },
      },

      ".is-inactive": {
        ".card__inner": {
          pointerEvents: "none",
          opacity: 0.5,
        },

        "& :hover": {
          ".card__inner": {
            backgroundColor: "#f5f5f5",
            transform: "scale(1)",
          },
        },
      },
    },

    //Expander Widths

    //when 3 cards in a row
    [theme.breakpoints.up("md")]: {
      ".card:nth-of-type(3n + 2) .card__expander": {
        marginLeft: "calc(-100% - 30px)",
      },
      ".card:nth-of-type(3n + 3) .card__expander": {
        marginLeft: "calc(-200% - 60px)",
        marginRight: "auto!important",
      },
      ".card:nth-of-type(3n + 4)": {
        clear: "left",
      },
      "&.card__expander": {
        width: "calc(300% + 60px)",
      },
    },

    //when 2 cards in a row
    [theme.breakpoints.between("xs", "sm")]: {
      ".card:nth-of-type(2n + 2).card__expander": {
        marginLeft: "calc(-100 % - 30px)",
      },
      ".card: nth-of-type(2n + 3)": {
        clear: "left",
      },
      ".card__expander ": {
        width: "calc(200% + 30px)",
      },
    },
  },
}));
