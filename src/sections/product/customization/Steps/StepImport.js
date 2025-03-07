import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { loadingfalse } from "@/redux/slices/customization";

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
const StepImport = ({ formik, data, tabChange, setTabChange }) => {
  return (
    <Box>
      <DisplayComponent data={data} formik={formik} tabChange={tabChange} setTabChange={setTabChange} />
    </Box>
  );
};

export default StepImport;
