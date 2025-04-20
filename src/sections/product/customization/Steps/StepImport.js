import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { loadingfalse,customization, setStepChildCount } from "@/redux/slices/customization";
import MainHeading from "@/app/components/MainHeading";
import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";
import { addToCartFunScene } from "../sceneCanvas3D";

const importView = (subreddit) =>
  dynamic(
    () => import(`./${subreddit}`)
  );



const DisplayComponent = ({ data, formik, tabChange, setTabChange }) => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data, 'data13');
  const dispatch = useDispatch();
  useEffect(() => {
    function loadComponent() {
      const importChild = data?.CHILD_STEP?.map((subData, index) => {
       
        const View = importView(subData?.SS_HTML_TEMPLATE_PATH);
        return (
          <View
            tabChange={tabChange}
            formik={formik}
            data={subData}
            elem={data}
            key={index}
            setTabChange={setTabChange}
          />
        );
      });
      Promise.all(importChild).then(setViews, setLoading(false));
    }
    loadComponent();
    setTimeout(()=>{
      dispatch(loadingfalse("test"));
    },5000);
   
    setLoading(false);
  }, []);


  return <>{views}</>;
};
let count = 0;
const StepImport = ({ formik, data, tabChange, setTabChange,key }) => {
  count += data?.CHILD_STEP.length;
  const { state } = useAuthContext();
  const { locale, query } = useRouter();
  const { cookies } = state;
  const customization_info = useSelector((state) => state.customization);
  const dispatch = useDispatch();


  return (
    <Box>
       <MainHeading  title={data?.SPS_DESC} />
      <DisplayComponent data={data} formik={formik} tabChange={tabChange} setTabChange={setTabChange} />
    </Box>
  );
};

export default StepImport;
