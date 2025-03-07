import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import CustomListButton from "@/styles/layouts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { countries_lang } from "../../../../utils/countriesData";
import { useRouter } from 'next/router';
import NextLink from "next/link";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
}));

const SectionTwo = ({ secondSection = [] }) => {
  const [open, setOpen] = useState(null);
  const [index4Open, setIndex4Open] = useState(false); 
  const isDownSm = useResponsive("down", "sm");

  const handleClick = useCallback(
    (index) => {
      setOpen((prevOpen) => (prevOpen === index ? null : index));
    },
    [setOpen]
  );

  const handleIndex4Click = () => {
    setIndex4Open((prevOpen) => !prevOpen);
  };

  const renderSubHeader = useCallback(
    (item, index) =>
      isDownSm !== undefined && (
        <>
          {isDownSm ? (
            <CustomListButton onClick={() => handleClick(index)} >
              <ListItemText
                primary={
                  <StyledTypography
                    component="li"
                    variant="subtitle1"
                    fontWeight={400}
                    sx={{ listStyleType: 'none' }}
                  >
                    {item?.content}
                  </StyledTypography>
                }
              />
              {open === index ? (
                <RemoveIcon sx={{ color: "common.white" }} fontSize="small" />
              ) : (
                <AddIcon sx={{ color: "common.white" }} fontSize="small" />
              )}
            </CustomListButton>
          ) : (
            <StyledTypography
              component="li"
              variant="subtitle1"
              paddingBottom="22px"
              fontWeight={500}
              sx={{ listStyleType: 'none' }}

            >
              {item?.content}
            </StyledTypography>
          )}
        </>
      ),
    [open, handleClick, isDownSm]
  );

  const renderChildItems = useCallback(
    (child, childIndex) =>
      isDownSm !== undefined && (
        <CustomLink key={`Child-Datas-${childIndex}`} link={child.link_url}>
          <ListItemText
            component="li"
            sx={(theme) => ({
              "& .MuiTypography-root": {
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                fontWeight: 500,
                color: "grey.1100",
                cursor: "pointer",
                fontSize: {
                  lg: "14px",
                  md: "14px",
                  sm: "16px",
                  xs: "16px",
                  xxs: "16px",
                },
                lineHeight: {
                  lg: "40px",
                  md: "40px",
                  sm: "46px",
                  xs: "46px",
                  xxs: "46px",
                },
              },
            })}
            primary={child?.content}
          />
        </CustomLink>
      ),
    []
  );

  const router = useRouter();
  const { locale } = router;

  return (
    <Grid container spacing={0} justifyContent="stretch">
      {secondSection?.length > 0 &&
        secondSection.map((item, index) => (
          <Grid
            item
            lg={2.4}
            md={2.4}
            sm={12}
            xs={12}
            xxs={12}
            key={`SECINDFOOTER-Sub-Headers-${index}`}
          >
            {index === 4 ? (
              // Show index 4's list only if clicked on mobile view
              <>
                {isDownSm ? (
                  <CustomListButton onClick={handleIndex4Click} >
                    <ListItemText
                    component="li"
                      primary={
                        <StyledTypography
                          component="li"
                          variant="subtitle1"
                          fontWeight={400}
                          sx={{ listStyleType: 'none' ,marginBottom:"15px"}}

                        >
                          {item?.content}
                        </StyledTypography>
                      }
                    />
                    {index4Open ? (
                      <RemoveIcon sx={{ color: "common.white" }} fontSize="small" />
                    ) : (
                      <AddIcon sx={{ color: "common.white" }} fontSize="small" />
                    )}
                  </CustomListButton>
                ) : (
                  <StyledTypography
                    component="li"
                    variant="subtitle1"
                    paddingBottom="22px"
                    fontWeight={500}
                    sx={{ listStyleType: 'none' }}

                  >
                    {item?.content}
                  </StyledTypography>
                )}

                <Collapse in={!isDownSm ? true : index4Open} component="li" sx={!isDownSm ? { marginTop:"-30px"} : { marginTop:"-25px"}}>
                  {Object.values(countries_lang[0][locale.split("-")[1]]).map(
                    (row, i) => (
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: "100%",
                          position: "relative",
                          // overflow: "auto",
                          maxHeight: "100%",

                        }}
                        component="ul"
                        href={`/${row.code}-${row.lang}`}
                        key={i}
                      >
                        <CustomLink key={`Child-Datas-${i}`} link={`/${row.code}-${row.lang}`}>
                          <ListItemText
                            component="li"
                            sx={(theme) => ({
                              "& .MuiTypography-root": {
                                fontFamily: theme.fontFaces.helveticaNeueMedium,
                                fontWeight: 500,
                                marginTop: "20px",
                                color: "grey.1100",
                                cursor: "pointer",
                                fontSize: {
                                  lg: "14px",
                                  md: "14px",
                                  sm: "16px",
                                  xs: "16px",
                                  xxs: "16px",
                                },
                                lineHeight: {
                                  lg: "1px",
                                  md: "1px",
                                  sm: "5px",
                                  xs: "5px",
                                  xxs: "5px",
                                },
                              },
                            })}
                            primary={row?.name}
                          />
                        </CustomLink>
                      </List>
                    )
                  )}
                </Collapse>
              </>
            ) : item?.CHILD ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: "100%",
                }}
                component="ul"
                subheader={renderSubHeader(item, index)}
              >
                <Collapse in={isDownSm ? open === index : true} component="li">
                  {item?.CHILD?.map(renderChildItems)}
                </Collapse>
              </List>
            ) : null}
          </Grid>
        ))}
    </Grid>
  );
};

export default SectionTwo;
