import React from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import axiosInstance from "@/utils/axios";
import { useDispatch, useSelector } from "@/redux/store";
import Stack from "@mui/material/Stack";
import Iconify from "@/components/iconify";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { CustomLink } from "@/components/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { NextFillImage } from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import {addToCartFunScene} from "@/sections/product/customization/addToCartFunScene";
import {
  loadingfalse,
  setcanvasImg,
  setCustomCustomization,
  setCustomizationPriceFun,
} from "@/redux/slices/customization";
import Box from "@mui/material/Box";

var base_url = "/";
const image_path = base_url + "assets/images/Customization/";
var camera;
var group_obj = new THREE.Group();
var global_data;
var scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const manager = new THREE.LoadingManager();
var textureLoader = new THREE.TextureLoader(manager);
textureLoader.setCrossOrigin("anonymous");
textureLoader.crossOrigin = "";
var font_obj;
var font_loader = new THREE.FontLoader();
var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
var texture_bump,
  texture_alphaMap,
  valance_texture,
  texture_displacementMap,
  cornice_texture;
var border_texture,
  back_side_texture,
  bottom_bar_color,
  ladder_texture,
  cord_texture,
  trimming_texture,
  trimming_texture_alphaMap;
var aluminium_texture =
  (border_texture =
    back_side_texture =
    trimming_texture =
    trimming_texture_alphaMap =
    textureLoader.load(image_path + "aluminium.jpg"));
var metal_texture = textureLoader.load(image_path + "Metal.jpg");

var plastic_texture = textureLoader.load(image_path + "plastic.jpg");
var plastic_texture_alphaMap = textureLoader.load(
  image_path + "plastic_alphamap.jpg"
);
var all_texture_url = null;
var texture = textureLoader.load(image_path + "texture12.png");
var arrow_texture = textureLoader.load(image_path + "arrow_texture.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.offset.set(0, 0);
//texture.repeat.set(2, 2);
texture.alphaTest = 0.5;
texture.anisotropy = 16;
var controller;
var border_color_array = new Object();
var bottom_bar_type = "BB01"; //aluminium;
let lat = 0;
let lon = 180;
var old_lon = 180;
var old_lat = 0;
let onMouseDownMouseX = 0,
  onMouseDownMouseY = 0,
  onMouseDownLon = 0,
  onMouseDownLat = 0;
let isUserInteracting = false;
let camera_fov = 75;
let camera_near = 0.1;
let camera_far = 1000;
let zoom_slider = 0;
var globalObject;
const obj_loader = new OBJLoader();
obj_loader.setCrossOrigin("anonymous");
var valance_collection = ["1134247"]; //CS Sheer
var aluminum_color_collection = ["1140983"];
var cornice_hide;
var arrow_line = false;
var chain_val = true;
var roll_type = "INSIDE";
var bracket_right = true;
var louvo_valance = false;
var arm_type = true;
var valance_hide = false;
var isMoving;
var isReset = false;
var border_show = true;
var bottom_border_show = false;
var side_border_show = false;
var trimming_show = false;
var two_way = true;
var one_way = false;
var glass_show = true;

const SceneCanvas3D = (props) => {
  const dispatch = useDispatch();
  const { customization, isCustomizationLoading } = useSelector((state) => state.customization);
  const [objPercentage, setObjPercentage] = React.useState(0);
  const ref = React.useRef(null);
  const obj_path = props.OBJ_PATH ? props.OBJ_PATH : "";
  const langName = props.langName;
  const { query } = useRouter();
  const locale = "uae-en";
  const { slug } = query;
  const { t: translate } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const isDownxs = useResponsive("down", "xs");

  const scene_path = props.SSC_IMAGE_PATH ? props.SSC_IMAGE_PATH : "";
  //const scene_occ_path = props.SSC_OCC_IMAGE_PATH ? props.SSC_OCC_IMAGE_PATH : '';
  border_show = props.OBJ_BORDER_TYPE == 0 ? false : true;
  lon = props.SSC_SCENE_LONGITUDE ? parseInt(props.SSC_SCENE_LONGITUDE) : lon;
  lat = props.OBJ_LATITUDE ? parseInt(props.OBJ_LATITUDE) : lat;
  old_lon = lon;
  camera_fov = props.SSC_FOV_LENGTH
    ? parseInt(props.SSC_FOV_LENGTH)
    : camera_fov;
  camera_near = props.SSC_CAMERA_NEAR_LENGTH
    ? props.SSC_CAMERA_NEAR_LENGTH
    : camera_near;
  camera_far = props.SSC_CAMERA_FAR_LENGTH
    ? props.SSC_CAMERA_FAR_LENGTH
    : camera_far;
  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      // $(".lds-ring").show();
      let percentComplete = (xhr.loaded / xhr.total) * 100;
      let per = Math.round(percentComplete, 2);
      if (per > 2) {
        setObjPercentage(per - 2);
      }
      /*  if (per == 100) {
          // $(".lds-ring").hide();
          setTimeout(
            dispatch(
              setCustomCustomization({
                ...customization,
                object_load: true,
              })
            ),
            500
          );
          setTimeout(() => {
            setObjPercentage(101);
          }, 3000);
        }*/
    }
  };
  const onError = function (xhr) { };
  const init = () => {
    scene.remove(scene.getObjectByName("measuremen_text"));
    scene.remove(scene.getObjectByName("measurement_line"));
    scene.clear();
    globalObject = "";
    valance_hide = false;
    cornice_hide = true;
    bottom_border_show = false;
    side_border_show = false;
    arrow_line = false;
    chain_val = true;
    roll_type = "INSIDE";
    border_color_array = new Object();
    group_obj = new THREE.Group();
  };
  const loadScene = () => {
    dispatch(loadingfalse(true)); 
    const background3dImage = textureLoader.load(scene_path);
    var background_OCC_Img = props.SSC_OCC_IMAGE_PATH
      ? textureLoader.load(props.SSC_OCC_IMAGE_PATH)
      : false;
    let material = new THREE.MeshBasicMaterial();
    if (props.OBJ_TYPE == "WALL_COVERING" && background_OCC_Img) {
      material = new THREE.MeshBasicMaterial({
        map: background3dImage,
        alphaMap: background_OCC_Img,
        transparent: background_OCC_Img ? true : false,
        blending: THREE.NormalBlending,
      });
    } else {
      material = new THREE.MeshBasicMaterial({
        map: background3dImage,
        transparent: background_OCC_Img ? true : false,
      });
    }
    const mesh3d = new THREE.Mesh(
      new THREE.SphereBufferGeometry(480, 60, 40).scale(-1, 1, 1),
      material
    );
    background3dImage.anisotropy = 100;
    mesh3d.name = "background3dImage";
    scene.add(mesh3d);
  };

  const loadOBJ = () => {
    valance_texture = "";
    cornice_texture = "";

    obj_loader.load(
      obj_path,
      function (object) {
        object.renderOrder = 1;
        border_color_array = new Object();
        globalObject = object;
        object.visible = true;
        object.name = props.OBJ_DESC ? props.OBJ_DESC : "NO obj"; //e.OBJ_DESC + e.OBJ_CODE;
        object.obj_code = props.OBJ_CODE ? props.OBJ_CODE : "";
        object.obj_type = props.OBJ_TYPE ? props.OBJ_TYPE : "";
        object.scene_type = "OBJECT";

        let p = splitString(props.OBJ_OUTSIDE_POSITION);
        let s = splitString(props.OBJ_OUTSIDE_SCALE);
        let r = props.OBJ_ROTATION
          ? splitString(props.OBJ_ROTATION)
          : [0, 1.57, 0];

        object.position.set(p[0], p[1], p[2]);
        object.scale.set(s[0], s[1], s[2]);

        object.rotation.set(r[0], r[1], r[2]);

        scene.add(object);

        if (props.light_info) {
          addLights(props.light_info);
        }
        if (scene) {
          scene.getObjectByName("measuremen_text")
            ? (scene.getObjectByName("measuremen_text", true).visible = false)
            : "";
        }

        aluminium_texture = props.OBJ_BOTTOM_TEXTURE_PATH
          ? textureLoader.load(props.OBJ_BOTTOM_TEXTURE_PATH)
          : aluminium_texture;
        aluminium_texture.wrapS = aluminium_texture.wrapT =
          THREE.RepeatWrapping;
        aluminium_texture.repeat.set(10, 10);

        metal_texture = props.OBJ_ACC_TEXTURE_PATH_1
          ? textureLoader.load(props.OBJ_ACC_TEXTURE_PATH_1)
          : metal_texture;
        metal_texture.wrapS = metal_texture.wrapT = THREE.RepeatWrapping;
        metal_texture.repeat.set(10, 10);

        plastic_texture = props.OBJ_ACC_TEXTURE_PATH_2
          ? textureLoader.load(props.OBJ_ACC_TEXTURE_PATH_2)
          : aluminium_texture;
        plastic_texture.wrapS = plastic_texture.wrapT = THREE.RepeatWrapping;
        plastic_texture.repeat.set(1, 1);

        plastic_texture_alphaMap = props.OBJ_ACC_TEXTURE_PATH_3
          ? textureLoader.load(props.OBJ_ACC_TEXTURE_PATH_3)
          : aluminium_texture;
        plastic_texture_alphaMap.wrapS = plastic_texture_alphaMap.wrapT =
          THREE.RepeatWrapping;
        plastic_texture_alphaMap.repeat.set(1, 1);
      },
      onProgress,
      onError
    );
  };

  const fontLoad = () => {
    font_loader.load(
      base_url + "fonts/helvetiker_bold.typeface.json",
      function (font) {
        font_obj = font;
        var textGeo = new THREE.TextGeometry("0 CM", {
          font: font,
          size: 0.65,
          height: 2,
        });

        let text_h_mesh_p = splitString(props.OBJ_TEXT_OUTSIDE_HORIZONTAL);
        var text_h_mesh = new THREE.Mesh(textGeo, textMaterial);
        text_h_mesh.rotation.set(-0.75, 1.6, 0.75);
        text_h_mesh.scale.set(0.5, 0.5, 0.01);
        text_h_mesh.position.set(
          text_h_mesh_p[0],
          text_h_mesh_p[1],
          text_h_mesh_p[2]
        );
        text_h_mesh.name = "horizontal_text";

        var textGeo1 = new THREE.TextGeometry("0 CM", {
          font: font,
          size: 0.65,
          height: 2,
        });

        let text_v_mesh_p = splitString(props.OBJ_TEXT_OUTSIDE_VERTICAL);
        var text_v_mesh = new THREE.Mesh(textGeo1, textMaterial);
        text_v_mesh.rotation.set(-1, 1.6, 2.55);
        text_v_mesh.scale.set(0.5, 0.5, 0.01);
        text_v_mesh.position.set(
          text_v_mesh_p[0],
          text_v_mesh_p[1],
          text_v_mesh_p[2]
        );

        text_v_mesh.name = "vertical_text";
        group_obj["measuremen_text"] = group_obj.add(text_h_mesh, text_v_mesh);
        group_obj["measuremen_text"].name = "measuremen_text";
        group_obj["measuremen_text"].visible = false;
        scene.add(group_obj["measuremen_text"]);
      },
      onProgress,
      onError
    );
  };
  const onWindowResize = () => {
    if (ref?.current) {
      let re_width = ref?.current?.offsetWidth;
      if (window.innerWidth <= 576) {
        re_width = window.innerHeight;
      }

      camera.aspect = re_width / window.innerHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize(re_width, window.innerHeight);

      if (window.innerWidth <= 576) {
        renderer.setSize(ref?.current?.offsetWidth, window.innerWidth - 100);
      } else {
        renderer.setSize(ref?.current?.offsetWidth, window.innerHeight);
      }
    }
  };
  const animate = () => {
    requestAnimationFrame(animate);

    if (lon > 540 || lon < -180) {
      lon = old_lon;
    }
    if (isMoving) {
      lon += 0.05;
      isReset = false;
    }
    if (isReset && lon != old_lon) {
      if (lon > old_lon) {
        lon -= 5;
      } else {
        lon += 5;
      }
      if (lon < eval(old_lon + 10) && lon > eval(old_lon - 10)) {
        lon = old_lon;
        isReset = false;
      }
    }

    lat = Math.max(-85, Math.min(85, lat));
    let phi = THREE.Math.degToRad(90 - lat);
    let theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    renderer.render(scene, camera);
  };

  const onDocumentMouseDown = (event) => {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.clientX;
    onMouseDownMouseY = event.clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
  };
  const onDocumentMouseMove = (event) => {
    if (isUserInteracting === true) {
      lon = parseInt(
        (onMouseDownMouseX - event.clientX) * 0.1 + onMouseDownLon
      );
      lat = parseInt(
        (event.clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat
      );
    }
  };
  const touchDown = (event) => {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.touches[0].clientX;
    onMouseDownMouseY = event.touches[0].clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
  };
  const touchMove = (event) => {
    if (isUserInteracting === true) {
      lon = parseInt(
        (onMouseDownMouseX - event.touches[0].clientX) * 0.1 + onMouseDownLon
      );
      lat = parseInt(
        (event.touches[0].clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat
      );
    }
  };
  const onDocumentMouseUp = (event) => {
    isUserInteracting = false;
  };
  const onDocumentMouseWheel = (event) => {
    let fov = parseInt(camera.fov) + event.deltaY * 0.025;
    camera.fov = THREE.Math.clamp(fov, 10, camera_fov + 20);
    camera.updateProjectionMatrix();
    return fov;
  };
  const resetScean = () => {
    camera.fov = THREE.Math.clamp(camera_fov, 10, camera_fov);
    camera.updateProjectionMatrix();
    lat = 0;
    lon = 180;
  };
  /* const goTocartPage = () => {
     customizeDispatch({ type: "ADD-TO-CART" });
     addToCartFunScene(customize_state, customizeDispatch, "COMPLETED");
     setObjPercentage(75);
 
     let cust_type = customization?.user
       ? customization?.user.cust_type
       : "";
     let SOL_SOH_SYS_ID =
       customization?.modificationUser &&
         customization?.modificationUser.head_sys_id
         ? customization?.modification_user_info.head_sys_id
         : "";
 
     let cart_url =
       cust_type == "ADMIN"
         ? "/modification?head_sys_id=" + SOL_SOH_SYS_ID
         : "/cartPage";
 
     setTimeout(() => {
       setObjPercentage(90);
       history.push(cart_url);
     }, 1800);
   };*/

  console.log(customization?.CHILD, 'customization1111', customization)
  React.useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    init();
    let window_width =
      ref?.current?.clientWidth > 0
        ? ref?.current?.clientWidth
        : window.innerWidth - 700;
    let window_height = window.innerHeight;
    if (window_width <= 576) {
      window_width = window_height;
    }

    camera = new THREE.PerspectiveCamera(
      camera_fov,
      window_width / window_height,
      camera_near,
      camera_far
    );
    camera.target = new THREE.Vector3(0, 0, 0);

    if (window.innerWidth <= 576) {
      renderer.setSize(ref?.current?.offsetWidth, window.innerWidth + 50);
    } else {
      renderer.setSize(ref?.current?.offsetWidth, window.innerHeight - 130);
    }

    const container = document.getElementById("CanvasId3D");
    container.appendChild(renderer.domElement);

    document
      .getElementById("CanvasId3D")
      .addEventListener("mousedown", onDocumentMouseDown, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("mousemove", onDocumentMouseMove, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("mouseup", onDocumentMouseUp, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("touchstart", touchDown, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("touchend", onDocumentMouseUp, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("touchcancel", onDocumentMouseUp, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("touchmove", touchMove, false);
    document
      .getElementById("CanvasId3D")
      .addEventListener("wheel", function (event) {
        let fov = onDocumentMouseWheel(event);
        if (fov >= 10 && fov <= 95) {
          let zoom_val = zoom_slider - event.deltaY * 0.25;
          zoom_slider = zoom_val;
          //$scope.$apply();
        }
      });
    loadOBJ();
    loadScene();
    fontLoad();
    animate();

  }, [customization?.CHILD]);

  React.useEffect(() => {
    if (customization?.steps?.MATERIAL_SELECTION) {
      setObjPercentage(101);
    }
  }, [customization?.steps?.MATERIAL_SELECTION]);



  dispatch(setcanvasImg(canvasImg()));



  
  return (
    <div ref={ref}>
      <Box component="div" id="CanvasId3D"></Box>

      {/* {!isDownxs ? (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            p: 0,
            backgroundColor: "#00000091",
            height: { sm: "65px", md: "110px" },
            marginBottom: "0px",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" height="100%" pb={0} px={2} >

            <Stack direction="row" alignItems="center" spacing={0.2} height="auto"
            >
              <Iconify
                icon="ic:baseline-arrow-back-ios-new"
                color="white"
                sx={{
                  direction: "ltr",
                  ...(langName == "ar" && {
                    transform: "rotate(180deg)",
                  }),
                }}
              />
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeue,
                  fontSize: theme.typography.typography16,
                  color: theme.palette.common.white,
                })}
              >
                <CustomLink lang={locale} link={slug?.[0] + "/" + slug?.[1]}>
                  {translate("back_to_overview", {
                    cat_desc: props.productInfo?.SC_DESC
                  })}
                </CustomLink>
              </Typography>
            </Stack>
            <Box component="div" onClick={resetScean}>
              <NextFillImage
                src="/assets/threesixty.png"
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "contain",
                  backgroundSize: "contain",
                  cursor: "pointer",
                  "&.MuiCard-root": {
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                    width: "100%!important",
                    height: "100%!important",
                  },
                }}
                alt='Image'
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              />
            </Box>
            <Box component="div" height="max-content">
              <Stack direction="row" spacing={7} height="max-content" alignItems='center' sx={{ position: 'relative' }}>

                <SpeedDial
                  ariaLabel="SpeedDial controlled open example"
                  sx={{
                    position: 'absolute', bottom: 0, right: open ? 39 : 50,
                    "&.MuiSpeedDial-root": {
                      "& .MuiSpeedDial-fab": {
                        boxShadow: "none",
                        width: "35px",
                        height: "35px",
                        background: (theme) =>
                          theme.palette.common.white,
                      },
                    },
                  }}
                  icon={
                    <Iconify
                      icon="material-symbols:share"
                      width={15}
                      sx={{ color: "common.black" }}
                    />
                  }
                  color="inherit"
                  onClick={handleOpen}
                  open={open}
                >
                  {props.actions && props.actions.map((action) => (
                    <SpeedDialAction
                      color="inherit"
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={handleOpen}
                      sx={(theme) => ({
                        display: open ? "block" : "none",

                        transition: theme.transitions.create(["display"], {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter,
                        }),

                      })}
                    />
                  ))}
                </SpeedDial>
                {props.headerData && props.headerData.result && props.headerData.result[0] && props.headerData.result[0]['link_title'] ?
                  <Box component="a" href={props.headerData.result[0]['link_title']} height="max-content" sx={{
                    direction: "ltr",
                    ...(langName == "ar" && {
                      transform: "rotate(260deg)",
                    }),
                  }}>
                    <NextFillImage
                      src="/assets/call.png"
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "contain",
                        backgroundSize: "contain",
                        "&.MuiCard-root": {
                          borderRadius: 0,
                          boxShadow: "none",
                          position: "relative!important",
                          width: "40px!important",
                          height: "37px!important",
                        },
                      }}
                      alt='Image'
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                      objectFit="contain"
                    />
                  </Box>
                  : ''}
              </Stack>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Box component="div" width="14%" sx={{
          position: "absolute", bottom: "25px", zIndex: 1, marginLeft: "15px"
        }} onClick={resetScean}>
          <NextFillImage
            src="/assets/threesixty.png"
            sx={{
              cursor: "pointer",
              width: "100%!important",
              height: "100%!important",
              objectFit: "contain",
              backgroundSize: "contain",
              "&.MuiCard-root": {
                borderRadius: 0,
                boxShadow: "none",
                position: "relative!important",
                width: "100%!important",
                height: "100%!important",
              },
            }}
            alt='Image'
            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
            objectFit="contain"
          />
        </Box>
      )} */}
    </div>
  );
};

function splitString(str) {
  return str && str.length > 0 ? str?.split(",") : [];
}

const canvasImg = () => {
  lat = old_lat;
  lon = old_lon;
  if (camera && camera.isCamera) {

    camera.fov = THREE.Math.clamp(camera_fov, 10, camera_fov);
    camera.updateProjectionMatrix();

    let phi = THREE.Math.degToRad(90 - lat);
    let theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    renderer.render(scene, camera);
    

    return renderer.domElement.toDataURL("image/jpeg", 0.3);
  }

  // window.open(renderer.domElement.toDataURL("image/png"), "Final");
};


// adding some lights to the scene
const addLights = (light_obj, light_val = null) => {
  if (light_obj.length == 0) {
    return false;
  }
  scene.children.map(function (e) {
    if (e.name == "Light") {
      scene.remove(e);
    }
  });

  let light_group = new THREE.Group();
  light_obj.map(function (e, j) {
    let p = e.OBL_POSITION?.split(",");
    let s = e.OBL_SCALE?.split(",");

    let color = new THREE.Color(eval(e.OBL_COLOR));
    let pointLight;
    switch (e.OBL_LIGHT_TYPE) {
      case "Point_Light":
        pointLight = new THREE.PointLight(color, e.OBL_VALUE);
        break;
      case "DIR_L":
        pointLight = new THREE.DirectionalLight(color, e.OBL_VALUE);
        break;
      case "HEMISPHERE_L":
        pointLight = new THREE.HemisphereLight(color, e.OBL_VALUE);
        break;
      case "AMBIENT_L":
        pointLight = new THREE.AmbientLight(color, e.OBL_VALUE);
        break;
      case "SPORT_L":
        pointLight = new THREE.SpotLight(color, e.OBL_VALUE);
        break;
      default:
        pointLight = new THREE.DirectionalLight("0xffffff", "0.2");
        break;
    }

    pointLight.position.set(p[0], p[1], p[2]);
    //pointLight.rotation.set(s[0], s[1], s[2]);
    pointLight.scale.set(s[0], s[1], s[2]);

    //pointLight.position.set(p[0], p[1], p[2]);
    //	pointLight.rotation.set(s[0], s[1], s[2]);
    //pointLight.scale.set(s[0], s[1], s[2]);

    light_group.add(pointLight);
  });
  if (light_val && light_val > 0) {
    let amb_light = new THREE.AmbientLight(0xffffff, light_val);
    light_group.add(amb_light);
  }
  light_group.name = "Light";
  scene.add(light_group);
};

const updateTextureImg = (material_info) => {
  back_side_texture = "";
  if (!material_info || !globalObject) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;
  all_texture_url = material_info;
  var effect_info =
    material_info && material_info.SIO_EFFECT_TYPE
      ? splitString(material_info.SIO_EFFECT_TYPE)
      : [];

  if (controller == "sample") {
    var repeat = splitString("4,4");
  } else {
    var repeat = material_info.SIO_REPEAT_TEXTURE
      ? splitString(material_info.SIO_REPEAT_TEXTURE)
      : splitString("4,4");
  }
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];

  // THREE.ImageUtils.crossOrigin = '';
  texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat_h, repeat_v);

  back_side_texture = material_info.SIO_BACK_SIDE_TEXTURE_IMG_PATH
    ? textureLoader.load(
      IMAGE_PATH + material_info.SIO_BACK_SIDE_TEXTURE_IMG_PATH
    )
    : texture;
  back_side_texture.wrapS = back_side_texture.wrapT = THREE.RepeatWrapping;
  back_side_texture.repeat.set(repeat_h, repeat_v);

  if (material_info.SIO_CORD_REPEAT_TEXTURE && material_info.SIO_CORD_TEXTURE) {
    var cord_repeat = material_info.SIO_CORD_REPEAT_TEXTURE
      ? splitString(material_info.SIO_CORD_REPEAT_TEXTURE)
      : splitString("4,4");
    cord_texture = material_info.SIO_CORD_TEXTURE
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_CORD_TEXTURE)
      : texture;
    cord_texture.wrapS = cord_texture.wrapT = THREE.RepeatWrapping;
    cord_texture.repeat.set(cord_repeat[0], cord_repeat[1]);
  }
  if (
    material_info.SIO_LADDER_REPEAT_TEXTURE &&
    material_info.SIO_LADDER_TEXTURE
  ) {
    var ladder_repeat = material_info.SIO_LADDER_REPEAT_TEXTURE
      ? splitString(material_info.SIO_LADDER_REPEAT_TEXTURE)
      : splitString("4,4");
    ladder_texture = material_info.SIO_LADDER_TEXTURE
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_LADDER_TEXTURE)
      : texture;
    ladder_texture.wrapS = ladder_texture.wrapT = THREE.RepeatWrapping;
    ladder_texture.repeat.set(ladder_repeat[0], ladder_repeat[1]);
  }

  //texture.anisotropy = 16;
  //var panel_type = $('#panel_type').val() ? $('#panel_type').val() : null;
  var panel_type = null;
  //100=>Blackout,101=>CS Sheer,102=>Sun Screen,103=>Wall Covering

  effect_info.map((effect) => {
    if (material_info.SIO_NORMAL_IMG_PATH) {
      texture_bump = material_info.SIO_NORMAL_IMG_PATH
        ? textureLoader.load(IMAGE_PATH + material_info.SIO_NORMAL_IMG_PATH)
        : texture_bump;
      texture_bump.wrapS = texture_bump.wrapT = THREE.RepeatWrapping;
      texture_bump.repeat.set(repeat_h, repeat_v);
    }
    if (material_info.SIO_OCC_IMG_PATH) {
      texture_alphaMap = material_info.SIO_OCC_IMG_PATH
        ? textureLoader.load(IMAGE_PATH + material_info.SIO_OCC_IMG_PATH)
        : texture_alphaMap;
      texture_alphaMap.wrapS = texture_alphaMap.wrapT = THREE.RepeatWrapping;
      texture_alphaMap.repeat.set(repeat_h, repeat_v);
    }
    if (material_info.SIO_DISPLACEMENT_IMG_PATH) {
      texture_displacementMap = material_info.SIO_DISPLACEMENT_IMG_PATH
        ? textureLoader.load(
          IMAGE_PATH + material_info.SIO_DISPLACEMENT_IMG_PATH
        )
        : texture_displacementMap;
      texture_displacementMap.wrapS = texture_displacementMap.wrapT =
        THREE.RepeatWrapping;
      texture_displacementMap.repeat.set(repeat_h, repeat_v);
    }
  });
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }

  globalObject.traverse(function (child) {
    if (child instanceof THREE.Object3D) {
      child.material = new THREE.MeshPhongMaterial({
        transparent: true,
        blending: THREE.NormalBlending,
      });
      if (panel_type) {
        if (child.name.search(panel_type) >= 0) {
          child.material.map = texture;
        }
      } else if (child.name.search("Valance_Color") >= 0) {
        if (
          valance_collection.indexOf(material_info.SII_COLLECTION_CODE) >= 0 &&
          !louvo_valance
        ) {
          child.material.map = aluminium_texture;
        } else {
          if (child.name.search("Valance_Color_Aluminum") >= 0) {
            child.material.map = valance_texture
              ? valance_texture
              : aluminium_texture;
          } else {
            child.material.map = valance_texture ? valance_texture : texture;
          }
        }
      } else if (child.name.search("Cornice_Color") >= 0 && cornice_texture) {
        child.material.map = cornice_texture
          ? cornice_texture
          : aluminium_texture;
      } else if (
        child.name.search("Bottom_Border") >= 0 &&
        bottom_border_show
      ) {
        child.material.map = border_texture;
      } else if (child.name.search("Side_Border") >= 0 && side_border_show) {
        child.material.map = border_texture;
      } else if (child.name.search("Trimming_Aluminum") >= 0 && trimming_show) {
        child.material.map = trimming_texture;
      } else if (
        child.name.search("Frame") >= 0 &&
        border_show &&
        Object.keys(border_color_array).length == 0
      ) {
        //ch
        child.material.map = border_texture;
      } else if (
        Object.keys(border_color_array).length > 1 &&
        child.hasOwnProperty("border_type") &&
        child.border_type &&
        serviceInstance.borderCheck(child.name)
      ) {
        child.material.map = border_texture;
      } else if (child.name.search("Bottom_Rail_Aluminum") >= 0) {
        if (bottom_bar_type == "BB01") {
          child.material.map = aluminium_texture;
          if (
            valance_collection.indexOf(material_info.SII_COLLECTION_CODE) >= 0
          ) {
            bottom_bar_color = back_side_texture;
          } else {
            bottom_bar_color = texture;
          }
        }
        if (bottom_bar_type == "BB02") {
          if (
            valance_collection.indexOf(material_info.SII_COLLECTION_CODE) >= 0
          ) {
            bottom_bar_color = back_side_texture;
            child.material.map = back_side_texture;
          } else {
            child.material.map = texture;
            bottom_bar_color = texture;
          }
        }
      } else if (
        aluminum_color_collection.indexOf(material_info.SII_COLLECTION_CODE) >=
        0 &&
        child.name.search("WhiteDesign") >= 0
      ) {
        child.material.map = aluminium_texture;
      } else if (child.name.search("Arrow_Aluminum") >= 0) {
        child.material.map = arrow_texture;
      } else if (child.name.search("Metal") >= 0) {
        child.material.map = metal_texture;
      } else if (child.name.search("Cord_Color") >= 0) {
        child.material.map = cord_texture ? cord_texture : texture;
      } else if (child.name.search("Ladder_Color") >= 0) {
        child.material.map = ladder_texture ? ladder_texture : texture;
      } else if (child.name.search("Plastic_Color") >= 0) {
        child.material.map = plastic_texture ? plastic_texture : texture;
      } else {
        child.material.map =
          child.name.search("Aluminum") >= 0 ? aluminium_texture : texture;
      }

      child.material.side = THREE.DoubleSide;
      child.material.bumpMap = null;
      child.material.bumpScale =
        material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 1;
      child.material.alphaMap = null;
      child.material.displacementMap = null;
      child.material.displacementScale =
        material_info.SIO_DISPLACEMENTSCALE > 0
          ? material_info.SIO_DISPLACEMENTSCALE
          : 1;
      child.material.displacementBias = 0;
      child.material.normalMap = null;
      child.material.specularMap = null;
      child.material.blendDst = null;
      child.material.transparent = false;
      child.material.needsUpdate = true;
      //	child.material.opacity=1;

      //Normal Map Start
      child.material.shininess =
        material_info.SIO_SHININESS > 0 ? material_info.SIO_SHININESS : 5;

      if (child.name.search("Valance") >= 0 && !valance_hide) {
        child.visible = true;
      } else if (
        child.name.search("Trimming_Aluminum_Fabric_Two_Way") >= 0 &&
        trimming_show
      ) {
        child.visible = two_way;
      } else if (
        child.name.search("Trimming_Aluminum") >= 0 &&
        child.name.search("First_Hide") >= 0
      ) {
        child.visible = trimming_show;
      } else if (child.name.search("Cornice") >= 0 && !cornice_hide) {
        child.visible = true;
      } else if (child.name.search("Border_Aluminum") >= 0) {
        if (child.name.search("Manual") >= 0 && border_show) {
          child.visible = chain_val;
        } else if (child.name.search("Motorized") >= 0 && border_show) {
          child.visible = !chain_val;
        } else {
          child.visible = border_show ? true : false;
        }
      } else if (child.name.search("Inside") >= 0) {
        //child.visible = true;
        child.visible = roll_type == "INSIDE" ? true : false;
      } else if (child.name.search("Outside") >= 0) {
        //child.visible = true;
        child.visible = roll_type == "OUTSIDE" ? true : false;
      } else if (child.name.search("One_Way") >= 0) {
        if (child.name.search("Bracket_Right") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : bracket_right;
          }
        } else if (child.name.search("Bracket_Left") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && !bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && !bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : !bracket_right;
          }
        } else {
          child.visible = one_way ? one_way : false;
        }
      } else if (child.name.search("Two_Way") >= 0) {
        if (child.name.search("GMP") >= 0 && two_way) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && two_way) {
          child.visible = !glass_show;
        } else {
          child.visible = two_way ? two_way : false;
        }
      } else if (child.name.search("DenHaag_Rail_Aluminum") >= 0) {
        child.visible = false;
      } else if (child.name.search("CCC") >= 0 && one_way) {
        child.visible = one_way;
      } else if (child.name.search("AAA") >= 0) {
        child.visible = true;
      } else if (child.name.search("BBB") >= 0) {
        child.visible = true;
      } else if (child.name.search("Arrow_Aluminum_First_Hide") >= 0) {
        child.visible = arrow_line;
      } else if (child.name.search("Bracket_Right") >= 0) {
        child.visible = !chain_val ? chain_val : bracket_right;
      } else if (child.name.search("Bracket_Left") >= 0) {
        child.visible = !chain_val ? chain_val : !bracket_right;
      } else if (child.name.search("Manual") >= 0) {
        child.visible = chain_val;
      } else if (child.name.search("Motorized") >= 0) {
        child.visible = !chain_val;
      } else if (child.name.search("3Arms") >= 0) {
        child.visible = arm_type ? true : false;
      } else if (child.name.search("4Arms") >= 0) {
        child.visible = arm_type ? false : true;
      } else if (child.name.search("First_Hide") >= 0) {
        child.visible = true;
      }
      //100=>blackout
      //101=>CS Sheer
      //102=>Sunscreen
      //103=>Wall covering
      //104=>Pleated
      if (child.name.search("Fabric") > 0) {
        effect_info.map((effect) => {
          if (
            child.name.search("Aluminum") < 0 &&
            ["101", "102"].indexOf(effect) >= 0 &&
            material_info.SIO_NORMAL_IMG_PATH
          ) {
            // child.material.blending = THREE.CustomBlending;
            child.material.blendEquation = THREE.AddEquation;
            child.material.blendSrc = THREE.SrcAlphaFactor;
            child.material.blendDst = THREE.SrcColorFactor;

            child.material.bumpMap = texture_bump;
            child.material.bumpScale =
              material_info.SIO_BUMPSCALE > 0
                ? material_info.SIO_BUMPSCALE
                : 0.3;
            child.material.alphaMap = texture_alphaMap;
            child.material.displacementMap = texture_displacementMap;
            child.material.displacementScale =
              material_info.SIO_DISPLACEMENTSCALE > 0
                ? material_info.SIO_DISPLACEMENTSCALE
                : 0.5;
            child.material.displacementBias = 1;
            child.material.transparent = true;
            //child.material.opacity=1;
            //	child.material.alphaTest = 0.0;

            // child.material.specularMap=texture_alphaMap;
          } else if (
            child.name.search("Aluminum") < 0 &&
            effect == 100 &&
            material_info.SIO_NORMAL_IMG_PATH &&
            material_info.SIO_OCC_IMG_PATH
          ) {
            //   child.material.specular = 0x333333;
            child.material.shininess =
              material_info.SIO_SHININESS > 0
                ? material_info.SIO_SHININESS
                : 15;
            child.material.normalMap = texture_bump;
            child.material.bumpScale =
              material_info.SIO_BUMPSCALE > 0
                ? material_info.SIO_BUMPSCALE
                : 0.3;
            child.material.specularMap = texture_alphaMap;
            child.material.displacementMap = texture_displacementMap;
            child.material.displacementScale =
              material_info.SIO_DISPLACEMENTSCALE > 0
                ? material_info.SIO_DISPLACEMENTSCALE
                : 0.5;
            child.material.displacementBias = 1;
            //child.material.normalScale = new THREE.Vector2(0.85, 0.85);
          } else if (
            child.name.search("Aluminum") < 0 &&
            effect == 103 &&
            material_info.SIO_NORMAL_IMG_PATH &&
            material_info.SIO_OCC_IMG_PATH
          ) {
            //   child.material.specular = 0x333333;
            child.material.shininess =
              material_info.SIO_SHININESS > 0
                ? material_info.SIO_SHININESS
                : 15;
            child.material.normalMap = texture_bump;
            child.material.bumpScale =
              material_info.SIO_BUMPSCALE > 0
                ? material_info.SIO_BUMPSCALE
                : 0.02;
            child.material.specularMap = texture_alphaMap;
            child.material.displacementMap = texture_displacementMap;
            child.material.displacementScale =
              material_info.SIO_DISPLACEMENTSCALE > 0
                ? material_info.SIO_DISPLACEMENTSCALE
                : 0.5;
            child.material.displacementBias = 1;
            child.material.normalScale = new THREE.Vector2(0.85, 0.85);
          } else if (
            child.name.search("Aluminum") < 0 &&
            effect == 104 &&
            material_info.SIO_OCC_IMG_PATH
          ) {
            child.material.alphaMap = texture_alphaMap;
            child.material.transparent = true;
          } else {
            child.material.transparent = false;
          }
        });

        if (child.name.search("Bottom_Border") >= 0 && bottom_border_show) {
          child.material.bumpScale =
            material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0;
          child.material.alphaMap = null;
          //	child.material.blending = null;
          child.material.transparent = false;
          child.material.displacementScale =
            material_info.SIO_DISPLACEMENTSCALE > 0
              ? material_info.SIO_DISPLACEMENTSCALE
              : 0;
          child.material.map = border_texture;
        } else if (child.name.search("Side_Border") >= 0 && side_border_show) {
          child.material.bumpScale =
            material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0;
          child.material.alphaMap = null;
          //child.material.blending = null;
          child.material.transparent = false;
          child.material.displacementScale =
            material_info.SIO_DISPLACEMENTSCALE > 0
              ? material_info.SIO_DISPLACEMENTSCALE
              : 0;
          child.material.map = border_texture;
        }
      }
      if (
        child.name.search("Back_Color") > 0 &&
        material_info.SIO_BACK_SIDE_TEXTURE_IMG_PATH
      ) {
        //	child.material.bumpMap = null;
        child.material.bumpScale =
          material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0;
        //child.material.alphaMap = null;
        child.material.displacementScale =
          material_info.SIO_DISPLACEMENTSCALE > 0
            ? material_info.SIO_DISPLACEMENTSCALE
            : 0;
        child.material.map = back_side_texture;
      } else if (
        child.name.search("Plastic_Color") >= 0 &&
        plastic_texture_alphaMap
      ) {
        child.material.alphaMap = plastic_texture_alphaMap;
        child.material.transparent = true;
      } else if (
        child.name.search("Trimming_Aluminum") >= 0 &&
        trimming_texture_alphaMap
      ) {
        child.material.alphaMap = trimming_texture_alphaMap;
        child.material.transparent = true;
      }
    }
  });
};

const borderCheck = (child_name) => {
  var border_t = false;
  for (var val in border_color_array) {
    if (val > 0) {
      var border_name = border_color_array[val].b_name;
      var reg_exp = new RegExp(border_name, "g");
      var border_type = border_color_array[val].b_type;
      var h_border = child_name.match(reg_exp);

      if (
        h_border != null &&
        (child_name.search(border_name) > 5 || h_border.length == 2) &&
        border_type == "BOR04"
      ) {
        border_texture = border_color_array[val];
        border_t = true;
        break;
      } else if (
        h_border != null &&
        child_name.search(border_name) == 0 &&
        border_type == "BOR05"
      ) {
        border_texture = border_color_array[val];
        border_t = true;
        break;
      }
    }
  }
  return border_t;
};
const updateBorderTextureImg = (material_info, border_no, border_type) => {
  var border_name = border_no ? "Curtain" + border_no : "Curtain";
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;
  //  var repeat = material_info.SIO_REPEAT_TEXTURE ? material_info.SIO_REPEAT_TEXTURE : 4;

  var repeat = material_info.SIO_REPEAT_TEXTURE
    ? splitString(material_info.SIO_REPEAT_TEXTURE)
    : splitString("4,4");
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];
  border_texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  border_texture.wrapS = border_texture.wrapT = THREE.RepeatWrapping;
  border_texture.repeat.set(repeat_h, repeat_v);
  border_texture.b_name = border_name;
  border_texture.b_type = border_type;

  var reg_exp = new RegExp(border_name, "g");
  if (border_no) {
    border_color_array[border_no] = border_texture;
  }
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material.side = THREE.DoubleSide;
      child.material.bumpMap = null;
      child.material.displacementMap = null;
      child.material.displacementBias = 0;
      child.material.normalMap = null;
      child.material.specularMap = null;
      child.material.blendDst = null;
      child.material.needsUpdate = true;

      var h_border = child.name.match(reg_exp);
      if (child.name.search("Border_Aluminum") >= 0) {
        aluminium_texture = border_texture;
        child.material.map = aluminium_texture;
      } else if (child.name.search("Frame") >= 0) {
        //  child.visible = true;
        child.material.map = border_texture;
      } else if (
        child.name.search("Bottom_Border") >= 0 &&
        bottom_border_show
      ) {
        child.material.bumpScale =
          material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0;
        child.material.alphaMap = null;
        //child.material.blending = null;
        child.material.transparent = false;
        child.material.displacementScale =
          material_info.SIO_DISPLACEMENTSCALE > 0
            ? material_info.SIO_DISPLACEMENTSCALE
            : 0;
        child.material.map = border_texture;
      } else if (child.name.search("Side_Border") >= 0 && side_border_show) {
        child.material.bumpScale =
          material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0;
        child.material.alphaMap = null;
        //	child.material.blending = null;
        //child.material.blendSrc = null;
        //child.material.blendDst = null;
        child.material.transparent = false;
        child.material.displacementScale =
          material_info.SIO_DISPLACEMENTSCALE > 0
            ? material_info.SIO_DISPLACEMENTSCALE
            : 0;

        child.material.map = border_texture;
      } else if (
        h_border &&
        (child.name.search(border_name) > 5 || h_border.length == 2) &&
        border_type == "BOR04"
      ) {
        //H
        child.material.map = border_texture;
        child.border_type = "Horizontal";
      } else if (
        child.name.search(border_name) == 0 &&
        border_type == "BOR05"
      ) {
        //V
        child.material.map = border_texture;
        child.border_type = "Vertical";
      }
      //Normal Map Start
    }
  });
};
const boderRemove = (border_no) => {
  delete border_color_array[border_no];
  serviceInstance.updateTextureImg(all_texture_url);
};
const valanceColorFun = (material_info) => {
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;
  // var repeat = material_info.SIO_REPEAT_TEXTURE ? material_info.SIO_REPEAT_TEXTURE : 4;
  var repeat = material_info.SIO_REPEAT_TEXTURE
    ? splitString(material_info.SIO_REPEAT_TEXTURE)
    : splitString("4,4");
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];
  // THREE.ImageUtils.crossOrigin = '';
  valance_texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  valance_texture.wrapS = valance_texture.wrapT = THREE.RepeatWrapping;
  valance_texture.repeat.set(repeat_h, repeat_v);

  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Valance_Color") >= 0) {
        child.material.map = valance_texture;
      }
    }
  });
};
const glassColor = (material_info) => {
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;
  var repeat = material_info.SIO_REPEAT_TEXTURE
    ? splitString(material_info.SIO_REPEAT_TEXTURE)
    : splitString("4,4");
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];
  // THREE.ImageUtils.crossOrigin = '';
  plastic_texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  plastic_texture.wrapS = plastic_texture.wrapT = THREE.RepeatWrapping;
  plastic_texture.repeat.set(repeat_h, repeat_v);

  if (material_info.SIO_OCC_IMG_PATH) {
    plastic_texture_alphaMap = material_info.SIO_OCC_IMG_PATH
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_OCC_IMG_PATH)
      : texture_alphaMap;
    plastic_texture_alphaMap.wrapS = plastic_texture_alphaMap.wrapT =
      THREE.RepeatWrapping;
    plastic_texture_alphaMap.repeat.set(repeat_h, repeat_v);
  }

  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Plastic_Color") >= 0) {
        child.material.map = plastic_texture;
        child.material.alphaMap = plastic_texture_alphaMap;
        child.material.transparent = true;
      }
    }
  });
};
const corniceColor = (material_info) => {
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;

  var repeat = material_info.SIO_REPEAT_TEXTURE
    ? splitString(material_info.SIO_REPEAT_TEXTURE)
    : splitString("4,4");
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];
  cornice_texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  cornice_texture.wrapS = cornice_texture.wrapT = THREE.RepeatWrapping;
  cornice_texture.repeat.set(repeat_h, repeat_v);

  if (material_info.SIO_NORMAL_IMG_PATH && material_info.SIO_OCC_IMG_PATH) {
    texture_bump = material_info.SIO_NORMAL_IMG_PATH
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_NORMAL_IMG_PATH)
      : texture_bump;
    texture_bump.wrapS = texture_bump.wrapT = THREE.RepeatWrapping;
    texture_bump.repeat.set(repeat_h, repeat_v);

    texture_alphaMap = material_info.SIO_DIFFUSE_IMG_PATH
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_OCC_IMG_PATH)
      : texture_alphaMap;
    texture_alphaMap.wrapS = texture_alphaMap.wrapT = THREE.RepeatWrapping;
    texture_alphaMap.repeat.set(repeat_h, repeat_v);

    texture_displacementMap = material_info.SIO_DISPLACEMENT_IMG_PATH
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_DISPLACEMENT_IMG_PATH)
      : texture_displacementMap;
    texture_displacementMap.wrapS = texture_displacementMap.wrapT =
      THREE.RepeatWrapping;
    texture_displacementMap.repeat.set(repeat_h, repeat_v);
  }
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Cornice_Color") >= 0) {
        child.material.shininess =
          material_info.SIO_SHININESS > 0 ? material_info.SIO_SHININESS : 15;
        child.material.map = cornice_texture;
        child.material.normalMap = texture_bump;
        child.material.bumpScale =
          material_info.SIO_BUMPSCALE > 0 ? material_info.SIO_BUMPSCALE : 0.3;
        child.material.specularMap = texture_alphaMap;
        child.material.displacementMap = texture_displacementMap;
        child.material.displacementScale =
          material_info.SIO_DISPLACEMENTSCALE > 0
            ? material_info.SIO_DISPLACEMENTSCALE
            : 0.5;
        child.material.displacementBias = 1;
        child.material.normalScale = new THREE.Vector2(0.85, 0.85);
      }
    }
  });
};
const trimmingColor = (material_info) => {
  if (globalObject === undefined || globalObject.traverse === undefined) {
    return false;
  }
  let IMAGE_PATH = material_info.IMAGE_PATH;
  var repeat = material_info.SIO_REPEAT_TEXTURE
    ? splitString(material_info.SIO_REPEAT_TEXTURE)
    : splitString("4,4");
  var repeat_h = repeat[0];
  var repeat_v = repeat.length > 1 ? repeat[1] : repeat[0];
  // THREE.ImageUtils.crossOrigin = '';
  trimming_texture = material_info.SIO_DIFFUSE_IMG_PATH
    ? textureLoader.load(IMAGE_PATH + material_info.SIO_DIFFUSE_IMG_PATH)
    : texture;
  trimming_texture.wrapS = trimming_texture.wrapT = THREE.RepeatWrapping;
  trimming_texture.repeat.set(repeat_h, repeat_v);

  if (material_info.SIO_OCC_IMG_PATH) {
    trimming_texture_alphaMap = material_info.SIO_OCC_IMG_PATH
      ? textureLoader.load(IMAGE_PATH + material_info.SIO_OCC_IMG_PATH)
      : texture_alphaMap;
    trimming_texture_alphaMap.wrapS = trimming_texture_alphaMap.wrapT =
      THREE.RepeatWrapping;
    trimming_texture_alphaMap.repeat.set(repeat_h, repeat_v);
  }

  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Trimming_Aluminum") >= 0) {
        child.material.side = THREE.DoubleSide;
        child.material.bumpMap = null;
        child.material.displacementMap = null;
        child.material.displacementBias = 0;
        child.material.normalMap = null;
        child.material.specularMap = null;
        child.material.blendDst = null;
        child.material.needsUpdate = true;

        child.material.map = trimming_texture;
        child.material.alphaMap = trimming_texture_alphaMap;
        child.material.transparent = true;
      }
    }
  });
};
const panelOption = (type) => {
  one_way = type == "PO01" ? true : false;
  two_way = type == "PO02" ? true : false;

  if (globalObject == undefined || globalObject.traverse == undefined) {
    return false;
  }
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("One_Way") >= 0) {
        if (child.name.search("Bracket_Right") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : bracket_right;
          }
        } else if (child.name.search("Bracket_Left") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && !bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && !bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : !bracket_right;
          }
        } else {
          child.visible = one_way ? one_way : false;
        }
      } else if (
        child.name.search("Trimming_Aluminum_Fabric_Two_Way") >= 0 &&
        trimming_show
      ) {
        child.visible = two_way;
      } else if (
        child.name.search("Trimming_Aluminum") >= 0 &&
        child.name.search("First_Hide") >= 0
      ) {
        child.visible = trimming_show;
      } else if (child.name.search("Two_Way") >= 0) {
        if (child.name.search("GMP") >= 0 && two_way) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && two_way) {
          child.visible = !glass_show;
        } else {
          child.visible = two_way ? two_way : false;
        }
      } else if (child.name.search("DenHaag_Rail_Aluminum") >= 0) {
        child.visible = false;
      } else if (child.name.search("CCC") >= 0 && one_way) {
        child.visible = one_way;
      } else if (child.name.search("AAA") >= 0) {
        child.visible = true;
      } else if (child.name.search("BBB") >= 0) {
        child.visible = true;
      } else if (child.name.search("Arrow_Aluminum_First_Hide") >= 0) {
        child.visible = arrow_line;
      } else if (child.name.search("Bracket_Right") >= 0) {
        child.visible = !chain_val ? chain_val : bracket_right;
      } else if (child.name.search("Bracket_Left") >= 0) {
        child.visible = !chain_val ? chain_val : !bracket_right;
      } else if (child.name.search("Manual") >= 0) {
        child.visible = chain_val;
      } else if (child.name.search("Motorized") >= 0) {
        child.visible = !chain_val;
      } else if (child.name.search("First_Hide") >= 0) {
        child.visible = false;
      } else {
        child.visible = true;
      }
    }
  });
};
const glassOption = (val) => {
  glass_show = val == "GL01" ? false : true;

  if (globalObject == undefined || globalObject.traverse == undefined) {
    return false;
  }
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("One_Way") >= 0) {
        if (child.name.search("Bracket_Right") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : bracket_right;
          }
        } else if (child.name.search("Bracket_Left") >= 0 && one_way) {
          if (child.name.search("GMP") >= 0 && !bracket_right) {
            child.visible = glass_show;
          } else if (child.name.search("WMP") >= 0 && !bracket_right) {
            child.visible = !glass_show;
          } else {
            child.visible = !chain_val ? chain_val : !bracket_right;
          }
        } else {
          child.visible = one_way ? one_way : false;
        }
      } else if (child.name.search("Two_Way") >= 0) {
        if (child.name.search("GMP") >= 0 && two_way) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && two_way) {
          child.visible = !glass_show;
        } else {
          child.visible = two_way ? two_way : false;
        }
      }
    }
  });
};
const borderSection = (val) => {
  if (val == "BOR04") {
    side_border_show = false;
    bottom_border_show = true;
  } else if (val == "BOR05") {
    side_border_show = true;
    bottom_border_show = false;
  } else if (val == "BOR01") {
    side_border_show = true;
    bottom_border_show = true;
  } else {
    side_border_show = bottom_border_show = false;
  }
  if (globalObject === undefined || globalObject.traverse == undefined) {
    return false;
  }
  border_show = val == "BOR02" ? false : true;
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Border_Aluminum") >= 0) {
        if (child.name.search("Manual") >= 0 && border_show) {
          child.visible = chain_val;
        } else if (child.name.search("Motorized") >= 0 && border_show) {
          child.visible = !chain_val;
        } else {
          child.visible = border_show;
        }
      }
    }
  });
  updateTextureImg(all_texture_url);
};

const measurementText = (width, height) => {
  if (!globalObject || scene.getObjectByName("measuremen_text") == undefined) {
    return false;
  }
  if (isNaN(width) || isNaN(height)) {
    scene.getObjectByName("measuremen_text", true).visible = false;
    return false;
  } else {
    scene.getObjectByName("measuremen_text", true).visible = true;
  }

  var color = new THREE.Color(0xff0000);
  var measuremen_text = scene.getObjectByName("measuremen_text");
  var textGeo = new THREE.TextGeometry(width + " CM", {
    font: font_obj,
    size: 0.65,
    height: 2,
  });
  textGeo.colors = color;
  measuremen_text.getObjectByName("horizontal_text").geometry = textGeo;

  var textGeo1 = new THREE.TextGeometry(height + " CM", {
    font: font_obj,
    size: 0.65,
    height: 2,
  });
  measuremen_text.getObjectByName("vertical_text").geometry = textGeo1;
  arrow_line = true;
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Arrow_Aluminum_First_Hide") >= 0) {
        child.visible = true;
      }
    }
  });
};
const mounting = (mountType, global_data) => {
  if (!globalObject) {
    return false;
  }
  var measuremen_text = scene.getObjectByName("measuremen_text");
  if (measuremen_text == undefined) {
    return false;
  }
  //var vert_text_pos_z = measuremen_text.getObjectByName('vertical_text').position.z;

  if (mountType == "MO01") {
    //Inside

    let mount_scale = splitString(global_data.OBJ_INSIDE_SCALE);
    let mount_position = splitString(global_data.OBJ_INSIDE_POSITION);

    globalObject.scale.set(mount_scale[0], mount_scale[1], mount_scale[2]);
    globalObject.position.set(
      mount_position[0],
      mount_position[1],
      mount_position[2]
    );

    /*globalObject.scale.x = mount[0];
      globalObject.scale.y = mount[1];
      //globalObject.scale.z = mount[2];
      globalObject.scale.z = globalObject.scale.z > 0 ? mount[2] : -mount[2];*/

    let hor_in_text_pos = splitString(global_data.OBJ_TEXT_INSIDE_HORIZONTAL);
    let ver_in_text_pos = splitString(global_data.OBJ_TEXT_INSIDE_VERTICAL);

    measuremen_text
      .getObjectByName("horizontal_text")
      .position.set(hor_in_text_pos[0], hor_in_text_pos[1], hor_in_text_pos[2]);
    measuremen_text
      .getObjectByName("vertical_text")
      .position.set(ver_in_text_pos[0], ver_in_text_pos[1], ver_in_text_pos[2]);
  } else if (mountType == "MO02") {
    //OutSide

    let mount_scale = splitString(global_data.OBJ_OUTSIDE_SCALE);
    let mount_position = splitString(global_data.OBJ_OUTSIDE_POSITION);

    globalObject.scale.set(mount_scale[0], mount_scale[1], mount_scale[2]);
    globalObject.position.set(
      mount_position[0],
      mount_position[1],
      mount_position[2]
    );
    /*
              globalObject.scale.x = mount[0];
              globalObject.scale.y = mount[1];
              // globalObject.scale.z = mount[2];
              globalObject.scale.z = globalObject.scale.z > 0 ? mount[2] : -mount[2];
      */
    let hor_out_text_pos = splitString(global_data.OBJ_TEXT_OUTSIDE_HORIZONTAL);
    let ver_out_text_pos = splitString(global_data.OBJ_TEXT_OUTSIDE_VERTICAL);

    measuremen_text
      .getObjectByName("horizontal_text")
      .position.set(
        hor_out_text_pos[0],
        hor_out_text_pos[1],
        hor_out_text_pos[2]
      );
    measuremen_text
      .getObjectByName("vertical_text")
      .position.set(
        ver_out_text_pos[0],
        ver_out_text_pos[1],
        ver_out_text_pos[2]
      );
  }
};
const controlType = (type) => {
  if (globalObject == undefined || scene == undefined || scene.getObjectByName("measuremen_text") == undefined || globalObject.scale == undefined) {
    return false;
  }
  var vertical_text_p = scene
    .getObjectByName("measuremen_text")
    .getObjectByName("vertical_text").position.z;
  var scale_z = globalObject.scale.z;
  var rotation_y = globalObject.rotation.y;
  var light_scale_z = scene.getObjectByName("Light").scale.z;
  if (type == "CT01" || type == "TO01") {
    // Manual
    chain_val = true;
  } else if (
    type == "CT02" ||
    type == "PO05" ||
    type == "PO07" ||
    type == "PO08" ||
    type == "TO02" ||
    type == "TO03" ||
    type == "TO04"
  ) {
    // Motorized
    chain_val = false;
  }
  if (type == "PO03") {
    // Manual right
    globalObject.scale.z = scale_z > 0 ? scale_z : -scale_z;
    globalObject.rotation.y = rotation_y > 0 ? rotation_y : -rotation_y;
    scene.getObjectByName("Light").scale.z =
      light_scale_z > 0 ? light_scale_z : -light_scale_z;

    scene
      .getObjectByName("measuremen_text")
      .getObjectByName("vertical_text").position.z =
      vertical_text_p > 0 ? vertical_text_p : -vertical_text_p;
    chain_val = true;
  } else if (type == "PO04") {
    // Manual Left
    globalObject.scale.z = scale_z < 0 ? scale_z : -scale_z;
    globalObject.rotation.y = rotation_y < 0 ? rotation_y : -rotation_y;
    scene.getObjectByName("Light").scale.z =
      light_scale_z < 0 ? light_scale_z : -light_scale_z;

    scene
      .getObjectByName("measuremen_text")
      .getObjectByName("vertical_text").position.z = -vertical_text_p;
    chain_val = true;
  }

  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Valance") >= 0 && valance_hide) {
        child.visible = false;
      } else if (child.name.search("Cornice") >= 0) {
        child.visible = !cornice_hide;
      } else if (child.name.search("Border_Aluminum") >= 0) {
        if (child.name.search("Manual") >= 0 && border_show) {
          child.visible = chain_val;
        } else if (child.name.search("Motorized") >= 0 && border_show) {
          child.visible = !chain_val;
        } else {
          child.visible = border_show ? true : false;
        }
      } else if (
        child.name.search("Trimming_Aluminum_Fabric_Two_Way") >= 0 &&
        trimming_show
      ) {
        child.visible = two_way;
      } else if (child.name.search("Trimming_Aluminum") >= 0) {
        child.visible = trimming_show;
      } else if (child.name.search("Inside") >= 0) {
        child.visible = roll_type == "INSIDE" ? true : false;
      } else if (child.name.search("Outside") >= 0) {
        child.visible = roll_type == "OUTSIDE" ? true : false;
      } else if (child.name.search("One_Way") >= 0) {
        if (child.name.search("Bracket_Right") >= 0 && one_way) {
          child.visible = !chain_val ? chain_val : bracket_right;
        } else if (child.name.search("Bracket_Left") >= 0 && one_way) {
          child.visible = !chain_val ? chain_val : !bracket_right;
        } else {
          child.visible = one_way ? one_way : false;
        }
      } else if (child.name.search("Two_Way") >= 0) {
        if (child.name.search("GMP") >= 0 && two_way) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && two_way) {
          child.visible = !glass_show;
        } else {
          child.visible = two_way ? two_way : false;
        }
      } else if (child.name.search("DenHaag_Rail_Aluminum") >= 0) {
        child.visible = false;
      } else if (child.name.search("Arrow_Aluminum_First_Hide") >= 0) {
        child.visible = arrow_line;
      } else if (child.name.search("Curtain") >= 0) {
      } else if (child.name.search("Bracket_Right") >= 0) {
        child.visible = !chain_val ? chain_val : bracket_right;
      } else if (child.name.search("Bracket_Left") >= 0) {
        child.visible = !chain_val ? chain_val : !bracket_right;
      } else if (child.name.search("Manual") >= 0) {
        child.visible = chain_val;
      } else if (child.name.search("Motorized") >= 0) {
        child.visible = !chain_val;
      } else {
        child.visible = true;
      }
    }
  });
};
const manualControl = (type, global_data) => {
  if (globalObject == undefined || globalObject.traverse == undefined) {
    return false;
  }
  bracket_right = type == "OP01" ? true : false;
  var control_position = global_data.OBJ_CONTROL_POSITION
    ? splitString(global_data.OBJ_CONTROL_POSITION)
    : [0, 0, 0];
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Ball_Chain") >= 0) {
        if (type == "OP01") {
          child.position.set(0, 0, 0);
        } else if (type == "OP02") {
          child.position.set(
            control_position[0],
            control_position[1],
            control_position[2]
          );
        }
      }
      if (child.name.search("Bracket_Right") >= 0) {
        if (child.name.search("GMP") >= 0 && bracket_right) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && bracket_right) {
          child.visible = !glass_show;
        } else {
          child.visible = !chain_val ? chain_val : bracket_right;
        }
        //child.visible = !chain_val ? chain_val : bracket_right;
      } else if (child.name.search("Bracket_Left") >= 0) {
        if (child.name.search("GMP") >= 0 && !bracket_right) {
          child.visible = glass_show;
        } else if (child.name.search("WMP") >= 0 && !bracket_right) {
          child.visible = !glass_show;
        } else {
          child.visible = !chain_val ? chain_val : !bracket_right;
        }
        //child.visible = !chain_val ? chain_val : !bracket_right;
      }
    }
  });
  if (type == "OP03") {
    serviceInstance.controlType("PO03");
  } else if (type == "OP04") {
    serviceInstance.controlType("PO04");
  }
};
const rollType = (type) => {
  roll_type = type;
  if (globalObject == undefined || scene == undefined) {
    return false;
  }
  controlType("er");
};
const bottomBar = (type) => {
  if (globalObject == undefined || globalObject.traverse == undefined) {
    return false;
  }
  //bottom_Aluminum
  bottom_bar_type = type;
  globalObject.traverse(function (child) {
    if (
      child instanceof THREE.Mesh &&
      child.name.search("Bottom_Rail_Aluminum") >= 0
    ) {
      if (bottom_bar_type == "BB01") {
        child.material.map = aluminium_texture;
      }
      if (bottom_bar_type == "BB02") {
        child.material.map = bottom_bar_color ? bottom_bar_color : texture;
        // child.material.map = texture;
      }
    }
  });
};
const valanceType = (val) => {
  if (globalObject == undefined || globalObject.traverse == undefined) {
    return false;
  }
  var valance_show = ["VAL01", "VAL03", "VAL04"];
  louvo_valance = val == "VAL03" ? true : false;
  valance_hide = valance_show.indexOf(val) >= 0 ? false : true;
  globalObject.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.search("Valance") >= 0) {
        child.visible = valance_hide ? false : true;
      }
      if (child.name.search("Valance_Color") >= 0 && val == "VAL03") {
        valance_texture = aluminium_texture;
        child.material.map = valance_texture;
      } else if (child.name.search("Valance_Color") >= 0 && val == "VAL04") {
        valance_texture = back_side_texture;
        child.material.map = valance_texture;
      }
    }
  });
};
const getPrice = (state, dispatch, props) => {
  let item_info = state ? state.product_info : [];
  if (
    state &&
    item_info &&
    item_info.m_width > 0 &&
    item_info.m_height > 0 &&
    item_info.code > 0
  ) {
    let price_params = { ...state.product_info, ...props };
    axiosInstance.post("order/price", price_params)
      .then((response) => {
        let res_data = response.data;
        if (
          res_data.error_message == "Success" &&
          res_data.return_status == 0
        ) {
          dispatch({ ...props, ...res_data.result });
          dispatch({
            type: "PRICE-UPDATE",
            value: { ...state.product_info, ...res_data.result },
          });
        } else {
          //setErrorMgs(res_data.error_message);

          alert(res_data.error_message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }
};

export default SceneCanvas3D;

export {
  canvasImg,
  addLights,
  updateTextureImg,
  measurementText,
  mounting,
  controlType,
  manualControl,
  rollType,
  bottomBar,
  valanceType,
  borderSection,
  glassOption,
  panelOption,
  trimmingColor,
  corniceColor,
  glassColor,
  valanceColorFun,
  boderRemove,
  updateBorderTextureImg,
  borderCheck,
  getPrice,
  addToCartFunScene,
};
