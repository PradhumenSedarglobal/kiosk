import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";


const SectionFour = ({ fourthSection }) => {
  return (
    <Grid container spacing={1}>
      <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
        <Typography
          component="p"
          fontSize="14px"
          lineHeight="16px"
          fontWeight={300}
          sx={{
            color: (theme) => theme.palette.grey[1400],
            letterSpacing: 0.5
          }}
          textAlign={{ md: "left", sm: "center", xs: "center", xxs: "center" }}
          fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        >
          {fourthSection?.[0]?.content}
        </Typography>
        <Box
          my={2}
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            },
            borderBottom: "1px solid #777f8d1a",
          }}
        ></Box>
      </Grid>
      <Grid item lg={7} md={7} sm={12} xs={12} xxs={12}>
        <Stack
          direction="row"
          spacing={{ md: 6, sm: 10, xs: 1.6, xxs: 1.6 }}
          rowGap={1}
          justifyContent="center"
          flexWrap="wrap"
        >
          {fourthSection?.[1]?.CHILD?.map((item, index) => (
            <Typography
              key={`fourthSection[1]?.CHILD-${index}`}
              component={Link}
              href={item?.link_url}
              passHref
              fontSize="14px"
              lineHeight="16px"
              fontWeight={300}
              sx={{
                color: (theme) => theme.palette.grey[1400],
                textDecoration: "none",
                letterSpacing: 0.5
              }}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
            >
              {item?.content}
            </Typography>
          ))}
        </Stack>
        <Box
          my={2}
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            },
            borderBottom: "1px solid #777f8d1a",
          }}
        ></Box>
      </Grid>
      <Grid item lg={2} md={2} sm={12} xs={12} xxs={12}>
        <Typography
          component="p"
          fontSize="14px"
          lineHeight="16px"
          fontWeight={300}
          sx={{
            color: (theme) => theme.palette.grey[1400],
          }}
          textAlign={{ md: "right", sm: "center", xs: "center", xxs: "center" }}
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
        >
          {fourthSection?.[2]?.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SectionFour;
