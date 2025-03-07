import { useSelector } from "@/redux/store";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { NextFillImage } from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/iconify";
import { useTranslation } from "next-i18next";
import { CustomLink } from "@/components/link";
import { useRouter } from "next/router";
import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch } from "react-redux";

// @mui
const SceneCanvas3D = dynamic(() => import("./sceneCanvas3D"), {
  ssr: false,
});

const TabinationStepsSection = dynamic(() => import("./Steps"), {
  ssr: false,
});

const CustomizationSection = () => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const { customization, productInfo, headerData } = useSelector((state) => state.customization);
  const { locale, query } = useRouter();
  const { slug } = query;
  const isDownMd = useResponsive("down", "md");
  const isDownSm = useResponsive("down", "sm");
  const isDownxs = useResponsive("down", "xs");
  const { t: translate } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(startCustomizationLoaded());
  },5000);

  const formik = useFormik({
    initialValues: {
      qtys: "1",
      product_width: "",
      product_height: "",
      // select_room: "",
      sort_by: "",
      //  operating_side: "",
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
    },
  });

  const actions = [
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://twitter.com/intent/tweet?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:twitter"
          />
        </CustomLink>
      ),
      name: "twitter",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://web.whatsapp.com/send?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="prime:whatsapp"
          />
        </CustomLink>
      ),
      name: "whatsapp",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://www.facebook.com/sharer/sharer.php?u"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:facebook"
          />
        </CustomLink>
      ),
      name: "facebook",
    },
  ];

  return (
    <Box sx={{ height: { xxs: '100dvh', xs: '100dvh', sm: "100dvh", md: "100vh" }, overflow: { lg: "hidden", md: 'hidden', sm: "auto", xs: "auto", xxs: "auto" } }}>
      <Grid container direction='row'>
        <Grid item lg={7} md={7} sm={12} xs={12} xxs={12}>
          {!isDownxs && (
            <Box sx={{ position: "relative" }}>
              <SceneCanvas3D
              langName={langName}
              actions={actions}
              productInfo={productInfo}
              headerData={headerData}
                {...(customization?.CHILD && customization?.CHILD?.length > 0
                  ? customization?.CHILD[0]
                  : {})}
              />
             
            </Box>
          )}
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12} xxs={12}>
          <TabinationStepsSection handleOpen={handleOpen} open={open} formik={formik} data={customization?.CHILD} />
        </Grid>
      </Grid>


    </Box>
  );
};

export default CustomizationSection;
