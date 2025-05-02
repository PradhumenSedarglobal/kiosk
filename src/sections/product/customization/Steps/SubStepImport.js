import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const importView = (subreddit) =>
  dynamic(
    () => import(`./${subreddit}`)
  );

const DisplayComponent = ({ data, formik }) => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    function loadComponent() {
      const importChild = data?.SUB_CHILD?.map((subData, index) => {
        const View = importView(subData?.SS_HTML_TEMPLATE_PATH);
        return <View formik={formik} data={subData} elem={data} key={index} />;
      });
      Promise.all(importChild).then(setViews, setLoading(false));
    }
    loadComponent();
    setLoading(false);
  }, []);

  return <>{views}</>;
};
const SubStepImport = ({ formik, data }) => {
  return (
    // <Box>
      <DisplayComponent data={data} formik={formik} />
    // </Box>
  );
};

export default SubStepImport;
