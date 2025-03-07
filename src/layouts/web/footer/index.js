import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import React from "react";
import SectionFour from "./sectionFour";
import SectionOne from "./sectionOne";
import SectionThree from "./sectionThree";
import SectionTwo from "./sectionTwo";


const WebFooter = ({ layout }) => {
  const { locale } = useRouter();
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.dark.darker,
        px: 3,
        pt: "87px",
        position: "relative",
        pb: { md: 0, sm: 0, xs: 6, xxs: 6 },
      }}
    >
      <Container maxWidth="xl">
        {layout?.FOOTER?.firstSection && (
          <Container maxWidth="xl">
            <Box sx={{ pb: "51px" }}>
              {layout?.FOOTER?.firstSection?.map((item, index) => (
                <SectionOne
                  key={`layout?.FOOTER?.firstSection-${index}`}
                  data={item}
                />
              ))}
            </Box>
          </Container>
        )}
        {layout?.FOOTER?.secondSection && (
          <Container maxWidth="xl">
            <Box sx={{ py: 2 }}>
              <SectionTwo secondSection={layout?.FOOTER?.secondSection} />
            </Box>
          </Container>
        )}
        {layout?.FOOTER?.thirdSection && (
          <Container maxWidth="xl">
            <Box
              sx={{
                padding: "5px 0",
                borderTop: locale != "global-en" ? "1px solid" : "none",
                borderBottom: locale != "global-en" ? "1px solid" : "none",
                borderColor: (theme) => alpha(theme.palette.grey[1800], 0.1),
              }}
            >
              <SectionThree thirdSection={layout?.FOOTER?.thirdSection} />
            </Box>
          </Container>
        )}
        {layout?.FOOTER?.fourthSection && (
          <Container maxWidth="xl">
            <Box sx={{ py: "32px" }}>
              <SectionFour fourthSection={layout?.FOOTER?.fourthSection} />
            </Box>
          </Container>
        )}
      </Container>
    </Box>
  );
};

export default React.memo(WebFooter);
