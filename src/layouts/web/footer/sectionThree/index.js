import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const SectionThree = ({ thirdSection }) => {
  const fullScreen = useResponsive("down", "md");
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};

  const renderLogoStack = (items) => {
    return (
      items &&
      items?.length > 0 &&
      items.map((item, index) => (
        <Box key={`thirdSection[${index + 2}]?.CHILD-${index + 100}`}>
          <NextLazyLoadImage
            src={item?.image_path}
            alt="visa"
            width={40}
            height={40}
            sx={{
              width: "55px!important",
              height: "auto!important",
              objectFit: "contain!important",
              backgroundSize: "contain",
              aspectRatio: "4 / 4",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={150}
            downLgWidth={150}
            downMdWidth={150}
            downSmWidth={150}
            downXsWidth={150}
          />
        </Box>
      ))
    );
  };

  const renderTextStack = (content, linkTitle) => (
    <Stack pl={3}>
      <Typography
        component="p"
        fontSize="14px"
        fontWeight={400}
        lineHeight="16px"
        sx={{ color: (theme) => theme.palette.grey[1200] }}
        fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
      >
        {content}
      </Typography>
      <Typography
        component="p"
        fontWeight={400}
        fontSize="18px"
        lineHeight="21px"
        sx={{
          color: (theme) => theme.palette.common.white,
          direction: langName == "ar" ? "rtl" : "none",
          textAlign: langName == "ar" ? "end" : "none",
        }}
        fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        letterSpacing=".54px"
      >
        {linkTitle}
      </Typography>
    </Stack>
  );
  const renderSocialMediaStack = (items) => {
    return (
      items &&
      items?.length > 0 &&
      items.map((item, index) => (
        <Box
          key={`thirdSection[3]?.CHILD-${index + 20}`}
          component="div"
          width="7%"
        >
          <CustomLink link={item?.link_url} lang={locale} target="_blank">
            <NextLazyLoadImage
              src={item?.image_path}
              alt="master"
              width={24}
              height={24}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={24}
              downLgWidth={24}
              downMdWidth={24}
              downSmWidth={24}
              downXsWidth={24}
            />
          </CustomLink>
        </Box>
      ))
    );
  };

  if (!fullScreen) {
    return (
      <Grid container spacing={6} alignItems="center">
        {thirdSection &&
          thirdSection?.length > 0 &&
          thirdSection.map((section, index) => (
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              xxs={12}
              key={`${section?.link_title}-MIDDLE-LIST-thirdSection-${index + 70
                }`}
            >
              {(index === 0 || index === 3) && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={index === 0 ? 4 : 3}
                  justifyContent={{
                    md: "left",
                    sm: "space-between",
                    xs: "space-between",
                    xxs: "space-between",
                  }}
                  pl={0}
                >
                  {index === 0 && renderLogoStack(section.CHILD)}
                  {index === 3 && renderSocialMediaStack(section.CHILD)}
                </Stack>
              )}
              {(index === 1 || index === 2) &&
                renderTextStack(section.content, section.link_title)}
            </Grid>
          ))}
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={6} alignItems="center">
        <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
          {renderTextStack(
            thirdSection?.[1]?.content,
            thirdSection?.[1]?.link_title
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
          {renderTextStack(
            thirdSection?.[2]?.content,
            thirdSection?.[2]?.link_title
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent={{
              md: "left",
              sm: "space-between",
              xs: "space-between",
              xxs: "space-between",
            }}
          >
            {renderSocialMediaStack(thirdSection?.[3]?.CHILD)}
          </Stack>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            justifyContent={{
              md: "left",
              sm: "space-between",
              xs: "space-between",
              xxs: "space-between",
            }}
          >
            {renderLogoStack(thirdSection?.[0]?.CHILD)}
          </Stack>
        </Grid>
      </Grid>
    );
  }
};

export default SectionThree;
