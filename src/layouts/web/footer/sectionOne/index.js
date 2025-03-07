import LazyImage from "@/components/LazyImage";
import SnackbarProvider from "@/components/snackbar";
import { PATH_PAGE } from "@/routes/paths";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useRouter } from "next/router";
import FooterSubscribe from "./subscribe";



const SectionOne = ({ data }) => {
  const router = useRouter();
  const { locale } = useRouter();

  const imageStyles = {
    width: "auto!important",
    height: "auto!important",
    objectFit: "cover!important",
  };

  const gridStyles = {
    justifyContent: {
      md: "left",
      sm: "center",
      xs: "center",
      xxs: "center",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: { md: "start", sm: "center", xs: "center", xxs: "center" },
    height: "100%",
    width: "100%!important",
  };
  const SedarLogoImage = () => {
    const logoProps = {
      src: data?.image_path ? data?.image_path : `${process.env.NEXT_PUBLIC_URL}assets/footer/footer-logo.webp`,
      width: 117,
      height: 85,
      sx: { imageStyles },
      isdarkmode: true,
      priority: true,
      fetchPriority: "high",
      loading: "eager",
      objectFit: "contain",
      sizes: "(max-width: 480px) 300vw, (max-width: 768px) 200vw, 100vw",
      alt: "Logo",
    };
    if (router.asPath === "/") {
      return (
        <Box>
          <LazyImage {...logoProps} />
        </Box>
      );
    } else {
      return (
        <Link href={PATH_PAGE.home} locale={locale}>
          <LazyImage {...logoProps} />
        </Link>
      );
    }
  };
  return (
    <Grid
      container
      spacing={{ md: 0, sm: 4, xs: 4, xxs: 4 }}
      alignItems="center"
    >
      <Grid item md={7} sm={12} xs={12} xxs={12}>
        <Box sx={gridStyles}>
          {/* <LazyImage
            src={data?.image_path}
            alt={data?.image_path}
            width={117}
            height={85}
            isdarkmode={true}
            sx={imageStyles}
            priority={true}
            fetchPriority="high"
            loading="eager"
          /> */}
          <SedarLogoImage />
        </Box>
      </Grid>
      <Grid item md={5} sm={12} xs={12} xxs={12}>
        <SnackbarProvider>
          <FooterSubscribe />
        </SnackbarProvider>
      </Grid>
    </Grid>
  );
};

export default SectionOne;
