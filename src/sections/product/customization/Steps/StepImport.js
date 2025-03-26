import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { loadingfalse } from "@/redux/slices/customization";

const importView = (subreddit) =>
  dynamic(() => import(`./${subreddit}`), { ssr: false });

const DisplayComponent = ({ data, formik, tabChange, setTabChange }) => {
  const [views, setViews] = useState([]);
  const dispatch = useDispatch();

  console.log("Rendering DisplayComponent:", data);

  useEffect(() => {
    if (!data?.CHILD_STEP) return;

    setViews([]); // Clear old views before loading new ones

    async function loadComponents() {
      const components = await Promise.all(
        data.CHILD_STEP.map(async (subData) => {
          const View = importView(subData?.SS_HTML_TEMPLATE_PATH);
          return (
            <View
              key={subData.SPS_SYS_ID}
              tabChange={tabChange}
              formik={formik}
              data={subData}
              elem={data}
              setTabChange={setTabChange}
            />
          );
        })
      );

      setViews(components);
    }

    loadComponents();

    const timer = setTimeout(() => {
      dispatch(loadingfalse("test"));
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [data]); // Dependency on `data` ensures reloading only when it changes

  return <>{views}</>;
};

const StepImport = ({ formik, data, tabChange, setTabChange }) => {
  const memoizedData = useMemo(() => data, [data]); // Prevents unnecessary renders

  return (
    <Box>
      <DisplayComponent
        data={memoizedData}
        formik={formik}
        tabChange={tabChange}
        setTabChange={setTabChange}
      />
    </Box>
  );
};

export default StepImport;
